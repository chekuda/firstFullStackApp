/****************

  Controller for vePrompt tool

***************/
angular.module('vecontactCtr',['colorpicker.module'])
    .controller('defaultValueContact',function($scope,$http){


      /***************
        Initialize previewBox
      ***************/
      document.getElementById("previewBoxContact").style.height = screen.height+"px";
      document.getElementById("configurationSettings").style.height = screen.height+"px";

      /*******************
        Initialize defaultValues
      *********************/
      $scope.resultObject = [];
      $scope.defaulvalues ={
        defaulTextmain:"",//For configuration settings
        defaulTextbottom:"",
        bkColour:"",//for CTA configuration settings
        ctaText:"",//For CTA configuration settings
        ctaColour:"",//For CTA configuration settins
        // contactTemplate:"",//HTML template
        contactLogo:"",//Default logo
        contactTheme:"",//Main banners 
        // contactCTA:"",//for the CTA of vecontact
        contactBGcolour:""//for the whole template
      };
      $http.get('const/defaultValues.json')
      .success(function(res){

         $scope.resultObject.push(res);//Getting the data from the defaultJSONFile
         // $scope.defaulvalues.contactTemplate = $scope.resultObject[0].vecontactview[1].templates[1].htmlCode;//templateHTML
         $scope.defaulvalues.contactLogo = $scope.resultObject[0].vecontactview[1].templates[1].contactLogo;//DefaultLogo
         $scope.defaulvalues.contactTheme = $scope.resultObject[0].vecontactview[1].templates[2].contactTheme;//theme

         // document.getElementById("previewBoxContact").innerHTML += $scope.defaulvalues.contactTemplate;
   
         $scope.defaulvalues.defaulTextmain = $scope.resultObject[0].vecontactview[0].configurationSettings[0].copyTextMain;//Main copy
         $scope.defaulvalues.defaulTextbottom = $scope.resultObject[0].vecontactview[0].configurationSettings[1].copyTextBottom;//Bottom copy
         $scope.defaulvalues.bkColour = $scope.resultObject[0].vecontactview[0].configurationSettings[2].bkcolour;
         $scope.defaulvalues.ctaText = $scope.resultObject[0].vecontactview[0].configurationSettings[3].ctaText;
         $scope.defaulvalues.ctaColour = $scope.resultObject[0].vecontactview[0].configurationSettings[4].ctaColour;
         $scope.defaulvalues.contactBGcolour = $scope.resultObject[0].vecontactview[0].configurationSettings[5].contactBGcolour;//I want to use this for the 

         

         
      }).error(function(data){
        console.log("Error>>>>>> "+data);
      });

      

      // /***********************
      //   Getting an array of images
      // ***************************/
      
      $scope.arrayImagesBG = [];//Array of background Images
      $scope.arrayImagesCTA = [];//Array of CTA images
      $scope.arrayImagesClose = [];//Array of Close images
      $scope.sectorsAvailable = [];//Array of Close images

     
        $http.get("/api/getimg")
        .success(function(data){
            $.each(data, function(key,values){
              if(data[key].appName == "veContact")
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
                if(data[key].sector)
                {
                  
                  if($scope.addSector(data[key].sector) ==false)
                  {
                    $scope.sectorsAvailable.push(data[key]);//creating an array with all the different sectors
                  }
                }
              }
            });  
        }).error(function(data){
          console.log("Error "+ data);
        });

      /**************
        Checking different sectors
      **************/
     $scope.addSector = function(sectorToCheck)
     {
          var sectorExist = false;
            if($scope.sectorsAvailable.length>=1)
            {
              for(var i=0;i<$scope.sectorsAvailable.length; i++)
              {
                if($scope.sectorsAvailable[i].sector)
                {
                  if($scope.sectorsAvailable[i].sector == sectorToCheck)
                  {
                    sectorExist =true;
                  }
                }
              }
            }
            return sectorExist//return false if sector doesnt exist
      }
    $scope.pickTheme = function(pickedId)//Retrieving the id of the theme clicked
    {
      for(var i=0; i<$scope.arrayImagesBG.length;i++)
      {
        if($scope.arrayImagesBG[i].id == pickedId)
        {
          console.log($scope.arrayImagesBG[i].source);
          return $scope.arrayImagesBG[i].source;//retunr the path with the new
        }
      }
    }
  })
/*************************
  **Using directive to load the HTML for veContact**
************************/
.directive('ngTemplates', function(){
  return {
    templateUrl: "const/templates/vecontact/template1.html"//returning the template 1
  }
});