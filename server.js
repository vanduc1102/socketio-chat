var express = require('express');
var app = express();
var http = require('http').Server(app);
var compression = require('compression');

var httpPort = process.env.PORT || 3000;
var oneDay = 86400000;

app.use(compression());

app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

http.listen(httpPort, function(){
  console.log('listening on *:'+httpPort);
});