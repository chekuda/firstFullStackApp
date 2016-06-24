angular.module('basketCrt',['paymentCtr'])
// .factory('valuetoCharge', function(){//Send money to payment
//   var preTokenTotal = 0;
//   return {
//     getValue: function()
//       {
//         return preTokenTotal;  
//       },
//       changeValue: function(value)
//       {
//         preTokenTotal = value;//* 100;//I got the value from the controller and multiply per 100 to get the HKD
//       }
//   };
// })
.controller('defaultValueBasket', function($scope,$http,$window,$rootScope) {


  $scope.veprompt = {
    type: "veprompt",
    imgURL:"media/basket/vePromptBasket.png",
    description:"VePrompt. Website overlays",
    token: "1"
  };
   $scope.vecontact = {
    type: "vecontact",
    imgURL:"media/basket/veContactBasket.png",
    description:"VeContactm. Email Basket recovery",
    token: "1"
  };

  $scope.veappsEnable = false;//for displaying basket function
  $scope.clientId = {clientId: $window.sessionStorage.getItem("clientId")};
  $scope.clientDataAfterPay = {clientId: $window.sessionStorage.getItem("clientId"), token: false};
  $scope.totalBasket = 0;//TotalBasket
  $scope.totalToken = 0;
  $scope.preToken = 0;
  $scope.topupOrPay = false;//This will be for display the right button
  
  /************
    *Initializate variables
  ***********/
  $scope.veapps =[];//veapps initialized

  if(!$window.sessionStorage.getItem("veprompt") && !$window.sessionStorage.getItem("vecontact"))//If all the items removed from basket not display the basketTable
      {
        $window.sessionStorage.removeItem("veapps");
      }


 /***************
    *Get number of token of the client*
  ***************/

  $rootScope.$on("getNumberTokens",function(event)
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
   });

  if($window.sessionStorage.getItem("clientId"))
  {
    console.log("There is not clientId into the sessionStorage>>>>");
  }
  else
  {
    console.log("Problem to access the IDClient from sessionStorage");
  }

   /***************
    *Displaying basket*
  ***************/

  $scope.veAppsSelectedFromSessionStorage = function()
  {

    if($window.sessionStorage.getItem("veapps"))
    {
      console.log("Veapps Enabled");
      $scope.veappsEnable = true;
      if($window.sessionStorage.getItem("veprompt"))
      {
        var veprompt = "veprompt";
        $scope.veapps.push($scope.veprompt);
        $scope.totalBasket++;//Icreasing totalBasket

      }
      if($window.sessionStorage.getItem("vecontact"))
      {
        var vecontact = "vecontact";
         $scope.veapps.push($scope.vecontact);
         $scope.totalBasket++;//Icreasing totalBasket
      }

    }
  }();



/***********************
  Delete item from basket
************************/

  $scope.deleteItem = function(deletingApp)
  {
      if(deletingApp == "veprompt")
      {
        $window.sessionStorage.removeItem("veprompt");
        $window.sessionStorage.removeItem("vePromptTheme");
      }
      if(deletingApp == "vecontact")
      {
        $window.sessionStorage.removeItem("vecontact");
        $window.sessionStorage.removeItem("veContacTheme")
      }

      $window.location.reload();
  }

  /***********************
   Display the modal
  ************************/

   $scope.openModal = function(deletingApp)
  {
    if($scope.totalToken<$scope.totalBasket)
    {
       $("#paymentModal").modal("show");
    }
    else
    {
        $scope.clientDataAfterPay.token = $scope.totalToken - $scope.totalBasket;
        if($scope.clientDataAfterPay.token<0)
        {
          alert("There is a error, please contact us for further information");
        }
        else
        {
          //Add the token to the client on DB
        $http({
        url: '/api/updateToken',
        method: 'POST',
        data: $scope.clientDataAfterPay
        })
        .success(function (data){
          console.log(data);//Number of token of the client from DB
          $scope.deleteItem("veprompt");
          $scope.deleteItem("vecontact");
          $window.location = "http://localhost:3000/home";
          })
        .error(function(err)
        {
          console.log(">>>>>>>>>>>>Error getting the client token reminded: "+err);
        })
        }
    }
  }

    /***********************
      Increase/Decrease preToken
    ************************/
  $scope.modidfyToken = function(actionToken)
  {
      if(actionToken == 'decrease' && $scope.preToken>0)
      {
        $scope.preToken--;
      }
      else if(actionToken == 'increase' && $scope.preToken>=0)
      {
        $scope.preToken++;
      }
      else{
        console.log("Can't get less than 0 tokens")
      }
    
  }

  /***********************
      It will update the value of token in the factory to feed the payment later
      Also an event will be launched to the paymentController.js
    ************************/
  $scope.updateTotalTokensPay = function()
  {
    // valuetoCharge.changeValue($scope.preToken);//Update the quantiy of token in factory
    $rootScope.$emit("getValueAmountOfTokens",$scope.preToken);//Launch the event to receive by the paymentController
  }


})
/*************************
  **Using directive to load the HTML for veContact**
************************/
.directive('ngPaymentemplate', function(){
  return {
    templateUrl: "basketpage/views/paymentMethod.html"
  }
})