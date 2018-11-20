(function () {
  'use strict';

  angular
    .module('core')
    .controller('EmailRatingSubmissionListController', EmailRatingSubmissionListController);



  EmailRatingSubmissionListController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'prdRatingSubService'];

  function EmailRatingSubmissionListController($scope, $http, $state, $stateParams, Upload, prdRatingSubService) {

    $scope.formdata = {};
    $scope.formdata.status = '0';
    $scope.prdRatingSubService = prdRatingSubService;
    /////////////////////select/////////////////////////////

    ///////////////////////////////////////////////////////
    $scope.currentLan = localStorage.getItem('currentLang').toString();

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

    /////////////////////////////////////////////////////////////////////////
    $scope.choices = [{ id: 'choice1' }];
    //$scope.choices.length	

    $scope.addNewChoice = function () {
      var newItemNo = $scope.choices.length + 1;
      $scope.choices.push({ 'id': 'choice' + newItemNo });
    };

    $scope.removeChoice = function (val) {
      if ($scope.choices.length > 1) {
        $scope.choices.splice(val, 1);
      }

    };
    //////////////////////////////////////////////////////////////////////
    /*
        * FUnction : delOrderCreation
        * Description : delete OrderCreation By Id
        * Owner :ck
        */

    $scope.getprdRatingSub = function () {
      $scope.prdRatingSubService.getprdRatingSub().then(function (result) {
        if (result.statusText = "OK") {
          $scope.ratingsublist = result.data;
        } else {

        }
      });
    }
    $scope.getprdRatingSub();


    ///////////////////////////////////////////////////////////////////////

    /*
	   * FUnction : delOrderCreation
	   * Description : delete OrderCreation By Id
	   * Owner :jeeja
	   */
    $scope.delprdRatingSub = function (userId) {

      swal({
        title: 'Are you sure?',
        text: "You want to delete this!",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result) {
          $scope.prdRatingSubService.delprdRatingSub(userId).then(function (result) {
            if (result.statusText = "OK") {

              swal('Deleted!',
                'It has been deleted.',
                'success')

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
      if (checkedValue.length > 1) {
        $scope.editpage[0].removeAttribute("href");
      }
      else {

        $scope.editpage[0].setAttribute("href", "/email/editratingsubmission/" + linkid);
      }

    }
    $scope.chk = {};

    $scope.newpage = function () {
      $state.go('emailaddratingsubmission');
    }
    $scope.editpages = function () {
      var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
      if (checkedValue.length > 0) {
        if ($scope.editpage[0].getAttribute("href")) {
          document.location = $scope.editpage[0].getAttribute("href");
        }
      }

    }
    $scope.chkValue = [];


    $scope.delpage = function () {
      $scope.chkValue = [];
      var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
      for (var i = 0; i < checkedValue.length; i++) {
        $scope.chkValue.push(checkedValue[i].value);
      }
      var userId = $scope.chkValue;
      swal({
        title: 'Are you sure?',
        text: "You want to delete checked items!",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result) {
          $scope.prdRatingSubService.delCheckedprdRatingSub(userId).then(function (result) {
            if (result.statusText = "OK") {
              swal('Deleted!',
                'User has been deleted.',
                'success')
              $state.reload();
            } else {

            }
          })
        }
      })

    }
    setTimeout(getActionBtns, 1500);

  }






}());
