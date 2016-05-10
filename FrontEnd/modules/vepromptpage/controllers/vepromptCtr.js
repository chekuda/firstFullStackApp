/****************

  Controller for vePrompt tool

***************/
angular.module('vepromptctr',[])
    .controller('defaultValue',function($scope,$http){

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

      // /***********************
      //   Getting an array of images
      // ***************************/
      // $scope.arrayImagesBG;//background Images
      // $scope.arrayImagesCTA;//CTA images
      // $scope.arrayImagesClose;//Close images
      // $scope.image;
      // $scope.jose = function(arrayImagesBG)
      // {
      //   $http.get("/api/getimg")
      //   .success(function(data){
      //     return data;
      //   // $.each(data, function(key,values){
      //   //   if(data[key].typeimage == "background")
      //   //   {
      //   //      $scope.arrayImagesBG = data[key];
      //   //   }
      //   //   else if(data[key].typeimage == "cta"){
      //   //       $scope.arrayImagesCTA = data[key];
      //   //   }
      //   //   else if(data[key].typeimage == "close"){
      //   //       $scope.arrayImagesClose = data[key];
      //   //   }
      //   //   else
      //   //   {
      //   //     console.log(">>>>>Type image doesnt specify, please check the database");
      //   //   }
      //   // });        
      //   }).error(function(data){
      //     console.log("Error "+ data);
      //   });
      // };
      // $scope.jose();

       
      /*************************************
        *Templates
      **************************************/

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


     
      // /**
      //   List of main images
      // **/

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
        if($scope.images && $scope.ctaImages && $scope.closeImages)//check when the client select all the properties of the template
        {
          $scope.avtiveButtonSaving ="true";
        }

  });