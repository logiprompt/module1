(function () {
  'use strict';
  angular
    .module('products')
    .controller('AddProTaxController', AddProTaxController);
    AddProTaxController.$inject = ['$scope','$http','$state','$stateParams','taxgroupService'];
  function AddProTaxController($scope, $http, $state,$stateParams,taxgroupService) {
   
  // $scope.formdata = {};
$scope.taxgroupService=taxgroupService;
$scope.currentLan=localStorage.getItem('currentLang').toString();
/////////////////////defaultLang//////////
$scope.status='0';


$scope.getTaxGroupById = function (userId) {
  $scope.taxgroupService.getTaxGroupById(userId).then(function (result) {
    var details = result.data;
    console.log(details);


    if (result.statusText = "OK") {
      $scope.status = details.status.toString();
      if (angular.equals($scope.currentLan, $scope.defaultLang)) {
        $scope.userdetails = result.data;
        $scope.gname = $scope.userdetails.TaxGroupname;

      }
      else {
        $scope.userdetails = result.data;
        $scope.gname = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].TaxGroupname : details.TaxGroupname;
      }
    }
    
  });
}
$scope.getTaxGroupById($stateParams.id);

$scope.addProTax=function(){



}
$scope.values1 = [{id: 'choice1'}];
//$scope.choices.length	
  // console.log($scope.choices.length);
 $scope.addNewValues = function() {
       var newItemNo1 = $scope.values1.length+1;
       $scope.values1.push({'id':'values1'+newItemNo1});
       //console.log($scope.choices.length);
 };
       
 $scope.removeValues = function(val) {
         if($scope.values1.length>1){
       $scope.values1.splice(val,1);
         }
       //console.log($scope.choices.length);
 };

 /////////////////////select/////////////////////////////
 


 }
}());
