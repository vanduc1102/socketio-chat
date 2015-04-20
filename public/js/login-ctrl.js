myApp.controller('LoginCtrl', function ($rootScope,$scope, $http, $location,$window) {
  $scope.user={};
  $scope.submit = function () {
    $http
      .post('/login', $scope.user)
      .success(function (data, status, headers, config) {
        if(status == 200){
			$window.sessionStorage.token = data.token;
			$rootScope.authenicated=true;
			$location.path("/welcome");		  
        }else{		
			$rootScope.authenicated=false;
			$location.path("/");
		}        
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;

        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
      });
  };
});