(function () {
  'use strict';

  angular
    .module('core')
 
  .controller('PaymentFailureController', PaymentFailureController);


PaymentFailureController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'paymentfailureService'];

function PaymentFailureController($scope, $http, $state, $stateParams, Upload, paymentfailureService) {

  $scope.formdata = {};
  $scope.formdata.status = '0';
  $scope.paymentfailureService = paymentfailureService;
  /////////////////////select/////////////////////////////

  ///////////////////////////////////////////////////////
  $scope.currentLan=localStorage.getItem('currentLang').toString();
  console.log($scope.currentLan)
  $scope.setasDefault = function (id) {

    $http({
      url: '/api/admin/setasDefault1',
      method: "POST",
      data: { 'id': id }
    })
      .then(function (response) {
        $state.reload();
        // success
      },
        function (response) { // optional
          // failed
        });

  }

  ///////////////////list /////////////////////
  /*
    * Function : getPaymentFailure
    * Description : get getPaymentFailure details
    * Owner : anju
    */

  $scope.getPaymentFailure = function () {
    console.log(0);
    $scope.paymentfailureService.getPaymentFailure().then(function (result) {
      if (result.statusText = "OK") {
        $scope.userlist = result.data;
        //console.log(1);
        console.log(result.data);
      } else {

      }
    });
  }
  $scope.getPaymentFailure();
  
///////////////////////////////////////////////////////////////

  /*
       * FUnction : delPaymentFailure
       * Description : delete Payment id
       * Owner :anju
       * 
       */
  $scope.delPaymentFailure = function (userId) {


    swal({
      title: 'Are you sure?',
      text: "You want to delete this !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result) {
        $scope.paymentfailureService.delPaymentFailure(userId).then(function (result) {
          if (result.statusText = "OK") {
            swal(
              'Deleted!',
              'Payment Failure has been deleted.',
              'success'
            )
            $state.reload();
          } else {

          }
        })
      }
    })

  }
  ///////////////////////////////////////////////////////////////////////




  function getActionBtns() {


    $scope.addpage = document.querySelectorAll(".add-action");
    $scope.addpage[0].addEventListener("click", $scope.newpage, false);

    $scope.editpage = document.querySelectorAll(".edit-action");
    $scope.editpage[0].addEventListener("click", $scope.editpages, false);

    var delpage = document.querySelectorAll(".delete-action");
    delpage[0].addEventListener("click", $scope.delpage, false);



  }
  $scope.chkall = function () {
    $scope.editpage[0].removeAttribute("href");

  }
  $scope.addchkval = function (linkid) {
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
    console.log(linkid)
    console.log(checkedValue[0])
    if (checkedValue.length > 1) {
      $scope.editpage[0].removeAttribute("href");
    }
    else {

      $scope.editpage[0].setAttribute("href", "/email/editpaymentfailure/" + linkid);
    }

  }
  $scope.chk = {};

  $scope.newpage = function () {
    $state.go('emailaddpaymentfailure');
  }
  $scope.editpages = function () {
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
    if (checkedValue.length > 0) {
      console.log($scope.editpage[0].getAttribute("href"));
      if ($scope.editpage[0].getAttribute("href")) {
        document.location = $scope.editpage[0].getAttribute("href");
      }
    }

  }
  $scope.chkValue = [];


  $scope.delpage = function () {
    $scope.chkValue = [];

    //$state.go('addlanguage');
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
    console.log(checkedValue)
    for (var i = 0; i < checkedValue.length; i++) {
      $scope.chkValue.push(checkedValue[i].value);
    }

    var userId = $scope.chkValue;
    console.log(userId);
    swal({
      title: 'Are you sure?',
      text: "You want to delete checked items!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result) {
        $scope.paymentfailureService.delCheckedPaymentFailure(userId).then(function (result) {
          if (result.statusText = "OK") {
            swal(
              'Deleted!',
              'Payment Failure has been deleted.',
              'success'
            )
            $state.reload();
            //  $scope.getUser();
          } else {

          }
        })
      }
    })


  }
  setTimeout(getActionBtns, 1500);


}






}());
