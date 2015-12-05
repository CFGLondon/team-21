
/**
 * Module dependencies
 */

var util = require('util'),
  express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  cookieParser = require("cookie-parser"),
  passport = require('passport'),
  twilio = require('twilio'),
  session = require('express-session'),
  FacebookStrategy = require('passport-facebook').Strategy,
  fs = require('fs'),
  MsTranslator = require('mstranslator');

var app = module.exports = express();
var server = require('http').createServer(app);

var TWILIO_NUMBER = '441597800020',
	TEST_NUMBER = '+4407459877051',
	TWILIO_ACCOUNT_SID = 'AC6d16eb3e05917c21e93bb96ea4698b5f',
	TWILIO_AUTH_TOKEN = '4c7ef46516983d77713fda5a66df1cd0';

var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

var resp = new twilio.TwimlResponse();
resp.say({voice:'woman'}, 'Welcome to ADD!');

resp.gather({ timeout:30 }, function() {

    // In the context of the callback, "this" refers to the parent TwiML
    // node. The parent node has functions on it for all allowed child
    // nodes. For <Gather>, these are <Say> and <Play>.
    this.say('For sales, press 1. For support, press 2.');});

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(cookieParser());
app.use(express.methodOverride());
app.use(session({ secret: 'jpm2015' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('prod') === 'production') {
  // TODO
};


var translatorClient = new MsTranslator({
  client_id: "Team21ADD"
  , client_secret: "3Dopv4qM1C14WewQII8B6l/7NqeXr0gq8oMRyLSzVQE="
}, true);

/* Twillo thingy */

var messages = [];

//	listen for incoming sms messages
app.post('/message', function (request, response) {
	var d = new Date();
	var date = d.toLocaleString();

	var smsBody = request.param('Body');

	var translatedSmsBody = '';
	var detectedLangauge = 'en';

	// detect sms language
	translatorClient.detect({ text: smsBody }, function(err, data) {
	  detectedLangauge = data;

		var params = {
		  text: smsBody
		  , from: detectedLangauge
		  , to: 'en'
		};

		// translate from detected language to enslish
		translatorClient.translate(params, function(err, data) {
		  translatedSmsBody = data;
		});

	});

	var messagesRef = {
		sid: request.param('MessageSid'),
		type:'text',
		direction: "inbound",
		tstamp: date,
		fromNumber:request.param('From'),
		textMessage:translatedSmsBody,
		fromCity:request.param('FromCity'),
		fromState:request.param('FromState'),
		fromCountry:request.param('FromCountry')
	}

	messages.push(messagesRef);

	var outputFilename = 'messages.json';

	var params = {
	  text: 'Thanks for the message.'
	  , from: 'en'
	  , to: detectedLangauge
	};

	var translatedSmsReply = 'Thanks for the message.';

	// translate from detected language to enslish
	translatorClient.translate(params, function(err, data) {
	  translatedSmsBody = data;
	});

	var resp = new twilio.TwimlResponse();
	resp.message(translatedSmsBody);
	response.writeHead(200, {
		'Content-Type':'text/xml'
	});

	response.end(resp.toString());
});

/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);


// JSON API
app.get('/api/name', api.name);
app.get('/api/bangladesh', api.bangladesh);
app.get('/api/sudan', api.sudan);

app.get('/api/messages', function (rew,res) {
	res.json(messages);
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
