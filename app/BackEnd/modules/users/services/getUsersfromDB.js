var mysql = require("mysql");

exports.getUsersDB = function(req,res){
	var con = mysql.createConnection({
		  host: "eu-cdbr-azure-west-c.cloudapp.net",
		  user: "bce64f7320c3cb",
		  password: "30ec7bc5",
		  database:"acsm_57c4ae9f2742a96"
		});
		//Local connection
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
	  	con.query("SELECT token FROM client WHERE idclient = ?", req.body.clientId, function(err,rows){
		  if(err) throw err;

		  if(rows.length != 0)
		  {
		  	res.json({sucess: true, msg:"idClient Exist>>>>>>>>>>", token: rows[0].token});
		  }
		  else
		  {
		  	res.json({sucess: false, msg: "IdClient doesnt exist>>>>>>>"})
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