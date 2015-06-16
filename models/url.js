//Load required packages
var mongoose = require('mongoose');

var Url = mongoose.Schema({
	user_id: {type: String, required: true},
	app_id: {type: String, required: true},
	base: {type: String, required: true},
	web: {type: String},
	android: {type: String},
	ios: {type: String},
	windows: {type: String},
	preferences: {
		ios: {type: Boolean},
		android: {type: Boolean},
		windows: {type: Boolean},
	}
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
};

module.exports = mongoose.model('Url', Url);