var REDIRECT_URL_HOLDER = 'redirect_url_holder';
var	APP_NAME_HOLDER = 'app_name';
var	FALLBACK_URL_HOLDER = 'fallback_url_holder';

var generator = require('./generator');
var constants = require('../config/constants');

var redirectPagesPath = require('../config/config').templatePath;

var fs = require('fs');

var app = {


	/*
	* Generates a redirect app url based on the user agent and the app preferences
	* If no url is present it returns the app default
	* @params app: App Object
	* @params appInstalled: App installed boolean
	* @params userAgent: UserAgent object
	*/
	redirectApp: function(app, appInstalled, userAgent){

		var agent = generator.userAgent(userAgent);

		if( agent === constants.ios && app.ios) {
			return generator.iosApp(app, appInstalled);
		}

		if(agent === constants.android && app.android){
			return generator.androidApp(app, appInstalled);
		}

		if(agent === constants.windows && app.windows){
			return generator.windowsApp(app, appInstalled);
		}

		if(agent === constants.web && app.web){
			return app.web.url;
		}
		
		return app.preferences.default;
	},

	redirectPage: function(redirectUrl, app, isWeb, callback){
		var redirectPage = redirectPagesPath + 'app.html';
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
	},

	noAppPage: function(redirectUrl, app, callback){
		var redirectPage = redirectPagesPath + 'no-app.html';

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

module.exports = app;
