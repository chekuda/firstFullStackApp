var mysql = require("mysql");

exports.updateToken = function(req,res){
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
	  if(err)
	  {
	    console.log(err);
	    return;
	  }
	  else
	  {
	  	console.log('Connection established');
	  	

		  	con.query("UPDATE client SET token = ? WHERE idclient = ?", [req.body.token,req.body.clientId], function(error,result){
		  		if(err) throw err;

		  		if(result)
	  			{
	  				res.json({sucess: true, msg:"idClient Exist and token updated>>>>>>>>>>",result:result});
	  			}
	  			else{
	  				res.json({sucess: false, msg: error});
	  			}
		  	});
		  	
		

		con.end(function(err) {
		  // The connection is terminated gracefully
		  // Ensures all previously enqueued queries are still
		  // before sending a COM_QUIT packet to the MySQL server.
		});
	  }
	  
	});
};