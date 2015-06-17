 
var platforms = ['web', 'android', 'ios', 'windows'],
	REDIRECT_URL_HOLDER = 'redirect_url_holder',
	APP_NAME_HOLDER = 'app_name',
	FALLBACK_URL_HOLDER = 'fallback_url_holder';

var generator = require('./generator');
var constants = require('../config/constants');

var redirectPagesPath = require('../config/config').templatePath;

var fs = require('fs');

var url = {
	/*
	* Sets (creates/updates) a url based on the arguments
	* @params urlObject: Object of the url or the app,
	* @params request: Request header from the call 
	*/
	setUrl: function(request, url){

		platforms.forEach(function(platform){
			if(request[platform]){
				url[platform] = request[platform];
			}
		});

		if(!url.preferences){
			url.preferences = {};
		}
		platforms.forEach(function(platform){

			if(request.preferences[platform] && url[platform]){
				var pref = "pref_"+ platform;
				url.preferences[platform] = 
				request.preferences[pref] ? request.preferences[pref] : true;
			}
		});

		return url;
	},

	/*
	* Generates a redirect url based on the user agent and the app/url preferences
	* If no url is present it returns the app default.
	* @params url: Object of the url or the app
	* @params app: App object
	* @params userAgent: UserAgent object
	*/
	redirectUrl: function(url, app, userAgent){
		var agent = generator.userAgent(userAgent);
		
		if(agent === constants.ios && app.ios && url.ios) {
			return generator.ios(app.ios.scheme, url.ios);
		}

		if(agent === constants.android && app.android && url.android){
			return generator.android(app.android.scheme, url.android);
		}

		if(agent === constants.windows && app.windows && url.windows){
			return generator.windows(app.windows.scheme, url.windows);
		}

		if(agent === constants.web && url.web){
			return url.web;
		}

		return app.preferences.default;
	},

	redirectPage: function(redirectUrl, app, isWeb, callback){
		var redirectPage = redirectPagesPath + 'url.html';
		var fallbackUrl = generator.fallback(app);

		fs.readFile(redirectPage, function(err, data){
			if(err){
				return callback(err);
			}

			var html = data.toString();
			if(app.logo){
				//Todo							
			}
			html = replaceAll(html, APP_NAME_HOLDER, app.name);
			html = html.replace(REDIRECT_URL_HOLDER, redirectUrl);
			if(!isWeb){
				html = html.replace(FALLBACK_URL_HOLDER, fallbackUrl);
			}

			return callback(null, html);

		});
	}
};

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

module.exports = url;
