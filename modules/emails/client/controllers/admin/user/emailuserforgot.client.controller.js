(function () {
  'use strict';

  angular
    .module('core')
    .directive("viewWithLanguage", function () {
      //define the directive object
      var directive = {};

      //restrict = E, signifies that directive is Element directive
      directive.restrict = 'E';

      //template replaces the complete element with its text. 
      directive.template = "Student: {{data}}";

      //scope is used to distinguish each student element based on criteria.
      directive.scope = {
        data: "=data",
        language: "=language",
        key : "=name"
      }
      // value = data['oLang'][language];


      return directive;
    })
  .controller('EmailuserforgotController', EmailuserforgotController);


EmailuserforgotController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'userforgotService'];

function EmailuserforgotController($scope, $http, $state, $stateParams, Upload, userforgotService) {

  $scope.formdata = {};
  $scope.formdata.status = '0';
  $scope.userforgotService = userforgotService;
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
    * Function : getuserforgot
    * Description : get userforgot details
    * Owner : jeeja
    */

  $scope.getUserForgot = function () {
    console.log(0);
    $scope.userforgotService.getUserForgot().then(function (result) {
      if (result.statusText = "OK") {
        $scope.userlist = result.data;
        //console.log(1);
        //console.log(result.data);
      } else {

      }
    });
  }
  $scope.getUserForgot();
  //////////////////////////////////

  /*
    * Function : adduserforgot
    * Description : Add userforgot details
    * Owner : jeeja
    */
  $scope.addForget = function () {

    if ($scope.formdata.$valid) {
      var data = {
        "name": $scope.name,
        "subject": $scope.subject,
        "content": $scope.content,
        "custom": $scope.custom,
        "status": $scope.status,
        "olang": {}
      }


      $scope.userforgotService.addUserForgot(data).then(function (result) {

        if (result.statusText = "OK") {
          swal("Success!", "Successfully added user!", "success");
          $state.go('emailforgetpass');
        } else {
          swal("error!", "User already exist!", "error");
        }

      })
    }

  }
  ///////////////////////////////////////////////////////////////////////


  /*
       * FUnction : deluserforgot
       * Description : delete userforgot id
       * Owner :jeeja
       * 
       */
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
        $scope.userforgotService.delUserForgot(userId).then(function (result) {
          if (result.statusText = "OK") {
            swal(
              'Deleted!',
              'User has been deleted.',
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

      $scope.editpage[0].setAttribute("href", "/email/editforgetpass/" + linkid);
    }

  }
  $scope.chk = {};

  $scope.newpage = function () {
    $state.go('emailaddforgetpass');
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
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result) {
        $scope.userforgotService.delCheckedUserForget(userId).then(function (result) {
          if (result.statusText = "OK") {
            swal(
              'Deleted!',
              'User has been deleted.',
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
