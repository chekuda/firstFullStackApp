var express = require('express');
var bodyParser = require("body-parser");
var acceptbypaypal = require("../services/paymentbypaypal");
var executeP = require("../services/executepayment");

var listFunctionspay = express.Router();

//In case I receive any JSON data
listFunctionspay.use(bodyParser.json());

listFunctionspay.post("/connectPaypal",acceptbypaypal.acceptpaybypaypal);//geToken, create a payment

listFunctionspay.post("/executepayment",executeP.executePayment);//geToken, create a payment

exports.listFunctionspay = listFunctionspay;


