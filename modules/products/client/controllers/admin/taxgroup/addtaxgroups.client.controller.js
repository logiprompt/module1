(function () {
  'use strict';
  angular
    .module('products')
    .controller('AddtaxgroupController', AddtaxgroupController);
    AddtaxgroupController.$inject = ['$scope','$http','$state','$stateParams','taxgroupService'];
  function AddtaxgroupController ($scope, $http, $state,$stateParams,taxgroupService) {
   
  // $scope.formdata = {};
$scope.taxgroupService=taxgroupService;
/////////////////////defaultLang//////////
$scope.status='0';
$scope.addTaxGroup=function(){


  if($scope.formdata.$valid && $scope.status!=0){

      var data = {
          "TaxGroupname":$scope.name,
          "status" :$scope.status
          }
        
    //	console.log(data);
        $scope.taxgroupService.addtaxgroup(data).then(function(result){
  
          if(result.statusText = "OK"){
            swal("Success!", "Successfully added!", "success");  
            $state.go('taxgroups');
          }else{
            swal("error!", "Already exist!", "error");
          }
          
        })
    
        
    
  }

}




 }
}());
