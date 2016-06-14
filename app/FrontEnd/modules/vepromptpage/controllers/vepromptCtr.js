/****************

  Controller for vePrompt tool
  
  @numItemsMenuBasket is the factory
  @$rootScope will be used for send scope values from different controllers
***************/
angular.module('vepromptctr',['colorpicker.module'])
    .controller('defaultValue',function($scope,$http,$rootScope,numItemsMenuBasket){


      /*************************
      Initialize sizes of the boxes
      ***************************/

      document.getElementById("configurationSettings").style.height = screen.height+"px";
      document.getElementById("previewBox").style.height = screen.height+"px";

      /************************
        Initiazin variables of wizzard
      *************************/
      $scope.statusWizard = "stepOne";//Display always the step Shape onLoad page
      $scope.shapeDisplay = "circle";//Default value for directive to display

      /*******************
        Initialize settings
      *********************/

     $scope.resultObject = [];
      $scope.defaulvalues ={
        defaulText:"",
        bkColour:"",
        ctaText:"",
        ctaColour:"",
        bgImage:"",
        ctaImage:"",
        closeImage:""
      };
      $http.get('const/defaultValues.json')
      .success(function(res){

      /**
        @resultObject
        //Default values from Json file
      **/
         $scope.resultObject.push(res);
         
         $scope.defaulvalues.bkColour = $scope.resultObject[0].vepromptview[0].configurationSettings[1].bkcolour;
         $scope.defaulvalues.ctaText = $scope.resultObject[0].vepromptview[0].configurationSettings[2].ctaText;
         $scope.defaulvalues.ctaColour = $scope.resultObject[0].vepromptview[0].configurationSettings[3].ctaColour;

         //template
         $scope.defaulvalues.defaulText = $scope.resultObject[0].vepromptview[0].configurationSettings[0].copyText;
         $scope.defaulvalues.bgImage = $scope.resultObject[0].vepromptview[1].templates[1].promptBg;//Default BG image
         $scope.defaulvalues.ctaImage = $scope.resultObject[0].vepromptview[1].templates[2].promptCTA;//Default CTA image
         $scope.defaulvalues.closeImage = $scope.resultObject[0].vepromptview[1].templates[3].promptClose;//Default Close image



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

       /*************************
          Display Wizard Steps
       *************************/
       $scope.changeStatusWizard = function(data)
       {
         $(".stepOneDiv").toggleClass("laterOn");
         $(".stepTwoDiv").toggleClass("laterOn");
       }

       /**********************
        Displaying the templates depending of the first wizard step
        @$scope.shapeDisplay: to change the directive to be displated
        @typeTemplate: Used as variable to send to the function $scope.modifyArrayOfImages for modify the arrayofImages to be displayed
       **********************/
       $scope.templateDisplayed = function(data)
       {
          var typeTemplate = {
            circle: "1",
            square: "2",
            rombo: "3",
            triangle: "4"
          };

        $scope.shapeDisplay = data;//Display the directive depending of the template 
        if(typeTemplate[data] == "2")
        {
         $scope.defaulvalues.bgImage = "http://vemerchanthk.veinteractive.com/CustomerImages/D30730E7/D7C6/46D4/87A9/2410977B7915/veBuilder/2016/EN/default/square/squaretest.png";
         $scope.defaulvalues.ctaImage = "http://vemerchanthk.veinteractive.com/CustomerImages/D30730E7/D7C6/46D4/87A9/2410977B7915/veBuilder/2016/EN/default/square/CTA.png";
         $scope.defaulvalues.closeImage = "http://vemerchanthk.veinteractive.com/CustomerImages/D30730E7/D7C6/46D4/87A9/2410977B7915/veBuilder/2016/EN/default/square/Close.png";
         $scope.modifyArrayOfImages(typeTemplate[data]);
        }
        else if(typeTemplate[data] == "1")
        {
         $scope.defaulvalues.bgImage = "http://vemerchanthk.veinteractive.com/CustomerImages/D30730E7/D7C6/46D4/87A9/2410977B7915/veBuilder/2016/EN/default/Back.png";
         $scope.defaulvalues.ctaImage = "http://vemerchanthk.veinteractive.com/CustomerImages/D30730E7/D7C6/46D4/87A9/2410977B7915/veBuilder/2016/EN/default/CTA.png";
         $scope.defaulvalues.closeImage = "http://vemerchanthk.veinteractive.com/CustomerImages/D30730E7/D7C6/46D4/87A9/2410977B7915/veBuilder/2016/EN/default/Close.png";
         $scope.modifyArrayOfImages(typeTemplate[data]);
        }
         
       }

       /**************************
        Modify array depending of the templateDisplayed
       *************************/

       $scope.arrayTypeTemplateBG=[];//Object where save all the images depending of the template selected
       $scope.arrayTypeTemplateCTA=[];//Object where save all the images depending of the template selected
       $scope.arrayTypeTemplateClose=[];//Object where save all the images depending of the template selected

       $scope.modifyArrayOfImages = function(typeTemplate)
       { 
        $scope.bgImageSelected=false;//Restarted the flag for the submitButton
        $scope.ctaImageSelected=false;//Restarted the flag for the submitButton
        $scope.closeImageSelected=false;//Restarted the flag for the submitButton



        $scope.arrayTypeTemplateBG=[];//Remove all the bgImages for the last template selected
        $scope.arrayTypeTemplateCTA=[];//Remove all the bgImages for the last template selected
        $scope.arrayTypeTemplateClose=[];//Remove all the bgImages for the last template selected

        //Loop for save all the matched object by the template selected BgImage
        for(var i=0;i<$scope.arrayImagesBG.length;i++)
        {
          if($scope.arrayImagesBG[i].template == typeTemplate)
          {
           $scope.arrayTypeTemplateBG.push($scope.arrayImagesBG[i]); 
          }
        }
        //Loop for save all the matched object by the template selected CTAImage
        for(var i=0;i<$scope.arrayImagesCTA.length;i++)
        {
          if($scope.arrayImagesCTA[i].template == typeTemplate)
          {
           $scope.arrayTypeTemplateCTA.push($scope.arrayImagesCTA[i]); 
          }
        }
        //Loop for save all the matched object by the template selected CloseImage
         for(var i=0;i<$scope.arrayImagesClose.length;i++)
        {
          if($scope.arrayImagesClose[i].template == typeTemplate)
          {
           $scope.arrayTypeTemplateClose.push($scope.arrayImagesClose[i]); 
          }
        }
       }

      
      /*************************************
      //   *Templates
      // **************************************/

      // $scope.savingFinalTemplate = function(){

      //   // $scope.confiSettings = {
      //   //   mainBanner = "",
      //   //   maintext = "",
      //   //   ctaImage = "",
      //   //   closeButton = ""
      //   // };
      //   $scope.mainBanner = document.getElementById('mainBannerSelected').innerHTML;
      //   $scope.maintext = document.getElementById('textSelected').innerHTML;
      //   $scope.ctaImage = document.getElementById('ctaImageSelected').innerHTML;
      //   $scope.closeButton = document.getElementById('closeButtonSelected').innerHTML;

      //   $http.get('media/templates/veprompt/template0.html')
      //   .then(function(res){

      //   var templateRes = _.template(res.data);
      //   $scope.text  = templateRes({BANNERIMAGE:$scope.mainBanner,CTA:$scope.ctaImage,CLOSEBUTTON: $scope.closeButton,MAINTEXT: $scope.maintext});
      //   console.log($scope.text);
      // })
      // };


        /************************
          Display images on preview,
          scope the index of image
        **************************/
        $scope.bgImageSelected=false;//Flag for bgImageSelected in order to active the submit button
        $scope.ctaImageSelected=false;//Flag for bgImageSelected in order to active the submit button
        $scope.closeImageSelected=false;//Flag for bgImageSelected in order to active the submit button

        $scope.pickTheImageSource =function(index){//saving the image clicked into the module to display into the preview
          $scope.bgImageSelected=true;
          return $scope.arrayTypeTemplateBG[index].source;
        };

        $scope.pickTheImageSourceCTA =function(index){//saving the image clicked into the module to display into the preview
          $scope.ctaImageSelected=true;
          return $scope.arrayTypeTemplateCTA[index].source;
        };

         $scope.pickTheImageSourceClose =function(index){//saving the image clicked into the module to display into the preview
          $scope.closeImageSelected=true;
          return $scope.arrayTypeTemplateClose[index].source;
        };

         /******************
          *Button save Creative*
          @ $scope.bgImageSelected: Flag for bgImageSelected in order to active the submit button
          @ $scope.ctaImageSelected: Flag for bgImageSelected in order to active the submit button
          @ $scope.closeImageSelected: Flag for bgImageSelected in order to active the submit button
          @Function modifyArrayOfImages(): will restore the values as the client go to the step1 wizard
        **********************/
        $scope.savingFinalTemplate = function(){
          if($scope.bgImageSelected==true && $scope.ctaImageSelected==true && $scope.closeImageSelected==true)//check when the client select all the properties of the template
          {
           $("#successModal").modal("show");
            //I send the information to the Receive function and this function will save values on the sessionStorage and modify the menuNumberValue
            $rootScope.$emit('updateBasket',"veprompt");//This funtion will lunch this event and on MainJS the receiver($rootScope.$on) will retrieve the information
          }
          else
          {
            $("#errorModal").modal("show");
          }
        }


  })
/*************************
  **Using directive to load the HTML for vePrompt**
************************/
.directive('ngTemplatecircle', function(){
    return {
    templateUrl: "const/templates/veprompt/template1.html"//returning the template 1
    }
  
})

.directive('ngTemplatesquare', function(){
    return {
    templateUrl: "const/templates/veprompt/template2.html"//returning the template 1
    }
  
});