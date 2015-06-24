'use strict';

var tld = 'rdrt.me';
var notInstalledUrl = '/notinstalled';
var constants = require('../config/constants');
var iosAgent = ['isiPhone', 'isiPad', 'isiPod'];
var	androidAgent = 'isAndroid';
var	windowsAgent = 'isWindows';


var generator = {
	/*
	* Generates a intent specific url based on android
	* For eg: intent://product?url=catalog.xyz.com#intent;scheme=scheme;end;
	* @params host: url that has to shown/ path
	* @params scheme: custom scheme for the app deep link
	*/
	android: function(scheme, host){
		var url = "intent:/"
		if(host){
			url += host;
		}

		url = url + "#intent;"; 

		if(scheme){
			url = url + "scheme=" + scheme + ";";
		}

		url += "end"

		return url;
	},
	/*
	* Generates an ios specific deep link url
	* For eg: paytmmp://product?url=catalog/xyz/com
	*/
	ios: function(scheme, host){
		var url = scheme + "://";

		if(host){
			if(host[0] == '/'){
				host.slice(1);
			}
			url += host;
		}

		return url;
	},
	/*
	* Generates a windows phone specific deep link url
	* For eg: paytmmp://product?url=catalog/xyz/com
	*/
	windows: function(scheme, host){
		var url = scheme + "://";

		if(host){
			if(host[0] == '/'){
				host.slice(1);
			}
			url += host;
		}

		return url;
	},

	androidApp: function(app, appInstalled){
		var url = "intent:/#intent;"; 
		if(!appInstalled){
			url = url + "package=" + app.android.package + ';';
			if(app.web){
				url = url + "S.browser_fallback_url=" + app.web.url + ";"; 
			}
			else {
				url = url + "S.browser_fallback_url=" + app.android.store_url + ";";
			}
			url += "end"
			return url;
		}

		url = url + "scheme=" + app.android.scheme + ";";
		url += "end"
		return url;

	},

	iosApp: function(app, appInstalled){
		
		if(!appInstalled){
			return app.ios.store_url;
		}

		var url = app.ios.scheme + "://";
		return url;
	},

	windowsApp: function(app, appInstalled){
		if(!appInstalled){
			return app.windows.store_url;
		}

		var url = app.windows.scheme + "://";
		return url;	
	},

	userAgent: function(userAgent){
		if(userAgent[iosAgent[0]] || userAgent[iosAgent[1]] || userAgent[iosAgent[2]]) {
			return constants.ios;
		}

		if(userAgent[androidAgent]){
			return constants.android;
		}

		if(userAgent[windowsAgent]){
			return constants.windows;
		}

		else return constants.web;
	},

	subdomain: function(host){
		var subdomain = host.split('.');
		
		if(subdomain.length > 2){
			subdomain = subdomain[0];
			return subdomain;
		}

		else return null;

	},
	/*
	* Generate fallback url based on the app
	* @params app: app object
	*/
	fallback: function(app){
		var url = "http://" + app.base + '.' + tld + notInstalledUrl;
		return url;
	},

	androidFallback: function(app){
		if(app.web){
			return app.web.url;
		}

		return app.android.store_url;
	}
};

module.exports = generator;