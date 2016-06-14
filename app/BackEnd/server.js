/******
	Web server with Express
******/

var express = require('express');
var path = require('path');
var routes = require('./modules/users/routes/routes');
var ctrUsers = require('./modules/users/controllers/controllers');
var ctrimages = require('./modules/imagesHandler/controllers/controllers');
var ctrpay = require('./modules/payment/controllers/controller');




var app = express();

//Using all these below folders as static, Angular will take over for front end
app.use(express.static(path.join(__dirname, '..') + '/FrontEnd/bower_components/'));
app.use(express.static(path.join(__dirname, '..') + '/FrontEnd/node_modules/'));
app.use(express.static(path.join(__dirname, '..') + '/FrontEnd/deploy/'));
app.use(express.static(path.join(__dirname, '..') + '/FrontEnd/modules/'));



//Middlewares
app.use('/api',ctrUsers.listFunctions);
app.use('/api',ctrimages.listFunctionImg);
app.use('/api',ctrpay.listFunctionspay);



//Loading the index Page when run the server
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..') + '/FrontEnd/index.html'));


app.listen(3000,function(){
	console.log('App listening on port 3000');
});

