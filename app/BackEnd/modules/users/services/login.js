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
		  host: "eu-cdbr-azure-west-c.cloudapp.net",
		  user: "bce64f7320c3cb",
		  password: "30ec7bc5",
		  database:"acsm_57c4ae9f2742a96"
		});

		// //Local connection
		// var con = mysql.createConnection({
		//   hostname: "localhost",
		//   user: "checa",
		//   password: "200288",
		//   database:"vebuilde_2"
		// });

		con.connect(function(err){
		  if(err){
		    res.json({success:false,msg:err,manualError:"Not connected"});
		    return;
		  }
		  else
		  {
		  	console.log('Connection established');
		  	//Query to get the Row by USERNAME
			con.query("SELECT * FROM client WHERE company_name = ?", req.body.username, function(err,rows){
			  if(err) throw err;

			  if(rows.length != 0)
			  {
			  	//If userName is right, checking the password
			  	if(rows[0].password == req.body.password)
			  	{
			  		var token = createToken.tokenCreated(req.body.username);//saving the new token for this user on var token
			  		res.json({success:true,token: token,admin:false,msg:"User logged",clientId: rows[0].idclient});
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
			  // The connection is terminated gracefully
			  // Ensures all previously enqueued queries are still
			  // before sending a COM_QUIT packet to the MySQL server.
			});
			
		  }
		  
		});

	}
	
}