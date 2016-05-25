angular.module('basketCrt',[])
.controller('defaultValueBasket', function($scope,$http,$window) {

  
  /************
    *Initializate variables
  ***********/
  $scope.veapps =[];//veapps initialized

  if(!$window.sessionStorage.getItem("veprompt") && !$window.sessionStorage.getItem("vecontact"))//If all the items removed from basket not display the basketTable
      {
        $window.sessionStorage.removeItem("veapps");
      }

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


/***************
  *Adding the item into the basket*
***************/
 $scope.addveappsToBasket = function(veappfromSessionStorage)
  {
    if(veappfromSessionStorage == "veprompt")
    {
      $scope.veapps.push($scope.veprompt);
    }
    else if(veappfromSessionStorage == "vecontact")
    {
      $scope.veapps.push($scope.vecontact);
    }
  }

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

   /***************
    *Displaying basket*
  ***************/

  $scope.veappsEnable = false;
  $scope.veAppsSelectedFromSessionStorage = function()
  {
    if($window.sessionStorage.getItem("veapps"))
    {
      console.log("veapps Saved");
      $scope.veappsEnable = true;
      if($window.sessionStorage.getItem("veprompt"))
      {
        var veprompt = "veprompt";
        $scope.addveappsToBasket(veprompt);
      }
      if($window.sessionStorage.getItem("vecontact"))
      {
        var vecontact = "vecontact";
        $scope.addveappsToBasket("vecontact");
      }

    }
  }();

 

  


});