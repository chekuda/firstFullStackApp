var jwt = require("jsonwebtoken");
var config = require("../../../configuration/config");//Caling the configuration file for secretPassword

exports.authentication = function(req,res){
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) { //if token exists
		jwt.verify(token, config.superSecret, (err) => { //Verify token
			if (err) { //if token has expired
				res.status(401).json({
					status: 'Unauthorized'
				});
			} else { //if token is valid
				res.json({
					success: true
				});
			}
		});
	} else { //if token not found
		res.status(401).json({
			status: 'Unauthorized'
		});

	}
}