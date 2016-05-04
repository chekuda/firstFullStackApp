
    /**
      *Body
    **/

    var app = angular.module('veoptimazer', ['colorpicker.module','ngImageInputWithPreview','textAngular','ngRoute','ngAnimate']);//'ui.bootstrap'



    /**
    *Navigator bar
    **/

    app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
      $routeProvider
      .when("/",{templateUrl: "/mainpage/views/home.html",controller:"driversController"})
      .when("/veprompt",{templateUrl: "/vepromptpage/views/veprompt.html",controller:"driversController"})
      .when("/contactus",{templateUrl: "/contactuspage/views/contactus.html",controller:"driversController"})
      .when("/basket",{templateUrl: "/basketpage/views/basket.html",controller:"driversController"})
      .when("/login",{templateUrl: "/loginpage/views/login.html",controller:"driversController"});
      //used for remove the '#' within the URL
      $locationProvider.html5Mode(true);
    }]);




    app.controller('formLogin',function($scope,$http) {
      $scope.credentials = {
        username:"",
        password:""
      };
      //When the page is loaded, get from the API todos from TODOS
      // $scope.login = function(credentials){
      //   $http.get('/api/show')
      //   .success(function(data){
      //     angular.forEach(data, function(value,key)
      //     {
      //       if(data[key].username == $scope.credentials.username && data[key].password == $scope.credentials.password)
      //       {
      //         console.log("success");
      //       }
      //     });
      //   })
      //   .error(function(data){
      //     console.log('Error: '+ data);
      //   });
      // };

      $scope.loginP = function(credentials){
        $http.post('/api/login',$scope.credentials)
        .success(function(data){
          if(data == "success")
          {
            window.location.href="/";
          }
          else{
            console.log(data);
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

    /**
      *NavBar active configuration
    **/
    app.controller('navCntr',function($scope,$location){
      $scope.isActive = function(viewLocation){
        var active = (viewLocation === $location.path());
        return active;
      }
    });

     app.controller('driversController',function(){
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

