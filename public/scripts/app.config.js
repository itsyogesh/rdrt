'use strict';

rdrt.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', 
	function($urlRouterProvider, $stateProvider, $httpProvider) {
	
	$stateProvider.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	});

	$stateProvider.state('register', {
		url: '/register',
		templateUrl: '/views/register.html'
	});

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/views/register.html'
	});

	$stateProvider.state('dashboard', {
		url: '/dashboard',
		templateUrl: '/views/dashboard.html'
	});

	$httpProvider.interceptors.push('authInterceptor');
}])

.constant('API_URL', 'http://localhost/3000/api');