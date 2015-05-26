//Load required packages
var mongoose = require('mongoose');

var Url = mongoose.Schema({
	user_id: {type: String, required=true},
	app_id: {type: String, required=true},
	url_id: {type: String, required=true},
	web_url: {type: String},
	android_url: {type: String},
	ios_url: {type: String},
	windows_url: {type: String},
	preferences: {}
});

Url.methods.verifyUrl = function(url, callback){
	
	Url.find({app_id: url.app_id}, function(err, urls){
		if(urls){
			urls.forEach(function(urlObject){
				if(url.url_id === urlObject.url_id){
					var error = new Error('This url-id is already in use');
					return callback(error);
				}
			});
		}
	});
});

module.exports = mongoose.model('Url', Url);