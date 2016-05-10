var express = require('express');
var insertimg = require('../services/insertimages');
var getimgfromdb = require('../services/getimagesfromdb');
var bodyParser = require("body-parser");


var listFunctionImg = express.Router();

//for JSON data
listFunctionImg.use(bodyParser.json());

listFunctionImg.post('/insertimg',insertimg.insert);//insert images into the server

listFunctionImg.get('/getimg',getimgfromdb.getimg);//get images from the server

exports.listFunctionImg = listFunctionImg;