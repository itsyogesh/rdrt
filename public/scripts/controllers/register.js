'use strict';

rdrt.controller('registerController', ['$scope', '$state', 'auth', 
	function($scope, $state, auth){
		
		var user = {
			name: $scope.name,
			email: $scope.email,
			password: $scope.password
		};

		auth.register(user)
			.success(function(res){
				$state.go('dashboard');
			})
			.error(function(err){
				console.log(err);
			})
}]);