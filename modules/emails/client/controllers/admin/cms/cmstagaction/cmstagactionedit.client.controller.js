(function () {
  'use strict';

  angular
    .module('emails')
    .controller('CmstagactionEdit', CmstagactionEdit);



  CmstagactionEdit.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'cmsTagActionService'];

  function CmstagactionEdit($scope, $http, $state, $stateParams, Upload, cmsTagActionService) {

    //$scope.formdata = {};
    $scope.status = "0";
    $scope.username = localStorage.getItem('username');
    $scope.cmsTagActionService = cmsTagActionService;

    /////////////////////select/////////////////////////////
    ////////////////////////ip fetch//////////////////////////////

    $http.get("https://ipinfo.io/").then(function (response) {
      $scope.ip = response.data.ip;

    });
    ///////////////////////////////////////////////////////
    //$scope.currentLang= localStorage.getItem('currentLang');

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
          $scope.cmsTagActionService.delUserForgot(userId).then(function (result) {
            if (result.statusText = "OK") {
              swal(
                'Deleted!',
                'Item has been deleted.',
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
      * Owner : ck
   */

    //console.log( $scope.cmsTagActionService);
    $scope.currentLan = localStorage.getItem('currentLang').toString();
    $scope.defaultLang = localStorage.getItem('defaultLang').toString();

    $scope.getCmsTagActionById = function (userId) {
      //console.log(0);
      $scope.cmsTagActionService.getCmsTagActionById(userId).then(function (result) {
        //console.log(result);
        var details = result.data;

        if (result.statusText = "OK") {
          //console.log(result);

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
            // console.log(details.oLang)
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
    $scope.getCmsTagActionById($stateParams.id);



    // $http({
    //   url: '/api/userforgot/'+$stateParams.id,
    //   method: "GET",

    // })
    // .then(function(result) {
    //   console.log(result);
    // $scope.langlist=result.data;
    //       // success
    //    //console.log( $scope.counlist)  
    //       //console.log(5464564564);
    // }, 
    // function(response) { // optional
    //       // failed
    // });




    //////////////////////////////////
    /*
     *
     *  Function : update UserForgot
     * Description : Update UserForgot details
     * Owner : ck
     * 
     */

    $scope.updateCmsTagAction = function () {

      //console.log(564564);
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
        //console.log(data);
        $scope.cmsTagActionService.updateCmsTagAction($stateParams.id, data).then(function (result) {
          if (result.statusText = "OK") {
            swal("Success!", "Successfully updated User", "success");
            $state.go('emailcmstagaction');
            // $state.reload();
          }
        });
      }
    }

    ///////////////////////////////////////////////////////////////////////
    $scope.stateChanged = function () {
      //console.log(80);
      var details = $scope.userdetails1;

      if ($scope.check1) {
       // console.log(350);
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
        if ($scope.check5) {
          $scope.status = details.status.toString();

        }
        else {
          //$scope.status =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].status :details.status;

        }
      }

    }


  }
}());
