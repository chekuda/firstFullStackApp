   /**
      *Body
    **/

    var app = angular.module('veoptimazer', ['colorpicker.module','ngImageInputWithPreview','ui.router','textAngular','ngRoute','ngAnimate']);//'ui.bootstrap'


    //Runing this controller before the page is loaded. Dependencies=>@Token and @needAuth
    app.run(['$rootScope', '$state','$location','$window','$http', function ($rootScope, $state, $location, $window, $http) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                var auth = toState.needAuth;
                if(auth)//if the client need authentication
                {
                  if(window.sessionStorage.getItem("token"))
                   {
                    //This will give value to the token from sessionStore
                     var token = {token: window.sessionStorage.getItem("token")};
                    //Calling to the server to check it the token is right
                     $http.post('/api/auth',token)
                     .success(function(data){
                        console.log(data);//client athenticated
                        if($location.path == "/login")//if the client is authenticated and he/she request login page, this redirect to home page
                        {
                          $location.path = "/home";
                        }
                     })
                     .error(function(data)
                     {
                      //If the token is wrong this will redirect to the server
                      location.pathname="/";
                     });
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
          needAuth: false
        })
        .state('veprompt',{
          url:"/veprompt",
          templateUrl:"/vepromptpage/views/veprompt.html",
          needAuth: true
        })
        .state('basket',{
          url:"/basket",
          templateUrl:"/basketpage/views/basket.html",
          needAuth: true
        })
        .state('contactus',{
          url:"/contactus",
          templateUrl:"/contactuspage/views/contactus.html",
          needAuth: true
        })
        .state('home',{
          url:"/home",
          templateUrl:"/mainpage/views/home.html",
          needAuth: true
        });
        $locationProvider.html5Mode(true);//removing the hash
    });



    /**************
      Login function
    **************/

    app.controller('formLogin',function($scope,$http) {
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
            window.sessionStorage.token = data.token;
            //Redirect the client to the home page
            location.pathname="/home";
          }
          else{//if the anything is wrong in the login details I will display an alert
            console.log(data);
            alert(data.msg);
          }
        })
        .error(function(data){
          console.log('Error: '+ data);
        });
      };


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







      // app.controller("formLogin",function($scope,$http)
      // {
      //       $scope.credentials ={
      //         username:"",
      //         password:""
      //       };
          
      //     $scope.login = function(credentials){
      //       $http({
      //         method: 'POST',
      //         url: '/api/login',
      //         data:$scope.credentials
      //       }).success(function(data,status){
               
      //       });
      //     };
      //  });
      // $scope.singin = function()
      // {
      //   console.log("hola jose");
      //     $scope.password = document.getElementsByName('username').innerHTML;
      //     $scope.username = document.getElementsByName('password').innerHTML;
          
      //     if($scope.password && $scope.username)
      //     {
      //         $http.get('/api/todos').success(function(data){
      //           $scope.listUsers = data
      //           $.each($scope.listUsers, function(key,values)
      //           {
      //             console.log($scope.listUsers[key]);
      //           });
      //         });
      //     }
      // };
      
   
     /*************
        Controller for tool
    **************/
    app.controller('defaultValue',function($scope,$http){

      /**
        Initialize settings
      **/

      $http.get('js/defaultValues.json')
      .then(function(res){

      /**
        @resultObject
        //Default values from Json file
      **/
         $scope.resultObject = res.data;
      });

      /**
        *Templates
      **/

      $scope.savingFinalTemplate = function(){

        // $scope.confiSettings = {
        //   mainBanner = "",
        //   maintext = "",
        //   ctaImage = "",
        //   closeButton = ""
        // };
        $scope.mainBanner = document.getElementById('mainBannerSelected').innerHTML;
        $scope.maintext = document.getElementById('textSelected').innerHTML;
        $scope.ctaImage = document.getElementById('ctaImageSelected').innerHTML;
        $scope.closeButton = document.getElementById('closeButtonSelected').innerHTML;

        $http.get('media/templates/veprompt/template0.html')
        .then(function(res){

        var templateRes = _.template(res.data);
        $scope.text  = templateRes({BANNERIMAGE:$scope.mainBanner,CTA:$scope.ctaImage,CLOSEBUTTON: $scope.closeButton,MAINTEXT: $scope.maintext});
        console.log($scope.text);
      })
      };



      /**
        List of main images
      **/

      $scope.images = [
        {
        name:"first",
        src:'media/veprompt/banner/back0.png'
        },
        {
        name:"second",
        src:'media/veprompt/banner/back1.png'
        },
        {
        name:"third",
        src:'media/veprompt/banner/back2.png'
        },
        {
        name:"forth",
        src:'media/veprompt/banner/back3.png'
        }
        ];

      /**
        List of cta images
      **/

        $scope.ctaImages = [
        {
        name:"first",
        src:'media/veprompt/cta/CTA0.png'
        },
        {
        name:"second",
        src:'media/veprompt/cta/CTA2.png'
        },
        {
        name:"third",
        src:'media/veprompt/cta/CTA2.png'
        }
        ];

      /**
        List of close images
      **/

        $scope.closeImages = [
        {
        name:"first",
        src:'media/veprompt/close/close0.png'
        },
        {
        name:"second",
        src:'media/veprompt/close/close1.png'
        },
        {
        name:"third",
        src:'media/veprompt/close/close2.png'
        }
        ];

        /**
          scope the index of image
        **/

        $scope.pickTheImageSource =function(index){
          $scope.visible = true;
          return $scope.images[index].src;
        };

        $scope.pickTheImageSourceCTA =function(index){
          return $scope.ctaImages[index].src;
        };

         $scope.pickTheImageSourceClose =function(index){
          return $scope.closeImages[index].src;
        };

        /**
          *Button save Creative
        **/

        $scope.buttonDisabled = function(){
            document.getElementById('saveCreactive').disabled = false;
        }

  });

