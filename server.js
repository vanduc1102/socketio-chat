var express = require('express');
var app = express();
var http = require('http').Server(app);
var compression = require('compression');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');

var httpPort = process.env.PORT || 3000;
var oneDay = 86400000;

var jwtSecret = "gP?9x(8SM48aob38VK<Z!M:gs0Q;a8G8vx=}3i*2%l`bw*jefz02s2bAJDOlB+V";

app.use(bodyParser.json());
app.use(compression());

app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

var jwt = require('jsonwebtoken');

app.use('/api', expressJwt({"secret": jwtSecret,requestProperty: 'tokenData'}));
app.use('/api',function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
	res.status(401).send("Invalid token...");
  }else{
	next();
  }
});

app.post('/login', function (req, res) {
	
	// TODO: validate the actual user user
	var profile = {
		first_name: 'John',
		last_name: 'Doe',
		email: 'john@doe.com',
		id: 123
	};
	if (!(req.body.username === 'admin' && req.body.password === '123456')) {
		res.status(401).send('Wrong user or password');
		return;
	}

	// we are sending the profile in the token
	var token = jwt.sign(profile, jwtSecret, { expiresInMinutes: 60*5 });

	res.status(200).json({token: token});
  
});
app.get('/api/welcome', function (req, res) {
	res.status(200).json({message: "Welcome to our world"});  
});


http.listen(httpPort, function(){
  console.log('listening on *:'+httpPort);
});