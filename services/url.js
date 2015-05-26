
var deviceUrls = ['web_url', 'android_url', 'ios_url', 'windows_url'],
	preferences = ['ios', 'android', 'web', 'windows'],
	iosAgent = ['isiPad', 'isiPod', 'isiPhone'],
	androidAgent = 'isAndroid',
	windowsAgent = 'isWindows';

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
			if(request[pref] && urlObject[pref+'_url']){
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
		
		iosAgent.forEach(function(agent){
			if(userAgent[agent]){
				if(urlObject.preferences.ios){
					return urlObject.ios_url;
				}
			}
		});

		if(userAgent[androidAgent] && urlObject.preferences.android){
			return urlObject.android_url;
		}

		if(userAgent[windowsAgent] && urlObject.preferences.android){
			return urlObject.windows_url;
		}

		if(urlObject.preferences.web){
			return urlObject.windows_url;
		}

		return null;

	}
}
