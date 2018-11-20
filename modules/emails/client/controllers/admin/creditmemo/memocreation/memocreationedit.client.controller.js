(function () {
  'use strict';

  angular
    .module('emails')
    .controller('EmailMemoCreationEdit', MemoCreationEdit);



  MemoCreationEdit.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'memoCreationService'];

  function MemoCreationEdit($scope, $http, $state, $stateParams, Upload, memoCreationService) {

    //$scope.formdata = {};
    $scope.status = "0";
    $scope.username = localStorage.getItem('username');
    $scope.memoCreationService = memoCreationService;

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

    //////////////////////////////////////////////////////////////////////////

    $scope.delUserForgot = function (userId) {


      swal({
        title: 'Are you sure?',
        text: "You want to delete this user!",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result) {
          $scope.memoCreationService.delUserForgot(userId).then(function (result) {
            if (result.statusText = "OK") {
              swal(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
              $state.go('emailordercreation');
            } else {

            }
          })
        }
      })

    }


    /////////////////////////////////////////////////////////////////////
    ///////////////////User Forgot By Id /////////////////////

    /*
      * Function : getUserForgotById
      * Description : get User Forgot details
      * Owner : jeeja
   */

    $scope.currentLan = localStorage.getItem('currentLang').toString();
    $scope.defaultLang = localStorage.getItem('defaultLang').toString();
    
    $scope.getMemoCreationById = function (userId) {
      $scope.memoCreationService.getMemoCreationById(userId).then(function (result) {
        var details = result.data;
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
            $scope.name = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].name : details.name;
            $scope.subject = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].subject : details.subject;
            $scope.content = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].content : details.content;
            $scope.custom = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].custom : details.custom;

          }
        }
        else {

        }
      });
    }
    $scope.getMemoCreationById($stateParams.id);

    //////////////////////////////////
    /*
     *
     *  Function : update UserForgot
     * Description : Update UserForgot details
     * Owner : jeeja
     * 
     */

    $scope.updateMemoCreatin = function () {
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
        $scope.memoCreationService.updateMemoCreatin($stateParams.id, data).then(function (result) {
          if (result.statusText = "OK") {
            swal("Sccess!", "Successfully updated User", "success");
            $state.go('emailmemocreation');
          }
        });
      }
    }

    ///////////////////////////////////////////////////////////////////////

  }
}());
