var mysql = require("mysql");

exports.getimg = function (req,res) {
	//conextion to the DDBB
	var con = mysql.createConnection({
		  host: "eu-cdbr-azure-west-c.cloudapp.net",
		  user: "bce64f7320c3cb",
		  password: "30ec7bc5",
		  database:"acsm_57c4ae9f2742a96"
		});
	// //Local connection
	// 	var con = mysql.createConnection({
	// 	  hostname: "localhost",
	// 	  user: "checa",
	// 	  password: "200288",
	// 	  database:"vebuilde_2"
	// 	});

		con.connect(function(err){
		  if(err){
		    console.log(err);
		    return;
		  }
		  else
		  {
		  	console.log('Connection established');
		  	con.query("SELECT * FROM theme_assets", function(err,rows)
			{
				res.send(rows);
			});	
		  }
		 
		});
}