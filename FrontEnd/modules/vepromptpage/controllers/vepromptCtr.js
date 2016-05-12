/****************

  Controller for vePrompt tool

***************/
angular.module('vepromptctr',[])
    .controller('defaultValue',function($scope,$http){

      /*******************
        Initialize settings
      *********************/

     $scope.resultObject = [];
      $scope.defaulvalues ={
        defaulText:"",
        bkColour:"",
        ctaText:"",
        ctaColour:"",
        contactTemplate:""
      };
      $http.get('const/defaultValues.json')
      .success(function(res){

      /**
        @resultObject
        //Default values from Json file
      **/
         $scope.resultObject.push(res);
         $scope.defaulvalues.defaulText = $scope.resultObject[0].vepromptview[0].configurationSettings[0].copyText;
         $scope.defaulvalues.bkColour = $scope.resultObject[0].vepromptview[0].configurationSettings[1].bkcolour;
         $scope.defaulvalues.ctaText = $scope.resultObject[0].vepromptview[0].configurationSettings[2].ctaText;
         $scope.defaulvalues.ctaColour = $scope.resultObject[0].vepromptview[0].configurationSettings[3].ctaColour;

      }).error(function(data){
        console.log("Error>>>>>> "+data);
      });

      // /***********************
      //   Getting an array of images
      // ***************************/
      
      $scope.arrayImagesBG = [];//Array of background Images
      $scope.arrayImagesCTA = [];//Array of CTA images
      $scope.arrayImagesClose = [];//Array of Close images

     
        $http.get("/api/getimg")
        .success(function(data){
            $.each(data, function(key,values){
              if(data[key].appName == "vePrompt")//only for vePrompt
              {
                if(data[key].typeimage == "background")
                {
                   $scope.arrayImagesBG.push(data[key]);
                }
                else if(data[key].typeimage == "cta"){
                    $scope.arrayImagesCTA.push(data[key]);
                }
                else if(data[key].typeimage == "close"){
                    $scope.arrayImagesClose.push(data[key]);
                }
                else
                {
                  console.log(">>>>>Type image doesnt specify, please check the database");
                }
              }
            });  
        }).error(function(data){
          console.log("Error "+ data);
        });

       

      
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


        /************************
          Display images on preview,
          scope the index of image
        **************************/

        $scope.pickTheImageSource =function(index){//saving the image clicked into the module to display into the preview
          return $scope.arrayImagesBG[index].source;
        };

        $scope.pickTheImageSourceCTA =function(index){//saving the image clicked into the module to display into the preview
          return $scope.arrayImagesCTA[index].source;
        };

         $scope.pickTheImageSourceClose =function(index){//saving the image clicked into the module to display into the preview
          return $scope.arrayImagesClose[index].source;
        };

         /**
          *Button save Creative
        **/
        if($scope.arrayImagesBG.lenght !=0 && $scope.arrayImagesCTA.lenght && $scope.arrayImagesClose.lenght)//check when the client select all the properties of the template
        {
          $scope.avtiveButtonSaving ="true";
        }

  });