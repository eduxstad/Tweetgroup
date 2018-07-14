	//facegroup.js
//Facegroup - Facebook -> GroupMe - v0.1 - by eduxstad
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var Twitter = require("twitter");
//landing page 
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); app.listen((process.env.PORT || 5000)); // Server index page
app.get("/", function (req, res) {
  res.send("Deploy Successful!");
});

//GroupMe Bot request setup
var headers = {
  'User-Agent': 'Facegroup/0.1',
  'Content-Type': 'application/json'
}
function sendMessage(message, botId) {
  //send GroupMe Message
  var options = {
    url: 'https://api.groupme.com/v3/bots/post',
    method: 'POST',
    headers: headers,
    form: {'text': message, "bot_id": botId}
  }
  
  request(options, function (error, response, body) {
    if (!error || response.statusCode == 200) {
      console.log("Message sent!");
      console.log(body);
    } else {
      console.log("Message not sent, unsuccessful");
      console.log(body);
    }  
	});
}
function parseMessage(event) { //make sure the message is not truncated
	if (typeof event.retweeted_status != 'undefined') {
		//console.log("Retweet Incoming!");
		//console.log(event.retweeted_status.extended_tweet.full_text);
		return "RT @" + event.retweeted_status.user.screen_name+ ": " + event.retweeted_status.extended_tweet.full_text;
	} else if(typeof event.extended_tweet === 'undefined') {
		return event.text;
	} else {
		return event.extended_tweet.full_text;
	}
}
//keys and secrets - manage these in heroku
var config = {
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

var twitter = new Twitter(config);
var params = { follow: process.env.FOLLOWING };
var stream = twitter.stream('statuses/filter', params);

stream.on('error', function(error) {
	console.log(error);
});

stream.on('data', function(event) {
	//console.log(event);
	console.log(parseMessage(event));
	//console.log(event);
	//parseMessage(event);
	if(event.user.screen_name == "EPHS_APCP") {
		sendMessage(parseMessage(event), process.env.HOLLENBECK);
	} else if(event.user.screen_name == "EPeducator1") {
		sendMessage(parseMessage(event), process.env.SIBLEY);
	} else if(event.user.screen_name == process.env.PRIVATE_TWITTER) {
		sendMessage(parseMessage(event), process.env.BOT_ID);
	}	
});

var http = require("http");
setInterval(function() {
    http.get("http://tweetgroup.herokuapp.com");
}, 300000)
