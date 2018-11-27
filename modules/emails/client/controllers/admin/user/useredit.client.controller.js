(function () {
  'use strict';

  angular
    .module('core')
    .controller('Useredit', Useredit);



  Useredit.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'userregService', 'EmailsService'];

  function Useredit($scope, $http, $state, $stateParams, Upload, userregService, EmailsService) {

    $scope.formdata = {};
    $scope.status = "0";
    $scope.username = localStorage.getItem('username');
    $scope.userregService = userregService;
    $scope.EmailsService = EmailsService;


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
      * Function : getUserById
      * Description : get User details
      *
      */
    $scope.currentLan = localStorage.getItem('currentLang').toString();
    $scope.defaultLang = localStorage.getItem('defaultLang').toString();

    $scope.getUserById = function (userId) {
      $scope.userregService.getUserById(userId).then(function (result) {
        var details = result.data;
        if (result.statusText = "OK") {
          $scope.status = details.status.toString();
          $scope.userdetails1 = result.data;
          if (angular.equals($scope.currentLan, $scope.defaultLang)) {

            $scope.userdetails = result.data;
            $scope.name = $scope.userdetails.name;
            $scope.subject = $scope.userdetails.subject;
            $scope.content = $scope.userdetails.content;
            $scope.custom = $scope.userdetails.custom;
          }
          else {

            $scope.userdetails = result.data;
            $scope.userdetails2 = result.data;
            $scope.name = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].name : details.name;
            $scope.subject = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].subject : details.subject;
            $scope.content = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].content : details.content;
            $scope.custom = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].custom : details.custom;

          }


        } else {

        }
      });
    }
    $scope.getUserById($stateParams.id);
    //////////////////////////////////
    /*
     *
     *  Function : update currency
     * Description : Update Currency details
     * Owner : jeeja
     * 
     */

    $scope.updateUser = function () {
      if ($scope.formdata.$valid && $scope.status != 0) {
        if (localStorage.getItem("currentLang") == 'en') {
          var data = {
            "name": $scope.name,
            "subject": $scope.subject,
            "content": $scope.content,
            "custom": $scope.custom,
            "status": $scope.status,
            "userId": $stateParams.id,
            "isDefaultLang": true,

          }
        }
        else {
          var data = {
            "name": $scope.name,
            "subject": $scope.subject,
            "content": $scope.content,
            "custom": $scope.custom,
            "userId": $stateParams.id,
            "isDefaultLang": false,
            "status": $scope.status,
            "defaultLang": localStorage.getItem("defaultLang"),
            "userSelectedLang": localStorage.getItem("currentLang")
          };
        }
        $scope.userregService.updateUser($stateParams.id, data).then(function (result) {
          if (result.statusText = "OK") {
            swal("Success!", "Successfully updated User", "success");
            $state.go('emailuserlist');
          }
        });
      }
    }

    ///////////////////////////////////////////////////////////////////////


    function getActionBtns() {


      $scope.addpage = document.querySelectorAll(".add-action");
      $scope.addpage[0].addEventListener("click", $scope.newpage, false);

      $scope.editpage = document.querySelectorAll(".edit-action");
      $scope.editpage[0].addEventListener("click", $scope.editpages, false);

      var delpage = document.querySelectorAll(".delete-action");
      delpage[0].addEventListener("click", $scope.delpage, false);

      var bus = document.querySelectorAll(".business-action");
      bus[0].addEventListener("click", $scope.insbus, false);

    }

    $scope.insbus = function () {
      $("#myModal").modal();
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

        $scope.editpage[0].setAttribute("href", "/email/edituserreg/" + linkid);
      }

    }
    $scope.chk = {};

    $scope.newpage = function () {
      $state.go('emailuserreg');
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
      for (var i = 0; i < checkedValue.length; i++) {
        $scope.chkValue.push(checkedValue[i].value);
      }
      var userId = $scope.chkValue;
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
          $scope.userregService.delCheckedUser(userId).then(function (result) {
            if (result.statusText = "OK") {
              swal(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
              $scope.getUser();
            } else {

            }
          })
        }
      })
    }
    setTimeout(getActionBtns, 1500);

    $scope.stateChanged = function () {
      
      var details = $scope.userdetails1;
      if ($scope.check1) {
        if ($scope.check1) {
          $scope.name = $scope.userdetails1.name;
        }
        else {
          $scope.name = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].name : details.name;
        }
      }
      if ($scope.check2) {
        if ($scope.check2) {
          $scope.subject = $scope.userdetails1.subject;
        }
        else {
          $scope.subject = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].subject : details.subject;
        }
      }
      if ($scope.check3) {
        if ($scope.check3) {
          $scope.content = $scope.userdetails1.content;
        }
        else {
          $scope.content = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].content : details.content;
        }
      }
      if ($scope.check4) {
        if ($scope.check4) {
          $scope.custom = $scope.userdetails.custom;
        }
        else {
          $scope.custom = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].custom : details.custom;
        }
      }
      if ($scope.check5) {
        $scope.status = $scope.userdetails1.status.toString();
      }
      // else{
      // //$scope.status =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].status :details.status;
      // }
    }
  }
}());
