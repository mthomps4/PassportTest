//User model
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define schema for user
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});//END USER SCHEMA

//Generate Hash
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Checking if PW valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

//create model for user and expose to app
module.exports = mongoose.model('User', userSchema);
