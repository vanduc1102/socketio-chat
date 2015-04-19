myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
		requireLogin: false
      }).
      when('/welcome/', {
        templateUrl: 'partials/welcome.html',
        controller: 'WelcomeCtrl',
		requireLogin: true
      }).
      otherwise({
        redirectTo: '/',
		requireLogin: false
      });
  }]);