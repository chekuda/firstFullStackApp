   /**
      *Main Controller
      @vepromptctr: vePrompt tool controller module
      @insertImagestoDB: Insert images in DB (administrator)
    **/

    var app = angular.module('veoptimazer', ['colorpicker.module','ngImageInputWithPreview','ui.router','textAngular','ngRoute','ngAnimate','vepromptctr','loginctr','insertImagestoDB']);//'ui.bootstrap'


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
                      //If the token is wrong this will redirect to the server
                      location.pathname="/";
                     });
                   }
                   else{
                    location.pathname="/";
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
    *********************/
    app.controller('navCntr',function($scope,$location){
      $scope.isActive = function(viewLocation){
        var active = (viewLocation === $location.path());
        return active;
      }
    });




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


      
   
   
