
var deviceUrls = ['web_url', 'android_url', 'ios_url', 'windows_url'],
	preferences = ['ios', 'android', 'web', 'windows'],
	iosAgent = ['isiPhone', 'isiPad', 'isiPod'],
	androidAgent = 'isAndroid',
	windowsAgent = 'isWindows',
	REDIRECT_URL_HOLDER = 'redirect_url_holder';

var redirectPagesPath = require('../config/config').templatePath;

var fs = require('fs');

var url = {
	/*
	* Sets (creates/updates) a url based on the arguments
	* @params urlObject: Object of the url or the app,
	* @params request: Request header from the call 
	*/
	setUrl: function(request, urlObject){

		deviceUrls.forEach(function(device){
			if(request[device]){
				urlObject[device] = request[device];
			}
		});

		if(!urlObject.preferences){
			urlObject.preferences = {};
		}
		preferences.forEach(function(pref){

			if(request.preferences[pref] && urlObject[pref+'_url']){
				urlObject.preferences[pref] = request.preferences[pref];
			}
		});

		return urlObject;
	},

	/*
	* Generates a redirect url based on the user agent and the app/url preferences
	* If no url is present it sends null.
	* @params urlObject: Object of the url or the app
	* @params userAgent: UserAgent object
	*/
	redirectUrl: function(urlObject, userAgent){
		
		if((userAgent[iosAgent[0]] || userAgent[iosAgent[1]] || userAgent[iosAgent[3]]) && 
			urlObject.preferences.ios){
			return urlObject.ios_url;
		}

		if(userAgent[androidAgent] && urlObject.preferences.android){
			return urlObject.android_url;
		}

		if(userAgent[windowsAgent] && urlObject.preferences.windows){
			return urlObject.windows_url;
		}

		return null;
	},

	subdomain: function(host){
		var subdomain = host.split('.');
		if(subdomain.length > 2){
			subdomain = subdomain[0];
			return subdomain;
		}

		else return null;

	},

	redirectPage: function(redirectUrl, pageName, callback){
		var redirectPage = redirectPagesPath + pageName + '.html';

		fs.readFile(redirectPage, function(err, data){
			if(err){
				return callback(err);
			}

			var html = data.toString();
			html = html.replace(REDIRECT_URL_HOLDER, redirectUrl);
			return callback(null, html);

		});
		
	}
};

module.exports = url;
