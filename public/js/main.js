var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller("MainCtrl", function ($rootScope,$scope,$location,$http, $window){
	
	$rootScope.authenicated = false;
	$location.path("/");
	
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		
		if(next.requireLogin) {
			event.preventDefault();
			if($rootScope.authenicated){
				$location.path("/");
			}
		}
	});
});

myApp.factory('authInterceptor', function ($rootScope,  $location,$q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
        $location.path("/");
      }
      return response || $q.when(response);
    }
  };
});

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});