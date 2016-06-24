
var express = require('express');
var getUsers = require('../services/getUsersfromDB');
// var createUser = require('../services/createUser');
// var deleteUser = require('../services/deleteUser');
// var storeUser = require('../services/storeUserToDB');
var updateToken = require('../services/updateToken');
var login = require('../services/login');
var bodyParser = require("body-parser");
var auth = require("../services/authenticationToken");



var listFunctions = express.Router(); //I create an instance of routes 

//In case I receive any JSON data
listFunctions.use(bodyParser.json());

listFunctions.post("/login",login.login);//Login function

listFunctions.post("/auth",auth.authentication);//Checking the token

listFunctions.post('/getClient', getUsers.getUsersDB);//Get users from DD

listFunctions.post('/updateToken', updateToken.updateToken);//modify the token after pay

// listFunctions.post('/create', createUser.createUser);//createUser

// listFunctions.post('/delete', deleteUser.deleteUser)//deleteUser


// listFunctions.post('/store', storeUser.storeUser);//storeUser


exports.listFunctions = listFunctions;