angular.module('insertImagestoDB',[])
	.controller("insert", function($scope,$http){
		$scope.img = {
			appName: "",
			template: "",
			sector: "",
			typeimage: "",
			source: ""
		};
		$scope.alertMessage={
			display: false,
			alertStatus:"",
			msg:""
		};

		$scope.insertImage = function(img,alertMessage)
		{
			if($scope.img.appName && $scope.img.template && $scope.img.typeimage && $scope.img.source && $scope.img.sector)
			{
				$http.post('/api/insertimg',$scope.img)
				.success(function(data){
		          if(data.success)
		          {//if the image has been inserted properly

		          	//Display an sucess alert
		            $scope.alertMessage.display = data.success;
		            $scope.alertMessage.alertStatus = data.alertStatus;
		            $scope.alertMessage.msg = data.msg;

		            //Remove all the values
		            $scope.img.appName = "";
		            $scope.img.template = "";
		            $scope.img.sector = "";
		            $scope.img.typeimage = "";
		            $scope.img.source = "";


		          }
		        })
		        .error(function(data){//Any problem into the insertion
		        	$scope.alertMessage.display = data.success;
	            	$scope.alertMessage.alertStatus = data.alertStatus;
		            $scope.alertMessage.msg = data.msg;
		          	console.log('Error: '+ data);
		        });
		      }
			else{
				$scope.alertMessage.display = true;
            	$scope.alertMessage.alertStatus = "alert-danger";
	            $scope.alertMessage.msg = "Please check that all your fields are ok";
			}
		}
	});