var jwt = require('./jwt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../models/user.js');
var params = {usernameField: 'email'};

//Local stratrgy for email, password based authentication

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

//Bearer stategy for handling token based authentication

var bearerStrategy = new BearerStrategy(function(token, callback){
	var decodedToken = jwt.decodeToken(token);
	User.findById(decodedToken.sub, function(err, user){
		if(err){
			return callback(err, false);
		}

		return callback(null, user);
	});
});

//Use local strategy with passport
passport.use(localStrategy);

//Use bearer strategy with passport
passport.use(bearerStrategy);

exports.isAuthenticated = passport.authenticate(['local', 'bearer'], {session: false});