var express = require('express');
var app = express();
var http = require('http').Server(app);
var compression = require('compression');

var oneDay = 86400000;

app.use(compression());

app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

http.listen(3000, function(){
  console.log('listening on *:3000');
});