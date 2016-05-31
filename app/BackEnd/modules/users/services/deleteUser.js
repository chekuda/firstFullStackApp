var mysql = require("mysql");

exports.deleteUser = function(req,res){
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
		//Add the query

		con.end(function(err) {
		  // The connection is terminated gracefully
		  // Ensures all previously enqueued queries are still
		  // before sending a COM_QUIT packet to the MySQL server.
		});
	};
};