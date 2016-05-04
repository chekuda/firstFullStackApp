/******
	Web server with Express
******/

var express = require('express');
var path = require('path');
var routes = require('./modules/users/routes/routes');
var controllers = require('./modules/users/controllers/controllers');



var app = express();

app.use(express.static(path.join(__dirname, '..') + '/FrontEnd/bower_components/'));
app.use(express.static(path.join(__dirname, '..') + '/FrontEnd/node_modules/'));
app.use(express.static(path.join(__dirname, '..') + '/FrontEnd/public/'));
app.use(express.static(path.join(__dirname, '..') + '/FrontEnd/modules/'));



app.use('/api',controllers.listFunctions);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..') + '/FrontEnd/index.html'));


app.listen(3000,function(){
	console.log('App listening on port 3000');
});


