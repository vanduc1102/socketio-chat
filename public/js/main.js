var DEBUG=true;
var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller("MainCtrl", function ($rootScope,$scope,$location,$http, $window){
	if(!$window.sessionStorage.token){
		$rootScope.authenicated = false;
		$location.path("/");
	}else{
		$rootScope.socket = io.connect($window.sessionStorage.token ? ('?token=' + $window.sessionStorage.token) : '',{
				'forceNew': true
		});
		$rootScope.socket.emit("set_name", {name: $window.sessionStorage.username});  
	}	
	
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		
		if(next.requireLogin) {
			if($rootScope.authenicated == false){
				event.preventDefault();
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
