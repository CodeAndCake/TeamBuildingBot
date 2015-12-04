module.exports = 
{
	keys:
	{
		consumer_key: 'YOUR_TWITTER_APP_CONSUMER_KEY',
		consumer_secret: 'YOUR_TWITTER_APP_CONSUMER_SECRET',
		access_token_key: 'YOUR_TWITTER_APP_TOKEN_KEY',
		access_token_secret: 'YOUR_TWITTER_APP_TOKEN_SECRET'
	},
	users: 
	[
		'SOME_TWITTER_HANDLE', // eg: 'POTUS' or 'Snowden' (without @ in front)
		'CHANGE_THIS',
		'AND_THIS',
		'YOU_CAN_ADD_AS_MANY_AS_YOU_LIKE'
	],
	howManySentences: 1, // how many sentences to generate and tweet?
	charactersToRemove: ',:;"()[]{}/' // all the characters that you don't want to see in the bot's tweets
}