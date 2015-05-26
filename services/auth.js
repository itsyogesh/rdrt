var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');
var params = {usernameField: 'email'};

var localStrategy = new LocalStrategy(params, function(email, password, callback){
	User.findOne({email: email}, function(err, user){
		if(err){
			return callback(err);
		}

		if(!user){
			return callback(null, false, {message: 'Invalid email/password'});
		}

		user.comparePassword(password, function(err, isMatch){
			if(err){
				return callback(err);
			}

			if(!isMatch){
				return callback(null, false, {message: 'Invalid email/password'});
			}

			return callback(user);
		});

	});
});

//Use local strategy with passport
passport.use(localStrategy);

exports.isAuthenticated = passport.authenticate('local');