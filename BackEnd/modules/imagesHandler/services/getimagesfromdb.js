var mysql = require("mysql");

exports.getimg = function (req,res) {
	//conextion to the DDBB
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
		con.query("SELECT * FROM imgtool", function(err,rows)
		{
			res.send(rows);
		});
	}
}