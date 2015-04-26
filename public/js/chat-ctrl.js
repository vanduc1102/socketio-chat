myApp.controller('WelcomeCtrl', function ($scope, $location,$http, $window) {
	$scope.message = '';
    var socket;
	$scope.logoutButtonClick = function(){
		delete $window.sessionStorage.token;
		$location.path("/");
	}
	
	function connect () {
		socket = io.connect($window.sessionStorage.token ? ('?token=' + $window.sessionStorage.token) : '', {
			'forceNew': true
		});
		socket.on('pong', function () {
			console.log('- pong');
		}).on('time', function (data) {
			console.log('- broadcast: ' + data);
		}).on('authenticated', function () {
			console.log('- authenticated');
		}).on('disconnect', function () {
			console.log('- disconnected');
		}).on("error", function(error) {
			if (error.type == "UnauthorizedError" || error.code == "invalid_token") {
				// redirect user to login page perhaps?
				console.log("User's token has expired");
			}
		});
	}
	connect(); //connect now, it will drop
		
	$http.get('/api/welcome')
	.success(function (data, status, headers, config) {
		$scope.message = data["message"];
    })
	.error(function (data, status, headers, config) {
		delete $window.sessionStorage.token;
		$scope.message = 'Error: Invalid user or password';
    });
});