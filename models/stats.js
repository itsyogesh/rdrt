//Load required packages

var mongoose = require('mongoose');

var stats: {

	AppStats: new mongoose.Schema({
		app_id: {type: String, required: true},
		referer: {type: String, required: true},
		user_agent: {type: mongoose.Schema.Types.Mixed, required: true},
		time: {type: Date, default: Date.now}
	}),

	UrlStats: new mongoose.Schema({
		url_id: {type: String, required: true},
		user_agent: {type: mongoose.Schema.Types.Mixed, required: true},
		time: {type: Date, default: Date.now}
	})
}

module.exports.AppStats = mongoose.model('AppStats', AppStats);
module.exports.UrlStats = mongoose.model('UrlStats', UrlStats);