'use strict';

rdrt.factory('token', ['$window', function($window){
	var storage = $window.localStorage;
	var cachedToken;
	var userToken = 'token';

	var token = {
		setToken: function(token){
			cachedToken = token;
			storage.setItem(userToken, token);
		},

		getToken: function(){
			if(!cachedToken){
				cachedToken = storage.getItem(userToken);
			}

			return cachedToken;
		},

		removeToken: function(){
			cachedToken = null;
			storage.removeItem(userToken);
		},

		isAuthenticated: function(){
			return !!token.getToken();
		}
	}
	return token;
}]);