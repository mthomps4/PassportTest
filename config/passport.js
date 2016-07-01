// Configures Strategies for Passport

//Load stuff
var LocalStrategy = require('passport-local').Strategy;

//Load user model

var User = require('../app/models/user.js');

//expose this function to app using exports

module.exports = function(passport){

  //passport session setup

  //required for persistent login
  //passports needs serial and unserial

  //used to serialize the user for session
  passport.serializeUser(function(user,done){
    done(null, user.id);
  });

  //used to deserialize the user
  passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

//Local Signup

//we are using named strategies since we have one for login and one for signup
//by default,if there is no name, it would be called 'local'

passport.use('local-signup', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
usernameField: 'email',
passwordField: 'password',
passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done){
  //asynchronous
  //User.findOne won't fire unless data is sent back

  process.nextTick(function(){
    //find a user whos email is same as form
    //does user exist already

    User.findOne({'local.email': email}, function(err,user){
      if(err) return done(err);
      //check if there is user with email
      if(user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      }else{
        //if no user with email
        //create user
        var newUser = new User();

        //set credentials
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        //save user
        newUser.save(function(err){
          if(err)
          throw err;
          return done(null, newUser);
        });
      }

    });
  });
}));
};//END module.exports Passport
