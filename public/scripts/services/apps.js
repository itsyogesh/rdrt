'use strict';

rdrt.service('appService', ['$http', 'API_URL'  function($http, API_URL){

	var app_url = API_URL + 'apps';
	
	function appBaseUrl(appBase){
		return app_url + '/' + base;
	}

	this.getApps = function(){
		return $http.get(app_url);
	}

	this.addApp = function(app){
		return $http.post(app_url, app);
	}

	this.getApp = function(appBase){
		var url = appBaseUrl(appBase);
		return $http.get(url);
	}

	this.updateApp = function(appBase, updatedApp){
		var url = appBaseUrl(appBase);
		return $http.put(appBase, updatedApp);
	}

	this.deleteApp = function(appBase){
		var url = appBaseUrl(appBase);
		return $http.delete(url);
	}

}]);