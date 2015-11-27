<!-- TODO

### WTF?

-->

### One Twitter bot to *cohere* your team.



### Get started

1. [Fork this repository](#fork-destination-box) and clone it to your computer.
* Go to [apps.twitter.com](https://apps.twitter.com) and create a **new app**.
* Rename `RENAME_MEconfig.js` file: call it `config.js`
* In `config.js` change `YOUR_TWITTER_APP_CONSUMER_KEY` and the other bits in capitals to your Twitter app's values 

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
* Navigate to this folder in Terminal and then run `sudo npm install`
* Test the bot by running `node bot.js`	
