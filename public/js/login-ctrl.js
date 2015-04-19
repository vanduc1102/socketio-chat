myApp.controller('LoginCtrl', function ($scope, $http, $location,$window) {
  $scope.user={};
  $scope.submit = function () {
    $http
      .post('/login', $scope.user)
      .success(function (data, status, headers, config) {
        if(status != 401){
          $window.sessionStorage.token = data.token;
          console.log(data);
          $location.path("/welcome");
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