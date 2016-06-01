
    /**************
      Login function
    **************/

    angular.module('loginctr',[])
    .controller('formLogin',function($scope,$http,$window) {
      $scope.credentials = {//Using the model credentials from the form
        username:"",
        password:""
      };

      //Function called from the form, credential Object will be passed
      $scope.loginP = function(credentials){
        $http.post('/api/login',$scope.credentials)//Calling the API fir the right login data
        .success(function(data){
          if(data.success)
          {//if client exist I will add the token to the sessionStorage
            console.log(data.token);
            $window.sessionStorage.token = data.token;
            $window.sessionStorage.admin = data.admin;//saving the admin into the ssessionStore
            if(data.admin)
            {
              location.pathname="/uimages";//if the client is master
            }
            else{
              //Redirect the client to the home page
              location.pathname="/home";//if the client is user
            }
          }
          else{//if the anything is wrong in the login details I will display an alert
            console.log(data);
            alert(data.msg);
          }
        })
        .error(function(data){
          console.log('Error: api no working cos '+ data.msg);
          console.log('Error: api no working cos '+ data.msg);
        });
        });
      };
    });
