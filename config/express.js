/******
	Web server with Express
******/

var express = require('express');
var path = require('path');
var routes = require('../app/BackEnd/modules/users/routes/routes');
var ctrUsers = require('../app/BackEnd/modules/users/controllers/controllers');
var ctrimages = require('../app/BackEnd/modules/imagesHandler/controllers/controllers');
var ctrpay = require('../app/BackEnd/modules/payment/controllers/controller');




module.exports= function(app){
	//Using all these below folders as static, Angular will take over for front end
	app.use(express.static(path.join(__dirname, '..') + '/app/FrontEnd/bower_components/'));
	app.use(express.static(path.join(__dirname, '..') + '/app/FrontEnd/node_modules/'));
	app.use(express.static(path.join(__dirname, '..') + '/app/FrontEnd/deploy/'));
	app.use(express.static(path.join(__dirname, '..') + '/app/FrontEnd/modules/'));



	//Middlewares
	app.use('/api',ctrUsers.listFunctions);
	app.use('/api',ctrimages.listFunctionImg);
	app.use('/api',ctrpay.listFunctionspay);

	//error function
	app.use(function(err, req, res, next) {
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	});


	//Loading the index Page when run the server
	app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..') + '/app/FrontEnd/index.html'));


	
};



