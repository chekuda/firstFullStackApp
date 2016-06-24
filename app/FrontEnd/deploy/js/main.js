   /**
      *Main Controller
      @vepromptctr: vePrompt tool controller module
      @insertImagestoDB: Insert images in DB (administrator)
      @vecontactCtr: veContact tool controller module
    **/

    var app = angular.module('veoptimazer', ['ngImageInputWithPreview','ui.router','textAngular','ngRoute','ngAnimate','vepromptctr','vecontactCtr','loginctr','insertImagestoDB','basketCrt','homePageCtr']);//'ui.bootstrap'


    /***************
      Pre-load page, checking the token
    ***************/

    //Runing this controller before the page is loaded. Dependencies=>@Token and @needAuth
    app.run(['$rootScope', '$state','$location','$window','$http', function ($rootScope, $state, $location, $window, $http) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                var auth = toState.needAuth;
                var administrator = $window.sessionStorage.getItem("admin");
                var url = toState.url;
                if(auth)//if the client need authentication
                {
                    
                  if($window.sessionStorage.getItem("token"))
                   {
                    //This will give value to the token from sessionStore
                     var token = {token: window.sessionStorage.getItem("token")};
                    //Calling to the server to check it the token is right
                     $http.post('/api/auth',token)
                     .success(function(data){
                      console.log()
                        if(administrator=="false" && url == "/uimages")//forbiden access for not administrator
                        {
                          location.pathname="/home";
                        }
                        if(location.pathname=="/login")//if the client is authenticated and he/she request login page, this redirect to home page
                        {
                         location.pathname="/home";
                        }
                     })
                     .error(function(data)
                     {
                      //If the token is wrong this will redirect to the loginPage
                      location.pathname="/";
                      window.sessionStorage.removeItem("veprompt");
                      window.sessionStorage.removeItem("vecontact");
                     });
                   }
                   else{
                    location.pathname="/";
                      window.sessionStorage.removeItem("veprompt");
                      window.sessionStorage.removeItem("vecontact");
                    }
                }
                
            });
        }]);


    /************
    *Navigator bar managed with UIRouter
    *************/


    app.config(function($stateProvider, $urlRouterProvider,$locationProvider)//Router
    {
      $urlRouterProvider.otherwise("/home");

      $stateProvider
        .state('login',{
          url:"/",
          templateUrl:"/loginpage/views/login.html",
          needAuth: false,
          admin: false
        })
        .state('vecontact',{
          url:"/vecontact",
          templateUrl:"/vecontactpage/views/vecontact.html",
          needAuth: true,
          admin: false
        })
        .state('veprompt',{
          url:"/veprompt",
          templateUrl:"/vepromptpage/views/veprompt.html",
          needAuth: true,
          admin: false
        })
        .state('basket',{
          url:"/basket",
          templateUrl:"/basketpage/views/basket.html",
          needAuth: true,
          admin: false
        })
        .state('contactus',{
          url:"/contactus",
          templateUrl:"/contactuspage/views/contactus.html",
          needAuth: true,
          admin: false
        })
        .state('home',{
          url:"/home",
          templateUrl:"/mainpage/views/home.html",
          needAuth: true,
          admin: false
        })
        .state('uimages',{
          url:"/uimages",
          templateUrl:"/uploadimages/views/uimages.html",
          needAuth: true,
          admin: true
        });
        $locationProvider.html5Mode(true);//removing the hash
    });



    /*********************
      *NavBar active configuration
      @numItemsMenuBasket is the factory
      @$rootScope will be used for send scope values from different controllers
    *********************/
    app.controller('navCntr',function($scope,$location,$rootScope,$window,numItemsMenuBasket){


       $scope.numItemBasket = numItemsMenuBasket.getValue();
        $scope.isActive = function(viewLocation){
        var active = (viewLocation === $location.path());
        return active;
      }

      //Funtion to update the value of the number in Menu Basket when new app is saved
      $rootScope.$on("updateBasket",function(event,data){

          if(data == "veprompt" || data == "vecontact")//calling from veprormpt or Vecontact controller
          {
               if(!window.sessionStorage.getItem("veapps"))//if veapps is not already into the localstorage save it
                {
                  window.sessionStorage.setItem("veapps","true");
                }
                 if(!window.sessionStorage.getItem(data))//if veapps is not already into the localstorage save it
                {
                  window.sessionStorage.setItem(data,"true");
                  numItemsMenuBasket.addItem(data);//Calling the factory and save this value if not already 
                }
          }

        $scope.numItemBasket = numItemsMenuBasket.getValue();//Showing the value on the Menu
      });


      /****************************
        Basket number onLoad
      *************************/
      $scope.getNumerItemsForBasket = function(){
        if(window.sessionStorage.getItem("veprompt"))
        {
              numItemsMenuBasket.addItem("veprompt");//Calling the factory and save this value if not already 
              $rootScope.$emit('updateBasket',"onloadFunction");//This funtion will lunch this event and on MainJS the receiver($rootScope.$on) will retrieve the information
        }
        if(window.sessionStorage.getItem("vecontact"))
        {
              numItemsMenuBasket.addItem("vecontact");//Calling the factory and save this value if not already 
              $rootScope.$emit('updateBasket',"onloadFunction");//This funtion will lunch this event and on MainJS the receiver($rootScope.$on) will retrieve the information
        }
      }()


      /****************************
        Display Logout
      *************************/

       $scope.showlogout = function()
        {
          if($window.sessionStorage.clientId)
          {
            $scope.logout = true;
          }
          else
          {
            $scope.logout = false;
          }
        }();

    /****************************
      Logout
      *************************/
        $scope.logout = function()
        {
          $window.sessionStorage.clear();
          $window.location= "/";
        }

    });

    /*********************
      *Menu basket updating number factory
      @value will be veprompt or vecontact
      @itemBasket will be the one which control the amount of items in basket
    *********************/

    app.factory('numItemsMenuBasket', function(){
      var itemBasket = [];
      var n= 0;//I will use this as a flag to push into the variable
      return {
        getValue: function()
          {
            return itemBasket.length;  
          },
          addItem: function(value)
          {
            if(itemBasket.length == 0)
            {
              itemBasket.push(value);
            }
            else
            {
              for(var i=0; i<itemBasket.length; i++)
              {
                if(itemBasket[i] == value)
                {
                   n++;
                }
              }
              if(n==0)
              {
                itemBasket.push(value);
              }
              
            }
            n=0; 
          }
      }
    })

    





      //When a new TODO is added, sending the text to the API

      // $scope.createTodo = function(){
      //   $http.post('api/todos', $scope.formData)
      //     .success(function(data){
      //       $scope.formData = {};
      //       $scope.todos = data;
      //       console.log(data);
      //     })
      //     .error(function(data){
      //       console.log('Error: '+ data);
      //     });
      // };

      // //Removing a TODO after checking
      // $scope.deleteTodo = function(id){
      //   $http.delete('/api/todos'+id)
      //     .success(function(data){
      //       $scope.todos = data;
      //       console.log(data);
      //     })
      //     .error(function(data){
      //       console.log('Error: '+ data);
      //     });
      // };


      
   
   
