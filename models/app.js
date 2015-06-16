//Load required packages
var mongoose = require('mongoose');

var App = new mongoose.Schema({
	user_id: {type: String, required: true},
	name: {type: String, required: true},
	base: {type: String, required: true, unique: true},
	logo: {type: String},

	web: {
		url: {type: String}
	},

	android: {
		scheme:{type: String},
		package:{type: String},
		store_url: {type: String}
	},

	ios: {
		scheme: {type: String},
		store_url: {type: String}
	},

	windows: {
		scheme: {type: String},
		store_url: {type: String}
	},
	
	preferences: {
		ios: {type: Boolean},
		android: {type: Boolean},
		windows: {type: Boolean},
		default_url: {type: String}
	}
});

module.exports = mongoose.model('App', App);
