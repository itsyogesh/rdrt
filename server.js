'use strict';

var app = require('express')();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');

mongoose.connect('mongodb://localhost:27017/rdrt');
console.info('Connected to mongodb');

//Using passport
app.use(passport.initialize());

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

//Using body-parser
app.use(bodyParser.json());

app.use(bodyParser.urlEncoded({
	extended: true
}));

//CORS Functionality
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});

//Use routes
app.use('/', api);

//Setting up ports
var port = process.env.PORT || 3000;

app.listen(port);
console.log('server started on ' + port);
