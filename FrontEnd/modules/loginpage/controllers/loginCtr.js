// exports = angular.module('loginToken',[])

// /**************
//       Login function
//     **************/
    
//     .controller('formLogin',function($scope,$http) {
//       $scope.credentials = {//Using the model credentials from the form
//         username:"",
//         password:""
//       };

//       //Function called from the form, credential Object will be passed
//       $scope.loginP = function(credentials){
//         $http.post('/api/login',$scope.credentials)//Calling the API fir the right login data
//         .success(function(data){
//           if(data.success)
//           {//if client exist I will add the token to the sessionStorage
//             console.log(data.token);
//             window.sessionStorage.token = data.token;
//             //Redirect the client to the home page
//             location.pathname="/";
//           }
//           else{//if the anything is wrong in the login details I will display an alert
//             console.log(data);
//             alert(data.msg);
//           }
//         })
//         .error(function(data){
//           console.log('Error: '+ data);
//         });
//       };
// });