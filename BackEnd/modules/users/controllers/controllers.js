
var express = require('express');
var getUsers = require('../services/getUsersfromDB');
var createUser = require('../services/createUser');
var deleteUser = require('../services/deleteUser');
var storeUser = require('../services/storeUserToDB');



var listFunctions = express.Router(); //I create an instance of routes 

listFunctions.get("/show",getUsers.getUsersDB);//getUsers(res,req);

listFunctions.post('/create', createUser.createUser);//createUser(res,req);


listFunctions.post('/delete', deleteUser.deleteUser)//deleteUser(res,req);


listFunctions.post('/store', storeUser.storeUser);//storeUser(res,req);


exports.listFunctions = listFunctions;