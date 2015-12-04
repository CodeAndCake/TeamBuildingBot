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

#### Stuff you need installed

This bot is built with [Node.js](https://nodejs.org/) so before you get any further:

1. Go to [nodejs.org](https://nodejs.org/en/download) and download the *installer* for your operating system.
2. Install it..
3. To check if it's installed:  
	* In Terminal / CP, type `node -v` and press the `↲` (Enter) key.
	* If Terminal / CP shows a number, like `v0.10.26` then it means you have version 0.10.26 installed. 

#### OK, got everything installed

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

This means that instead of running your bot from the Terminal on your computer, you can deploy it to Heroku and it will tweet from there, however many times you want (per hour, day, week..)!

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
* Type `heroku create` and hit 	`↲` (Enter).  
  
	Here, you're asking Heroku to create a space for Git to deliver your files to.
	
	Terminal should say `Git remote heroku added`.
* <sup>**OPTIONAL**</sup> Let's create a separate branch for your bot on Heroku.   
  
	This will allow you to add your `config.js` file with all your secret Twitter info to a new `heroku` branch, whilst keeping the `master` branch clean and backed-up on GitHub.
  
	`git checkout -b heroku`
	
	Remove `config.js` from `.gitignore`
	
	`git commit -am "Config for Heroku"`
* Now it's time to deploy your bot to Heroku!

	`git push heroku heroku:master`
	
	Terminal should start spitting out a lot of messages, starting from `Counting objects: 57, done.` and finishing with 
	
	```
	remote: Verifying deploy... done.
	To https://git.heroku.com/YOUR_HEROKU_NAME.git
 	* [new branch]      heroku -> master
 	```	
 	
 	This means that your bot is deployed. :ok_hand:
* And, for the almost final step, type in `heroku run node bot.js` and hit `↲` (Enter).
	
	You're now testing the bot by telling Heroku to run it. 	
	If Terminal, after munching your `users` tells you something like `DONE!` followed by a sentence then it means it has tweeted! Go check out your bot's Twitter account and see for yourself.
* Now, the whole thing about Heroku is that you can schedule how often you want it to get your bot to tweet, so you don't have to do it yourself.

	Type in `heroku addons:create scheduler:standard` and hit `↲` (Enter).
	
	If you have not added your card to Heroku, now's the time to do so. In fact, it will prompt you to do so.
	
	Once you've done that, type in `heroku addons:open scheduler` and hit `↲` (Enter). Terminal will open this page
	
	![](https://cdn-images-1.medium.com/max/800/1*wkh3ViAUyfkXRdrte3t5bQ.png)
	
	Click `Add new job`.
	
	In the filed that starts with `$` type in `node bot.js`
	
	The rest is kind of self-explanatory (if you've got so far!).	 
	
	Click `Save` and your bot is all set up! :tada:


### License

[![](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0)

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License ](http://creativecommons.org/licenses/by-nc-sa/4.0)

