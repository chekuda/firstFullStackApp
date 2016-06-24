
    /**************
      Home function
    **************/

    angular.module('homePageCtr',[])
    .controller('homeCtr',function($scope,$http,$window) {
      $scope.clientId = {clientId: $window.sessionStorage.getItem("clientId")};
      $scope.totalToken = 0;
      if($window.sessionStorage.getItem("clientId"))
      {
         $scope.getTokenFromClient = function()
        {
          $http({
              url: '/api/getClient',
              method: 'POST',
              data: $scope.clientId
              })
              .success(function (data){
                $scope.totalToken = data.token;
                console.log(data);//Number of token of the client from DB
                })
              .error(function(err)
              {
                console.log(">>>>>>>>>>>>Error getting the client token reminded: "+err);
              })
        }();
      }
      else
      {
        window.location = "/";
      }
     

      
    });
