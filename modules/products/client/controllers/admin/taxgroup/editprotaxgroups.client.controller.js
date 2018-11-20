(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditProtaxgroupsController', EditProtaxgroupsController);

    EditProtaxgroupsController.$inject = ['$scope','$http','$state','$stateParams','taxgroupService'];

  function EditProtaxgroupsController ($scope, $http, $state,$stateParams,taxgroupService) {
  //var vm = this;
 $scope.taxgroupService=taxgroupService;
  $scope.formdata = {};
///////////////////select 0ne/////////////////////////////////

$scope.currentLan = localStorage.getItem('currentLang').toString();
$scope.defaultLang = localStorage.getItem('defaultLang').toString();
$scope.getTaxGroupById = function (userId) {
  $scope.taxgroupService.getTaxGroupById(userId).then(function (result) {
    var details = result.data;
    console.log(details);
    // if (result.statusText = "OK") {
    //   $scope.status = details.status.toString();
    //   if (angular.equals($scope.currentLan, $scope.defaultLang)) {
    //     $scope.userdetails = result.data;
    //     $scope.name = $scope.userdetails.name;
    //     $scope.subject = $scope.userdetails.subject;
    //     $scope.content = $scope.userdetails.content;
    //     $scope.custom = $scope.userdetails.custom;
    //   }
    //   else {

    //     $scope.userdetails = result.data;
    //     $scope.name = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].name : details.name;
    //     $scope.subject = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].subject : details.subject;
    //     $scope.content = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].content : details.content;
    //     $scope.custom = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].custom : details.custom;


    //   }
    // }
    // else {

    // }
  });
}
$scope.getTaxGroupById($stateParams.id);


        $scope.rmerrorclass=function(){
                angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
                }
                $scope.adderrorclass=function(cls){
                angular.element(document.querySelector(cls)).addClass('validationErr');
                }
                
                $scope.validation=function(){
                var error=0;
                $scope.rmerrorclass();
                  
                  if($scope.formdata.category=='' || angular.isUndefined($scope.formdata.category) ){
                    $scope.adderrorclass(".cat");
                    error=1;
                    
                    }
                  
                    return error;    
            }



 }
}());
