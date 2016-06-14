angular.module('basketCrt',['paymentCtr'])
.factory('valuetoCharge', function(){//Send money to payment
  var preTokenTotal = 0;
  return {
    getValue: function()
      {
        return preTokenTotal;  
      },
      changeValue: function(value)
      {
        preTokenTotal = value;//* 100;//I got the value from the controller and multiply per 100 to get the HKD
      }
  };
})
.controller('defaultValueBasket', function($scope,$http,$window,$rootScope,valuetoCharge) {


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

  $scope.totalBasket = 0;//TotalBasket
  $scope.totalToken = 0;
  $scope.preToken = 0;//I will give this value to totalToken when be redirect from Paypal
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
      }
      if(deletingApp == "vecontact")
      {
        $window.sessionStorage.removeItem("vecontact");
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
      console.log("Payment Done");
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
    valuetoCharge.changeValue($scope.preToken);//Update the quantiy of token in factory
    $rootScope.$emit("getValueAmountOfTokens");//Launch the event to receive by the paymentController
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