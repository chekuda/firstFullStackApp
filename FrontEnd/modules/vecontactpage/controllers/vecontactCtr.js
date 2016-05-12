/****************

  Controller for vePrompt tool

***************/
angular.module('vecontactCtr',[])
    .controller('defaultValueContact',function($scope,$http){


      /***************
        Initialize previewBox
      ***************/
      document.getElementById("previewBoxContact").style.height = screen.height+"px";

      /*******************
        Initialize defaultValues
      *********************/
      $scope.resultObject = [];
      $scope.defaulvalues ={
        defaulText:"",
        bkColour:"",
        ctaText:"",
        ctaColour:"",
        contactTemplate:"",
        contactLogo:"",
        contactTheme:"",
        contactCTA:""
      };
      $http.get('const/defaultValues.json')
      .success(function(res){

      /**
        @resultObject
        //Default values from Json file
      **/
         $scope.resultObject.push(res);
         $scope.defaulvalues.defaulText = $scope.resultObject[0].vecontactview[0].configurationSettings[0].copyText;
         $scope.defaulvalues.bkColour = $scope.resultObject[0].vecontactview[0].configurationSettings[1].bkcolour;
         $scope.defaulvalues.ctaText = $scope.resultObject[0].vecontactview[0].configurationSettings[2].ctaText;
         $scope.defaulvalues.ctaColour = $scope.resultObject[0].vecontactview[0].configurationSettings[3].ctaColour;

         //template
         $scope.defaulvalues.contactTemplate = $scope.resultObject[0].vecontactview[1].templates[1].htmlCode;
         document.getElementById("previewBoxContact").innerHTML += $scope.defaulvalues.contactTemplate;

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
            });  
        }).error(function(data){
          console.log("Error "+ data);
        });

     

  });