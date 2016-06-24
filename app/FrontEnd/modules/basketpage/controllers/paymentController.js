angular.module('paymentCtr',[])
.controller('paymentMethod', function($scope,$http,$window,$rootScope) {

  $scope.displayAlert = 1;//var for display if the payment is success
    $scope.clientDataAfterPay ="";
    $scope.client_secret="";//Secret retrieved from Backend
    $scope.paymentM = "";//Payment method sent by ngClick from DOM
    $scope.paymentCreated = "";//Data regarding to the created payment received from backEnd 

  $scope.paypalSale = {//Var for paypal Sale
    intent:"sale",
    redirect_urls:{
      return_url:"http://localhost:3000/basket",
      cancel_url:"http://localhost:3000/basket"
    },
    payer:{
      payment_method:"paypal"
    },
    transactions:[
      {
        amount:{
          total:"1.00",
          currency:"GBP"
        },
        description:"No description"
      }
    ]
  };

  $scope.paypalCreditCardSale = {//var for credit cart
    intent:"sale",
    redirect_urls:{
      return_url:"http://localhost:3000/basket",
      cancel_url:"http://localhost:3000/basket"
    },
    payer:{
      payment_method:"credit_card",
      funding_instruments:[
        {
          credit_card:{
            // number:"4137355479710937",
            // type:"VISA",
            // expire_month:"07",
            // expire_year:"2021",
            // cvv2:"479",
            // first_name:"test",
            // last_name:"test"
            number:"",
            type:"",
            expire_month:"",
            expire_year:"",
            cvv2:"",
            first_name:"",
            last_name:""
          }
        }
      ]
    },
    transactions:[
      {
        amount:{
          total:"1.00",
          currency:"GBP"
        },
        description:"No Description"
      }
    ]
  };

//EventLisstener when the client start payment the value of token will be updated
//THis event comming fron basketCtr.js
 $rootScope.$on("getValueAmountOfTokens", function(event,tokensToPay)
 {
  $scope.paypalCreditCardSale.transactions[0].amount.total = tokensToPay;
  $scope.paypalSale.transactions[0].amount.total = tokensToPay;

  //Check if the clientId is on sessionStorage
  if($window.sessionStorage.getItem("clientId"))
  {
    //CreditCardPayment
    $scope.paypalCreditCardSale.transactions[0].description= JSON.stringify({clientId: $window.sessionStorage.getItem("clientId"),token: tokensToPay});

    //Paypal PaymentJSON.stringify(description);
    $scope.paypalSale.transactions[0].description = JSON.stringify({clientId: $window.sessionStorage.getItem("clientId"),token: tokensToPay});
  }
  else{
    $window.sessionStorage.clear();
    $window.location.reload();
  }
  
  console.log("CREDIT CARD tokens>>>>>>> "+$scope.paypalCreditCardSale.transactions[0].amount.total);
  console.log("Paypal tokens>>>>>>> "+$scope.paypalSale.transactions[0].amount.total);
 });

  /*******************************
    Check if the payment have been aprroved or not
    #By the post information throught paypal into the URL
  ********************************/

  $scope.checkifApprovedByPaypal = function(){

    if(location.search)
    {
      $scope.executePaymentDetails=
      {
        paymentByURL: location.search.match(/PAY.\w+/),
        tokenByURL: sessionStorage.getItem("tokenPaypal"),//location.search.match(/EC.\w+/);
        payerByURL: location.search.match(/\w+\w$/)
      }
      //If everything is right
      if($scope.executePaymentDetails.tokenByURL)
      {
        if($scope.executePaymentDetails.paymentByURL && $scope.executePaymentDetails.payerByURL)
         {
          //    //@paymentId payerByURL[0]

             $http({
              url: '/api/executepayment',
              method: 'POST',
              data: $scope.executePaymentDetails
              })
              .success(function (data){
                console.log("PAYMENT SUCCESS>>>>>\n");
                console.log(data);
                $scope.clientDataAfterPay = JSON.parse(JSON.parse(data.msg).transactions[0].description);//Get the clientId and token purchased from de request
                console.log($scope.clientDataAfterPay);
                //Get the token of the client and sum 
                $http({
                  url: '/api/getClient',
                  method: 'POST',
                  data: $scope.clientDataAfterPay
                  })
                  .success(function (data){
                    $scope.clientDataAfterPay.token = data.token + $scope.clientDataAfterPay.token;//Get the client token and sum to the pruchased token
                    console.log(data);//Number of token of the client from DB
                    //Add the token to the client on DB
                    $http({
                    url: '/api/updateToken',
                    method: 'POST',
                    data: $scope.clientDataAfterPay
                    })
                    .success(function (data){
                      console.log(data);//Number of token of the client from DB
                      $rootScope.$emit("getNumberTokens");
                      })
                    .error(function(err)
                    {
                      console.log(">>>>>>>>>>>>Error getting the client token reminded: "+err);
                      $rootScope.$emit("getNumberTokens");
                    })
                    
                    })
                  .error(function(err)
                  {
                    console.log(">>>>>>>>>>>>Error getting the client token reminded: "+err);
                    $rootScope.$emit("getNumberTokens");
                  })
                sessionStorage.removeItem("tokenPaypal");//Removing the token

              })
              .error(function(err){
                console.log("PAYMENT FAILED>>>>>\n");
                $rootScope.$emit("getNumberTokens");
              })

          }
          else
          {
            console.log(">>>>>>>>>>>>>>>Error: Couldn't get the paymentId from URL");
            $rootScope.$emit("getNumberTokens");
          }
      }
       
    }
    else
    {
        console.log(">>>>>>>>>>>>>>>No Checkout Page");
        $rootScope.$emit("getNumberTokens");//Call to basketCOntrollern for the this function in order to update the tokens
    }

  }();

  /*******************************
    Calling the backEnd for Get the token and create a payment
  ********************************/
  $scope.createApayment = function(methodSelected)
  {
    //Choose the payment by the client
    if(methodSelected == "creditCard")
    {
      $scope.paymentM = $scope.paypalCreditCardSale;
    }
    else if(methodSelected == "paypal")
    {
      $scope.paymentM = $scope.paypalSale;
    }
    else
    {
      console.log("Error:>>>>>Method wrong spel it");
    }

    if(!location.search)
    {
      $http({
          url: '/api/connectPaypal',
          method: 'POST',
          data: $scope.paymentM
        })
          .success(function (data)
            {//Receive the payment created and now I have to redirect
            console.log(data);
            sessionStorage.setItem("tokenPaypal", data.tokenPaypal);//save the token into the sessionStorage
            $scope.paymentCreated = JSON.parse(data.payCreated);//PayCreate need to be parse in order to get all the arguments
            if($scope.paymentCreated.payer.payment_method == "paypal")
            {
              if( $scope.paymentCreated.links[1].method == "REDIRECT")//Only for paypal
              {
                window.location = $scope.paymentCreated.links[1].href;
              }
              else
              {
                console.log("Error: Couldnt redirect to paypal page");
              }
            }
            else if($scope.paymentCreated.payer.payment_method == "credit_card")
            {
              console.log("Credit Card Payment Success>>>>>\n")
              sessionStorage.removeItem("tokenPaypal");//Remove the item in order to not load the page with the token in it
              console.log("PAYID>>>>>>>>>>\n"+$scope.paymentCreated.id);
              window.location = window.location.href + "?" +$scope.paymentCreated.id;//Reload the page with the PAYID in the URL
            }
            else
            {
              console.log("ERROR>>>>>>Wrong payment method selected");
            }
         })
          .error(function(err){
            console.log(err);
          })
    }
  }



});