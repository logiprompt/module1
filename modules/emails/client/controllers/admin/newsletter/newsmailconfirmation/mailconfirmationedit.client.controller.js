(function () {
  'use strict';

  angular
    .module('emails')
    .controller('EmailconfirmationEdit', EmailconfirmationEdit);



  EmailconfirmationEdit.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'mailConfirmationService'];

  function EmailconfirmationEdit($scope, $http, $state, $stateParams, Upload, mailConfirmationService) {

    //$scope.formdata = {};
    $scope.status = "0";
    $scope.username = localStorage.getItem('username');
    $scope.mailConfirmationService = mailConfirmationService;

    /////////////////////select/////////////////////////////
    ////////////////////////ip fetch//////////////////////////////

    $http.get("https://ipinfo.io/").then(function (response) {
      $scope.ip = response.data.ip;

    });
    ///////////////////////////////////////////////////////
    $scope.currentLang = localStorage.getItem('currentLang');

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


    ///////////////////User Forgot By Id /////////////////////

    /*
      * Function : getUserForgotById
      * Description : get User Forgot details
      * Owner : ck
   */

    //console.log( $scope.mailConfirmationService);
    $scope.currentLan = localStorage.getItem('currentLang').toString();
    $scope.defaultLang = localStorage.getItem('defaultLang').toString();

    $scope.getMailConfirmationById = function (userId) {
      //console.log(0);
      $scope.mailConfirmationService.getMailConfirmationById(userId).then(function (result) {
        //console.log(result);
        var details = result.data;
        if (result.statusText = "OK") {
          $scope.userdetails1 = result.data;
          $scope.userdetails = result.data;
          $scope.mailer = $scope.userdetails.mailer;
          $scope.smtpauthen = $scope.userdetails.smtpauthen;
          $scope.smtpsecur = $scope.userdetails.smtpsecur;
          $scope.smtpport = $scope.userdetails.smtpport;
          $scope.smtppass = $scope.userdetails.smtppass;
          $scope.smtpuname = $scope.userdetails.smtpuname;
          $scope.smtphost = $scope.userdetails.smtphost;
        }
        else {

        }
      });
    }
    $scope.getMailConfirmationById($stateParams.id);

    //////////////////////////////////
    /*
     *
     *  Function : update UserForgot
     * Description : Update UserForgot details
     * Owner : ck
     * 
     */

    $scope.updateMailConfirmation = function () {

      console.log($scope.mailer);
      console.log($scope.formdata.$valid);
      if ($scope.formdata.$valid && $scope.mailer != 0 && $scope.smtpsecur != 0) {

        var data = {
          "mailer": $scope.mailer,
          "smtpauthen": $scope.smtpauthen,
          "smtpsecur": $scope.smtpsecur,
          "smtpport": $scope.smtpport,
          "smtppass": $scope.smtppass,
          "smtpuname": $scope.smtpuname,
          "smtphost": $scope.smtphost,
          "userId": $stateParams.id,

        }

        $scope.mailConfirmationService.updateMailConfirmation($stateParams.id, data).then(function (result) {
          if (result.statusText = "OK") {
            swal("Sccess!", "Successfully updated User", "success");
            $state.go('emailconfirmation');
            // $state.reload();
          }
        });
      }
    }

    ///////////////////////////////////////////////////////////////////////
    $scope.stateChanged = function () {
      var details = $scope.userdetails1;
      if ($scope.check1) {
        $scope.mailer = $scope.userdetails1.mailer;
      }
      if ($scope.check2) {
        $scope.smtpauthen = $scope.userdetails1.smtpauthen;
      }
      if ($scope.check3) {
        $scope.smtpsecur = $scope.userdetails1.smtpsecur;
      }
      if ($scope.check4) {
        $scope.smtpport = $scope.userdetails1.smtpport;
      }
      if ($scope.check5) {
        $scope.smtppass = $scope.userdetails1.smtppass;
      }
      if ($scope.check6) {
        $scope.smtpuname = $scope.userdetails1.smtpuname;
      }
      if ($scope.check7) {
        $scope.smtphost = $scope.userdetails1.smtphost;
      }
    }
  }
}());
