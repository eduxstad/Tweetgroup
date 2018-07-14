Tweetgroup
===

#### Twitter -> GroupMe 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://raw.githubusercontent.com/eduxstad/Tweetgroup/master/app.json)

---

This script takes tweets and posts them in a GroupMe chat. You will need a [GroupMe bot](dev.groupme.com) and also a [Twitter app](https://apps.twitter.com/). There are several config variables you will need to set. 

To get the basic experience working:
* `ACCESS_TOKEN` and `ACCESS_TOKEN_SECRET` are both from your Twitter App. 
* `BOT_ID` is your GroupMe Bot. 
* `CALLBACK` is the url of your heroku app. 
* `FOLLOWING` is the Twitter id's of the users you want to follow. 
* `PRIVATE_TWITTER` is the username of the twitter account you want to follow

To get more advanced and add more users, you are going to have to manually define this code block in tweetgroup.js: 
```
if(event.user.screen_name == "TWITTER_USERNAME") {
	sendMessage(parseMessage(event), process.env.BOT_ID2);
} else if(event.user.screen_name == "TWITTER_USERNAME2") {
	sendMessage(parseMessage(event), process.env.BOT_ID3);
} else if(event.user.screen_name == process.env.PRIVATE_TWITTER) {
	sendMessage(parseMessage(event), process.env.BOT_ID);
}
``` 