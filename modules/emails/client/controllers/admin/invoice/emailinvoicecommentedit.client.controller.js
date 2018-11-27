(function () {
  'use strict';

  angular
    .module('core')
    .controller('emailinvoicecommenteditController', emailinvoicecommenteditController);



  emailinvoicecommenteditController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'invoicecommentsService'];

  function emailinvoicecommenteditController($scope, $http, $state, $stateParams, Upload, invoicecommentsService) {

    $scope.formdata = {};
    $scope.status = "0";
    $scope.username = localStorage.getItem('username');
    $scope.invoicecommentsService = invoicecommentsService;

    $scope.currentLang = localStorage.getItem('currentLang');
    /////////////////////select/////////////////////////////
    ////////////////////////ip fetch//////////////////////////////

    $http.get("https://ipinfo.io/").then(function (response) {
      $scope.ip = response.data.ip;

    });
    ///////////////////////////////////////////////////////


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

    ///////////////////list /////////////////////

    /*
      * Function : getInvoiceById
      * Description : get User details
      *
      */
    $scope.currentLan = localStorage.getItem('currentLang').toString();
    $scope.defaultLang = localStorage.getItem('defaultLang').toString();
    $scope.getInvoicecommentById = function (userId) {
      // console.log(0);
      $scope.invoicecommentsService.getInvoicecommentById(userId).then(function (result) {
        //console.log(result);
        var details = result.data;
        $scope.userdetails1 = result.data;
        if (result.statusText = "OK") {


          $scope.status = details.status.toString();
          if (angular.equals($scope.currentLan, $scope.defaultLang)) {
            $scope.userdetails = result.data;
            $scope.name = $scope.userdetails.name;
            $scope.subject = $scope.userdetails.subject;
            $scope.content = $scope.userdetails.content;
            $scope.custom = $scope.userdetails.custom;
          }
          else {
            $scope.userdetails = result.data;
            $scope.name = angular.isUndefined(details.oLang) ? details.name : details.oLang[$scope.currentLan].name;
            $scope.subject = angular.isUndefined(details.oLang) ? details.subject : details.oLang[$scope.currentLan].subject;
            $scope.content = angular.isUndefined(details.oLang) ? details.content : details.oLang[$scope.currentLan].content;
            $scope.custom = angular.isUndefined(details.oLang) ? details.custom : details.oLang[$scope.currentLan].custom;

          }
        }
      });
    }
    $scope.getInvoicecommentById($stateParams.id);
    //////////////////////////////////
    /*
     *
     *  Function : update invoicecreation
     * Description : Update Currency details
     * 
     * 
     * 
     */

    $scope.updateInvoicecomments = function () {
      //console.log(110);
      if ($scope.formdata.$valid && $scope.status != 0) {
        if (localStorage.getItem("currentLang") == 'en') {
          var data =
          {
            "name": $scope.name,
            "subject": $scope.subject,
            "content": $scope.content,
            "custom": $scope.custom,
            "status": $scope.status,
            "userId": $stateParams.id,
            "isDefaultLang": true
          }
        }
        else {
          var data =
          {
            "name": $scope.name,
            "subject": $scope.subject,
            "content": $scope.content,
            "custom": $scope.custom,
            "userId": $stateParams.id,
            "isDefaultLang": false,
            "defaultLang": localStorage.getItem("defaultLang"),
            "userSelectedLang": localStorage.getItem("currentLang")
          };
        }
        ///console.log(data);
        $scope.invoicecommentsService.updateInvoicecomments($stateParams.id, data).then(function (result) {
          if (result.statusText = "OK") {
            swal("Success!", "Successfully updated Invoice Comments", "success");
            $state.go('emailinvoicecomments');
          }
        });
      }
    }

    ///////////////////////////////////////////////////////////////////////

    $scope.stateChanged = function () {

      var details = $scope.userdetails1;
      if ($scope.chk1) {
        if ($scope.chk1) {
          $scope.name = $scope.userdetails1.name;
        }
        else {
          $scope.name = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].name : details.name;
        }
      }
      if ($scope.chk2) {
        if ($scope.chk2) {
          $scope.subject = $scope.userdetails1.subject;
        }
        else {
          $scope.subject = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].subject : details.subject;
        }
      }
      if ($scope.chk3) {
        if ($scope.chk3) {
          $scope.content = $scope.userdetails1.content;
        }
        else {
          $scope.content = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].content : details.content;
        }
      }
      if ($scope.chk5) {
        if ($scope.chk5) {
          $scope.custom = $scope.userdetails.custom;
        }
        else {
          $scope.custom = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].custom : details.custom;
        }
      }
      if ($scope.chk8) {
        $scope.status = $scope.userdetails.status.toString();
      }
      // else{
      // //$scope.status =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].status :details.status;
      // }
    }
  }
}());
