myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/welcome/', {
        templateUrl: 'partials/welcome.html',
        controller: 'WelcomeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);