myApp.controller('WelcomeCtrl', function ($scope, $location,$http, $window) {
  $scope.message = '';
  
  $scope.logoutButtonClick = function(){
	delete $window.sessionStorage.token;
    $location.path("/");
  }
  
  $http
      .get('/api/welcome')
      .success(function (data, status, headers, config) {
		console.log("data : ",data);
        $scope.message = data["message"];
      })
      .error(function (data, status, headers, config) {
        delete $window.sessionStorage.token;
        $scope.message = 'Error: Invalid user or password';
      });
});