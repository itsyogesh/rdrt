'use strict';

var app = require('express')();
var mongoose = require('mongoose');
var logger = require('winston');
var multer = require('multer');
var bodyParser = require('body-parser');
var passport = require('passport');

var api = require('./routes/api');

mongoose.connect('mongodb://localhost:27017/rdrt');
console.info('Connected to mongodb');

//Using passport
app.use(passport.initialize());

passport.serializeUser(function(user, callback){
	callback(null, user.id);
});

//Using body-parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

//Multer for files
app.use(multer({
	dest: './uploads'
}));

//CORS Functionality
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});

//Use routes
app.use('/api', api.userRouter, api.appRouter, api.urlRouter);

//Setting up ports
var port = process.env.PORT || 3000;

app.listen(port);
console.log('server started on ' + port);
