
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
  FacebookStrategy = require('passport-facebook').Strategy;

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var TWILIO_NUMBER = '441597800020',
	TEST_NUMBER = '+4407459877051',
	TWILIO_ACCOUNT_SID = 'AC6d16eb3e05917c21e93bb96ea4698b5f',
	TWILIO_AUTH_TOKEN = '4c7ef46516983d77713fda5a66df1cd0';

var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
 

// client.sendSms({
//     to: TEST_NUMBER,
//     from: TWILIO_NUMBER,
//     body:'Another.'
// 	}, function(error, message) {
//     if (!error) {
//         console.log('Success! The SID for this SMS message is:');
//         console.log(message.sid);
//         console.log('Message sent on:');
//         console.log(message.dateCreated);
//     } else {
//         console.log('Oops! There was an error.');
//     }
// });

client.calls.list(function(err, data) {
    data.calls.forEach(function(call) {
        console.log(call.Direction);
    });
});

client.messages.list(function(err, data) {
    data.messages.forEach(function(message) {
        console.log("Twillo message: " + util.inspect(message.body,false,null));
    });
});

var resp = new twilio.TwimlResponse();
resp.say({voice:'woman'}, 'Welcome to ADD!');

resp.gather({ timeout:30 }, function() {

    // In the context of the callback, "this" refers to the parent TwiML
    // node. The parent node has functions on it for all allowed child
    // nodes. For <Gather>, these are <Say> and <Play>.
    this.say('For sales, press 1. For support, press 2.');});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: '607322559356477',
    clientSecret: 'a2356bc540f1e1823a38cb59d835d4f2',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

/**
 * Configuration
 */

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

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

/* Twillo thingy */

//	listen for incoming sms messages
app.post('/message', function (request, response) {
	var d = new Date();
	var date = d.toLocaleString();

	var messagesRef = {
		sid: request.param('MessageSid'),
		type:'text',
		direction: "inbound",
		tstamp: date,
		fromNumber:request.param('From'),
		textMessage:request.param('Body'),
		fromCity:request.param('FromCity'),
		fromState:request.param('FromState'),
		fromCountry:request.param('FromCountry')
	}

	io.sockets.emit('send:new_sms', messagesRef);

	var resp = new twilio.TwimlResponse();
	resp.message('Thanks for the message.');
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


// Authentication

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

// JSON API
app.get('/api/name', api.name);
app.get('/api/bangladesh', api.bangladesh);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
