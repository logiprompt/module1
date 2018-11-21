(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditProtaxgroupsController', EditProtaxgroupsController);

  EditProtaxgroupsController.$inject = ['$scope', '$http', '$state', '$stateParams', 'taxgroupService'];

  function EditProtaxgroupsController($scope, $http, $state, $stateParams, taxgroupService) {
    //var vm = this;
    $scope.taxgroupService = taxgroupService;
    $scope.formdata = {};
    ///////////////////select 0ne/////////////////////////////////

    $scope.currentLan = localStorage.getItem('currentLang').toString();
    $scope.defaultLang = localStorage.getItem('defaultLang').toString();
    $scope.getTaxGroupById = function (userId) {
      $scope.taxgroupService.getTaxGroupById(userId).then(function (result) {
        var details = result.data;
        console.log(details);


        if (result.statusText = "OK") {
          $scope.status = details.status.toString();
          if (angular.equals($scope.currentLan, $scope.defaultLang)) {
            $scope.userdetails = result.data;
            $scope.name = $scope.userdetails.TaxGroupname;

          }
          else {
            $scope.userdetails = result.data;
            $scope.name = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].TaxGroupname : details.TaxGroupname;
          }
        }
        else {

        }
      });
    }
    $scope.getTaxGroupById($stateParams.id);


    $scope.updateTaxGroup = function () {

        if($scope.formdata.$valid && $scope.status!=0){

     
       
              
        if (localStorage.getItem("currentLang") == 'en') {
          var data = {
            "TaxGroupname":$scope.name,
            "status" :$scope.status,
            "id":$stateParams.id,
            "isDefaultLang": true,

          }
        }
        else {
          var data = {
            "TaxGroupname":$scope.name,
            "status" :$scope.status,
            "id":$stateParams.id,
            "isDefaultLang": false,
            "defaultLang": localStorage.getItem("defaultLang"),
            "userSelectedLang": localStorage.getItem("currentLang")
          };
        }



            $scope.taxgroupService.updateTaxGroup(data).then(function(result){
      
              if(result.statusText = "OK"){
                swal("Success!", "Successfully added!", "success");  
               // $state.go('taxgroups');
              }else{
                swal("error!", "Already exist!", "error");
              }
              
            })
      }
    }

    

  }
}());
