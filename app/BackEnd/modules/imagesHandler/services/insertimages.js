/***********
	API for inserting images in the DDBB
		@Admin user will be available for this
		@This images will be for new templates
		@Dont forget all the fields
************/

var mysql = require("mysql");

exports.insert = function (req,res) {
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
		if(req.body.appName && req.body.template && req.body.sector && req.body.typeimage && req.body.source)
		{
			
			
			con.query("INSERT INTO imgtool SET ?", req.body, function(err,result)
			{
				if(err) throw err;

				console.log(result);

				res.json({
					success:true,
					msg:"Image Inserted successfully",
					alertStatus: "alert-success"
				});
			});
		}
		else
		{
			res.json({
				success: false,
				msg: "Image has not been inserted",
				alertStatus: "alert-danger"
			})
		}
	}
};
