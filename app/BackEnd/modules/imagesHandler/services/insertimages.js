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
		  host: "eu-cdbr-azure-west-c.cloudapp.net",
		  user: "bce64f7320c3cb",
		  password: "30ec7bc5",
		  database:"acsm_57c4ae9f2742a96"
		});

		con.connect(function(err){
		  if(err)
		  {
		    console.log(err);
		    return;
		  }
		  else
		  {
		  	console.log('Connection established');
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
		});
	
};
