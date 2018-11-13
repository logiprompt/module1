(function () {
  'use strict';

  angular
    .module('core')
    .controller('AddpaymentfailureController', AddpaymentfailureController);



    AddpaymentfailureController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','paymentfailureService'];

  function AddpaymentfailureController ($scope, $http, $state, $stateParams, Upload,paymentfailureService) {
$scope.paymentfailureService=paymentfailureService;




  $scope.addPaymentFailure = function(){
    
    if($scope.formdata.$valid && $scope.status!=0){
    var data = {
        "name":$scope.name,
        "subject":$scope.subject,
        "content":$scope.content,
        "custom":$scope.custom,
        "status" :$scope.status
        }
      
    console.log($scope.paymentfailureService);
      $scope.paymentfailureService.addPaymentFailure(data).then(function(result){

        if(result.statusText = "OK"){
          swal("Success!", "Successfully added!", "success");  
          $state.go('emailpaymentfailure');
        }else{
          swal("error!", "Already exist!", "error");
        }
        
      })
    }
      
    }




  }


}());
