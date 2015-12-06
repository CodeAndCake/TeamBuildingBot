var _ = require('underscore'),
	Twitter = require('twitter'),
	WordPOS = require('wordpos'),
	plur = require('plur'),
	isPlural = require('is-plural'),
	MarkovChain = require('markovchain'),
	config = require('./config'),
	twitterBot = new Twitter(config.keys),
	wordpos = new WordPOS({stopwords: true}), // exclude stopwords
	chain = new MarkovChain(),
	bank = {
		nouns: [],
		verbs: [],
		adjectives: [],
		adverbs: [],
		rest: [],
		hashtags: [],
		user_mentions: [],
		media: [],
		urls: []
	},
	charactersToRemove = config.charactersToRemove.split(''),
	users = []

var twitterParameters = 
{
	// trim_user: true,
	exclude_replies: true,
	include_rts: false,
	count: 200 
}

config.users.forEach(function(screen_name)
{
	var user = {}
	user.screen_name = screen_name.toLowerCase() // we lowercase it just in case
	users.push(user)
})

// RUN!
var usersCount = 0,
	tweetsCount = 0

getNextBatchOfTweets()

// FUNCTIONS

function getNextBatchOfTweets()
{
	if (usersCount < users.length)
	{
		var user = users[usersCount]
		console.log('├ Fetching ' + user.screen_name)
		twitterParameters.screen_name = user.screen_name
		if (user.max_id) twitterParameters.max_id = user.max_id
		getUserTweets(twitterParameters, gotTweets)
		usersCount ++
	}
	else
	{
		console.log('├ Fetched ' + tweetsCount + ' so far')
		if (tweetsCount < config.minimumTweetsToFetch)
		{
			usersCount = 0
			getNextBatchOfTweets()
		}
		else
		{
			console.log('├ Done fetching, now tweet something!')
			makeAndTweetSentences()
		}
	}	
}

function getUserTweets(parameters, callback)
{
	twitterBot.get('statuses/user_timeline', parameters, function(error, tweets, response)
	{
		if (!error) callback(tweets)
		else 
		{
			console.error(error)
			console.error(response)
		}	
	})
}

function gotTweets(tweets)
{
	//console.log(tweets)
	
	// increment the total count (so we know how large our bank is)
	tweetsCount += tweets.length
	
	// loop through individual tweets
	tweets.forEach(function(tweet, index)
	{
		// ENTITIES
			// console.log(tweet.entities)
			if (tweet.entities.hashtags)
			{
				tweet.entities.hashtags.forEach(function(hashtag, key)
				{
					bank.hashtags = _(bank.hashtags.concat(hashtag.text)).unique()
				})	
			}
			if (tweet.entities.user_mentions)
			{
				tweet.entities.user_mentions.forEach(function(user_mention, key)
				{
					bank.user_mentions = _(bank.user_mentions.concat(user_mention.screen_name)).unique()
				})	
			}
			if (tweet.entities.urls)
			{
				tweet.entities.urls.forEach(function(url, key)
				{
					bank.urls = _(bank.urls.concat(url.expanded_url)).unique()
				})	
			}
			if (tweet.entities.media)
			{
				tweet.entities.media.forEach(function(media, key)
				{
					bank.media = _(bank.media.concat(media.media_url)).unique()
				})	
			}

		// TEXT
			// console.log(tweet.text)

			var text = tweet.text  
			// a bit of sanitation
			text = _(text).unescape() // see http://underscorejs.org/#unescape 
			text = removeUrls(text)
			text = removeCharacters(text)
			
			chain.parse(text)

			wordpos.getPOS(text, function(results)
			{
				_(results).each(function(array, key)
				{
					// console.log(key, array)
					bank[key] = _(bank[key].concat(array)).unique()
				})

				// if (index == tweets.length -1) getNextBatchOfTweets()
			})

		// if this is the last tweet...	
		if (index == tweets.length -1)
		{
			var screen_name = tweet.user.screen_name.toLowerCase(),
				user = _(users).findWhere({screen_name: screen_name})

			if (user) 
			{
				user.max_id = tweet.id_str // we'll get tweets from this user that are older than this last tweet's id
				user.statuses_count = tweet.user.statuses_count // we may also need to know how many times this user has tweeted
			}

			getNextBatchOfTweets()
		}
	})
}	

function removeUrls(string)
{
	return string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
}

function removeCharacters(string)
{
	charactersToRemove.forEach(function(character)
	{
		var regExp = new RegExp('\\' + character, 'gi')
		string = string.replace(regExp, '')
	})
	return string
}

function makeAndTweetSentences()
{
	var count = 0
	while (count < config.howManySentences)
	{
		var sentence = makeSentence()
		if (isTweetable(sentence))
		{
			console.log('├ → ' + sentence)
			// only tweet if we're not in testMode
			if (!config.testMode) makeTweet(sentence) 
			count ++
		}
	}
}

function makeSentence()
{
	// we want unique
	var nouns = _(bank.nouns).difference(bank.adjectives, bank.verbs)
	var adjectives = _(bank.adjectives).difference(bank.nouns, bank.verbs)
	var verbs = _(bank.verbs).difference(bank.adjectives, bank.nouns)

	var sentence = 'We ' // each sentence starts with "We "

	var dont = Math.round(Math.random()*2) == 0 // 1 in 3 sentences should continue with "don't"
	if (dont) sentence += "don't "

	var markovify = Math.round(Math.random()) == 0 // 1 in 2 sentences should be a Markov chain

	if (markovify)
	{
		sentence += chain.start(getRandomElement(verbs).toLowerCase()).end().process()
	}
	else
	{
		var verb = getRandomElement(verbs).toLowerCase(),
			adjective = getRandomElement(adjectives).toLowerCase(),
			noun = getRandomElement(nouns),
			hashtag = '#' + getRandomElement(bank.hashtags)

		// if the noun is singular and not capitalised, then pluralise it :)
		if (!isPlural(noun) && !isCapitalCase(noun)) noun = plur(noun, 2) 

		// ...and string the sentence together
		sentence += verb + ' ' + adjective + ' ' + noun + ' ' + hashtag
	}

	return sentence
}

function isTweetable(text)
{
	if (text.split(' ').length < 4) return false
	if (text.length > 140) return false	
	return true	
}

function makeTweet(text) 
{
	twitterBot.post('statuses/update', {status: text},  function(error, tweet, response)
	{
		if (error) console.error(error)
		else
		{
			console.log('├ DONE! ' + tweet.text) 
			// console.log(response)
		}	
	})
}

function isCapitalCase(word)
{
	return (word[0] === word[0].toUpperCase())
}

function getRandomElement(array) 
{
	var randomIndex = Math.floor(array.length * Math.random())
	return array[randomIndex]
}