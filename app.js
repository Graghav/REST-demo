var express    = require('express');
var server     = express();
var path       = require('path');

var router     = require('./url');

var bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(express.static(path.join(__dirname, 'public')));

server.use('/v1',router(express));

server.listen(3000, function(){
	console.log('Server started and listening at Port 3000');
});

