var express = require('express');
var config = require('./config/config');

var app = express();

require('./config/express')(app);

app.listen(config.port,function(){
		console.log('App listening on port ' + config.port);
	});
