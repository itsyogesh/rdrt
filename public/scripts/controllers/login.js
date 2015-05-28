'use strict';

rdrt.controller('loginController', ['$scope', '$state', 'auth', 
	function($scope, $state, auth){
		
		$scope.submit = function(){
			var user = {
				email: $scope.email,
				password: $scope.password
			};

			auth.login(user)
				.success(function(res){
					$state.go('dashboard');
				})
				.error(function(err){
					console.log(err);
				});
		};
}]);