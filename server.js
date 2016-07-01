'use strict';
// Server.js to setup application
// Express is the framework.
// Ejs is the templating engine.
// Mongoose is object modeling for our MongoDB database.
// Passport stuff will help us authenticating with different methods.
// Connect-flash allows for passing session flashdata messages.
// Bcrypt-nodejs gives us the ability to hash the password.

//set up
// get all tools needed

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//configuration
mongoose.connect(configDB.url); //connects to MongoDB

require('./config/passport')(passport); // pass passport for configuration

//set up express app
app.use(morgan('dev')); // log every request to console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); //ejs templating
// app.use(express.static('views'));
// app.use(express.static(__dirname + '/views'));



// required for Passport
app.use(session({secret:"PassportTravler"})); //session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

//routes
require('./app/routes.js')(app, passport); //load our routes and pass in full app and configured passport

//launch
app.listen(port);
console.log('The gate to Gondor has opened on port: ' + port);
