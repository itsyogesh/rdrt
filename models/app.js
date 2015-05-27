//Load required packages
var mongoose = require('mongoose');

var App = new Mongoose.Schema({
	user_id: {type: String, required: true},
	name: {type: String, required: true},
	default: {type: String, required: true},
	base: {type: String, required: true, unique: true},
	web_url: {type: String},
	android_url: {type: String},
	ios_url: {type: String},
	windows_url: {type: String},
	preferences: {}
});

module.exports = mongoose.model('App', App);
