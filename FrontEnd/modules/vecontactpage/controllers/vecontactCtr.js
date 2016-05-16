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
        defaulText:"",//For configuration settings
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
   
         $scope.defaulvalues.defaulText = $scope.resultObject[0].vecontactview[0].configurationSettings[0].copyText;//Main copy
         $scope.defaulvalues.bkColour = $scope.resultObject[0].vecontactview[0].configurationSettings[1].bkcolour;
         $scope.defaulvalues.ctaText = $scope.resultObject[0].vecontactview[0].configurationSettings[2].ctaText;
         $scope.defaulvalues.ctaColour = $scope.resultObject[0].vecontactview[0].configurationSettings[3].ctaColour;
         $scope.defaulvalues.contactBGcolour = $scope.resultObject[0].vecontactview[0].configurationSettings[4].contactBGcolour;//I want to use this for the 

         

         
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
              if(data[key].appName = "veContact")
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

     

  })
/*************************
  **Using directive to load the HTML for veContact**
************************/
.directive('ngTemplates', function(){
  return {
    templateUrl: "const/templates/vecontact/template1.html"//returning the template 1
  }
});