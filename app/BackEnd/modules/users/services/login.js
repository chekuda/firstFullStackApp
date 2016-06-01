var mysql = require("mysql");
var path = require('path');
var createToken = require("../services/createToken");
var config = require("../../../configuration/config");//Caling the configuration file for secretPassword

exports.login = function(req,res){

	if(req.body.username == config.userName && req.body.password ==config.passWord)
	{
		var token = createToken.tokenCreated(req.body.username);//saving the new token for this user on var token
		res.json({success:true,token: token,admin:true,msg:"Adminitrator logged"})
	}
	else{
		//Conection with the DB
		var con = mysql.createConnection({
		  hostname: "eu-cdbr-azure-west-c.cloudapp.net",
		  user: "bce64f7320c3cb",
		  password: "30ec7bc5",
		  database:"acsm_57c4ae9f2742a96"
		});

		con.connect(function(err){
		  if(err){
		    res.json({success:false,msg:err});
		    return;
		  }
		  console.log('Connection established');
		});

		if(con)
		{
			//Query to get the Row by USERNAME
			con.query("SELECT * FROM users WHERE username = ?", req.body.username, function(err,rows){
			  if(err) throw err;

			  if(rows.length != 0)
			  {
			  	//If userName is right, checking the password
			  	if(rows[0].password == req.body.password)
			  	{
			  		var token = createToken.tokenCreated(req.body.username);//saving the new token for this user on var token
			  		res.json({success:true,token: token,admin:false,msg:"User logged"});
			  	}
			  	else{
			  		//Password falied
			  		res.json({success:false,msg:"Wrong password"});
			  	}
			  }
			  else
			  {//Client doesnt exist
			  	res.json({success:false,msg:"Client doesnt exist"});
			  }

			});

			con.end(function(err) {
				res.json({success:false,msg:"Conexion not working"});
			  // The connection is terminated gracefully
			  // Ensures all previously enqueued queries are still
			  // before sending a COM_QUIT packet to the MySQL server.
			});
		};
	}
	
};