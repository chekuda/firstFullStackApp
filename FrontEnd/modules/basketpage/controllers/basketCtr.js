angular.module('basketCrt',[])
.controller('defaultValueBasket', function($scope,$http) {


   /***************
    Initialize previewBox
  ***************/
  document.getElementById("main").style.height = screen.height+"px";
  document.querySelector(".configurationSettings").style.height = screen.height+"px";
  document.querySelector(".previewBox").style.height = screen.height+"px";

  /**************************
    Menu
  *************************/
  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

  // $scope.checkModel = {
  //   left: false,
  //   middle: true,
  //   right: false
  // };

  // $scope.checkResults = [];

  // $scope.$watchCollection('checkModel', function () {
  //   $scope.checkResults = [];
  //   angular.forEach($scope.checkModel, function (value, key) {
  //     if (value) {
  //       $scope.checkResults.push(key);
  //     }
  //   });
  // });



});