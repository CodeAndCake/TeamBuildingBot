<!-- TODO



-->

# Automated motivational tweets for your team

It's all recycled! :recycle:

### WTF?

A Twitter bot is, in lay(wo)man's terms, a computer program that tweets *automatically*. Following certain rules, the bot generates tweetable sentences and then pushes them to the Twitters via their [API](https://dev.twitter.com/rest/public).

This bot takes in the latest tweets from a list of accounts (your team, possibly) and then produces a sentence that starts with `We`, followed by a *verb* and some other words (all found within your team's tweeets). For example:

* `We emerge from 11am!`
* `We improve the #Web…`
* `We don't outsource through publication #ItSaysHere`
* `We encrypt finished citizen #neverTooLate`
* `We survive on success #PostCapitalism`
* `We don't eliminate #poverty, #disease, and #automation`

### Get started

1. **Fork** this repository and *clone* it to your computer.
* Go to [apps.twitter.com](https://apps.twitter.com) and create a **new app**.
* Rename `RENAME_MEconfig.js`: call it `config.js`.
* Open `config.js` and change `YOUR_TWITTER_APP_CONSUMER_KEY` and all the other bits in capitals to your Twitter app's values (which you can find at `apps.twitter.com/app/YOUR_APP_ID/keys`)

	```js
	module.exports = 
	{
		keys:
		{
			consumer_key: 'YOUR_TWITTER_APP_CONSUMER_KEY',
			consumer_secret: 'YOUR_TWITTER_APP_CONSUMER_SECRET',
			access_token_key: 'YOUR_TWITTER_APP_TOKEN_KEY',
			access_token_secret: 'YOUR_TWITTER_APP_TOKEN_SECRET'
		}
		...
	}	
	```
* In `config.js` change the Twitter usernames inside `users` to the ones you want to grab tweets from, for the bot to build sentences upon. You can add as many as you like.
* Navigate to this folder in Terminal and then run `sudo npm install`.
* Test the bot by running `node bot.js`.

### Pushing your bot to Heroku	

> Heroku (pronounced her-OH-koo) is a cloud application platform. 

This means that instead of running your bot from the Terminal on your computer, you can deploy it to Heroku and it will tweet from there!

1. Go to [Heroku](https://signup.heroku.com) and sign up for a free account. 
* When asked to specify your primary development language, pick `Node.js`
* Once you're signed up, and download the *Toolbelt*

	![](https://cdn-images-1.medium.com/max/800/1*0sIWpZeqie3lPkm2gUWZYQ.png)
* Open Terminal (or Command Prompt if you're on Windows), type `heroku` into it and press the `↲` (Enter) key.

	This properly installs Heroku on your computer. You will see a window pop up that looks like this
	
	![](https://cdn-images-1.medium.com/max/800/1*bVNXZW8boBeyvCHHtgqyZA.png)
	
	Choose `Install`
* Once the installation has finished, type `heroku login` and hit the `↲` (Enter) key.	
* We're going to prep your bot's folder to send to Heroku

	Type `cd`, hit space, then drag the folder from Finder into Terminal (`cd` stands for *change directory*) and press the `↲` (Enter) key.
	
	![](https://cdn-images-1.medium.com/max/800/1*odsH4AK_YBfleCX17AEfRA.png)
* Type `heroku create` and hit 	`↲` (Enter).  
  
	Here, you're asking Heroku to create a space for Git to deliver your files to.
	
	Terminal should say `Git remote heroku added`.

---

- [ ] add local branch 
- [ ] push 	




### License

[![](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License ](http://creativecommons.org/licenses/by-nc-sa/4.0)

