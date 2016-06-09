// var mysql = require("mysql");

// exports.deleteUser = function(req,res){
// 	var con = mysql.createConnection({
// 		  host: "eu-cdbr-azure-west-c.cloudapp.net",
// 		  user: "bce64f7320c3cb",
// 		  password: "30ec7bc5",
// 		  database:"acsm_57c4ae9f2742a96"
// 		});

// 	con.connect(function(err){
// 	  if(err){
// 	    console.log(err);
// 	    return;
// 	  }
// 	  console.log('Connection established');
// 	});

// 	if(con)
// 	{
// 		//Add the query

// 		con.end(function(err) {
// 		  // The connection is terminated gracefully
// 		  // Ensures all previously enqueued queries are still
// 		  // before sending a COM_QUIT packet to the MySQL server.
// 		});
// 	};
// };