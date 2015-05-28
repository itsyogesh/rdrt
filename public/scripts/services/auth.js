'use strict';

rdrt.service('auth', ['$http','token', '$state', 'API_URL',
	function($http, authToken, $state, $window, API_URL){
	
	function authSuccess(res){
		authToken.setToken(res.token);
	}

	this.login = function(user){
		var url = API_URL + 'login';
		$http.post(url, user).success(authSuccess);
	};

	this.register = function(user){
		var url = API_URL + 'register';
		$http.post(url, user).success(authSuccess);
	}

}]);