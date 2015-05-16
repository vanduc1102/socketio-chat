myApp.controller('WelcomeCtrl', function ($scope,$rootScope, $location,$http, $window) {
	$scope.message = '';
	var socket = $rootScope.socket;
	var messagesElement = angular.element("#messages");
	var messageElement = angular.element("#message");
	$scope.logoutButtonClick = function(){
		socket.disconnect();
		delete $window.sessionStorage.token;
		$location.path("/");
	}
	
	$scope.onSendMessage = function(){
		var message = messageElement.val();
		if(message){
			var data = {
				"message":message,
				"type":"userMessage"
			};
			socket.send(JSON.stringify(data));
			messageElement.val('');
		}
		
	}
	
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
	
	socket.on("message",function(data){
		data = JSON.parse(data);
		if(data.type == "serverMessage"){
			messagesElement.append('<div class="'+data.type+'"><span>'+data.message+'</span></div>');
		}else{
			messagesElement.append('<div class="'+data.type+'"><span>'+data.username+' : </span><span>'+data.message+'</span></div>');
		}
	});
	
	socket.on('name_set',function(data){
		messagesElement.append('<div class="'+data.type+'"><span>Hello </span><span>'+data.username+'! </span></div>');
	});
	
	socket.on("user_entered", function(user){
		messagesElement.append('<div class="systemMessage">' +user.username + ' has joined the room.' + '</div>');
	});
	
	socket.on("user_left", function(user){
		messagesElement.append('<div class="systemMessage">' +user.username + ' has left the room.' + '</div>');
	});
		
	$http.get('/api/welcome')
	.success(function (data, status, headers, config) {
		$scope.message = data["message"];
    })
	.error(function (data, status, headers, config) {
		delete $window.sessionStorage.token;
		$scope.message = 'Error: Invalid user or password';
    });
}).directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.ngEnter);
					scope.onSendMessage();
				});
				event.preventDefault();
			}
		});
    };
});
