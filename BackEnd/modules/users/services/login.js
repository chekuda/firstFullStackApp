var mysql = require("mysql");
var path = require('path');

exports.login = function(req,res){
	//Conection with the DB
	var con = mysql.createConnection({
	  hostname: "localhost",
	  user: "checa",
	  password: "200288",
	  database:"vebuilde_2"
	});

	con.connect(function(err){
	  if(err){
	    console.log(err);
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
		  		res.send("success");
		  	}
		  	else{
		  		res.send("Wrong Password");
		  	}
		  }
		  else
		  {
		  	res.send("User doesn't exist");
		  }

		});

		con.end(function(err) {
		  // The connection is terminated gracefully
		  // Ensures all previously enqueued queries are still
		  // before sending a COM_QUIT packet to the MySQL server.
		});
	};
};