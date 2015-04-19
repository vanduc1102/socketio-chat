myApp.controller('WelcomeCtrl', function ($scope, $http, $window) {
  $scope.message = '';
  $http
      .get('/api/restricted')
      .success(function (data, status, headers, config) {
        $scope.message = data["message"];
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;

        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
      });
});