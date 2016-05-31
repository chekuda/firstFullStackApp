var jwt = require("jsonwebtoken");
var config = require("../../../configuration/config");//Caling the configuration file for secretPassword

exports.tokenCreated = function(user) {
	return jwt.sign(user, config.superSecret, { //returns a new token
		
	});
}