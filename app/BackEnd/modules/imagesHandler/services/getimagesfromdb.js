var mysql = require("mysql");

exports.getimg = function (req,res) {
	//conextion to the DDBB
	var con = mysql.createConnection({
		  host: "eu-cdbr-azure-west-c.cloudapp.net",
		  user: "bce64f7320c3cb",
		  password: "30ec7bc5",
		  database:"acsm_57c4ae9f2742a96"
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