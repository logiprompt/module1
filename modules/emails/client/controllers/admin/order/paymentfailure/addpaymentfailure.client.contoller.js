(function () {
  'use strict';

  angular
    .module('core')
    .controller('AddpaymentfailureController', AddpaymentfailureController);



    AddpaymentfailureController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','paymentfailureService'];

  function AddpaymentfailureController ($scope, $http, $state, $stateParams, Upload,paymentfailureService) {

  $scope.addForget = function(){
    
    if($scope.formdata.$valid){
    var data = {
        "name":$scope.name,
        "subject":$scope.subject,
        "content":$scope.content,
        "custom":$scope.custom,
        "status" :$scope.status
        }
      
    
      $scope.paymentfailureService.addUserForgot(data).then(function(result){

        if(result.statusText = "OK"){
          swal("Success!", "Successfully added user!", "success");  
          $state.go('emailforgetpass');
        }else{
          swal("error!", "User already exist!", "error");
        }
        
      })
    }
      
    }




  }


}());
