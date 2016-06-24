/****************

  Controller for vePrompt tool
   @numItemsMenuBasket is the factory
   @$rootScope will be used for send scope values from different controllers
***************/
angular.module('vecontactCtr',['colorpicker.module'])
    .controller('defaultValueContact',function($scope,$http,numItemsMenuBasket,$rootScope){//Using numItems as a factory from mainJS for updating the basket number


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
        // contactLogo:"",//Default logo
        contactTheme:"",//Main banners 
        // contactCTA:"",//for the CTA of vecontact
        contactBGcolour:""//for the whole template
      };
      $scope.contactLogo = {
        src:"http://vecontacthk.veinteractive.com/CustomerImages/D23E274C-F1C7-4E78-AEF7-47CAC0F5E23A/veBuilder/veContact/EN/electronic/contactelectronic0/VeContact_creative1_01.gif"
      }
      $http.get('const/defaultValues.json')
      .success(function(res){

         $scope.resultObject.push(res);//Getting the data from the defaultJSONFile
         // $scope.defaulvalues.contactTemplate = $scope.resultObject[0].vecontactview[1].templates[1].htmlCode;//templateHTML
         // $scope.defaulvalues.contactLogo = $scope.resultObject[0].vecontactview[1].templates[1].contactLogo;//DefaultLogo
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
              if(data[key].app_name == "veContact")
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
      $scope.themeSelected = true; //Flag for Theme selected
      for(var i=0; i<$scope.arrayImagesBG.length;i++)
      {
        if($scope.arrayImagesBG[i].idtheme_assets == pickedId)
        {
          // console.log($scope.arrayImagesBG[i].source);
          return $scope.arrayImagesBG[i].url;//return the path with the new
        }
      }
    }

    //Flag for logo selected in order to saveTheTemplate function works
    $scope.logoSelected = function()
    {
      $scope.logoUploaded = true;
    }
    /******************
        *Button save Creative*
        @ $scope.themeSelected: Flag for themeSelected in order to active the submit button
        @ $scope.logoUploaded: Flag for logoUploaded in order to active the submit button
      **********************/
      $scope.themeSelected=false;
      $scope.logoUploaded=false;

      $scope.savingFinalTemplate = function(){
        if($scope.themeSelected==true && $scope.logoUploaded==true)//check when the client select all the properties of the template
        {
          $("#successModal").modal("show");
          for(var i=0; i<$scope.arrayImagesBG.length;i++)
          {
            if($scope.defaulvalues.contactTheme == $scope.arrayImagesBG[i].url)
            {
              //I send the information to the Receive function and this function will save values on the sessionStorage and modify the menuNumberValue
              $rootScope.$emit('updateBasket',"vecontact");//This funtion will lunch this event and on MainJS the receiver($rootScope.$on) will retrieve the information
              var veContacTheme = {"themeAsset": $scope.arrayImagesBG[i].idtheme_assets, "textvecontactA": $scope.defaulvalues.defaulTextmain, "textvecontactB": $scope.defaulvalues.defaulTextbottom};
              window.sessionStorage.setItem("veContacTheme",JSON.stringify(veContacTheme));
               
            }
          }
          
         
        }
        else
        {   
          $("#errorModal").modal("show");
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
})
