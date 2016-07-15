'use strict';
// Server.js to setup application
// Express is the framework.
// Ejs is the templating engine.(Will user Angular in the end)
// Mongoose is object modeling for our MongoDB database.
// Passport will authenticate with different methods.
// Connect-flash allows for passing session flashdata messages.
// Bcrypt-nodejs gives us the ability to hash the password.


//***set up***
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



mongoose.connect(configDB.url); //connects to MongoDB

require('./config/passport')(passport); // pass passport for configuration

//set up express
   app.use(morgan('dev')); // log every request to the console
   app.use(cookieParser()); // read cookies (needed for auth)
   app.use(bodyParser.json()); // get information from html forms
       app.use(bodyParser.urlencoded({ extended: true }));

   app.set('view engine', 'ejs'); // set up ejs for templating
   app.use(express.static(__dirname + '/views'));//Static files CSS/Ang templates etc.


// ** required for passport
   app.use(session({secret: 'PassportTraveler'})); // session secret
   app.use(passport.initialize());
   app.use(passport.session()); // persistent login sessions
   app.use(flash()); // for FlasH messages

//routes
require('./app/routes.js')(app, passport);
//load our routes and pass in fully configured passport

//launch
app.listen(port);
console.log('The gate to Gondor has opened on port: ' + port);
