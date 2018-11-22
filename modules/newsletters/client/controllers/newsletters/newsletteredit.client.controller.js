(function () {
  'use strict';

  angular
    .module('newsletters')
    .controller('NewslettereditController', NewslettereditController);



    NewslettereditController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'NewslettersService','NewsletterTemplateService'];

  function NewslettereditController($scope, $http, $state, $stateParams, Upload, NewslettersService,NewsletterTemplateService) {

    //$scope.formdata = {};
    $scope.status = "0";
    $scope.username = localStorage.getItem('username');
    $scope.NewslettersService = NewslettersService;
    
$scope.NewsletterTemplateService = NewsletterTemplateService;

    /////////////////////select/////////////////////////////


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
          $scope.NewslettersService.delUserForgot(userId).then(function (result) {
            if (result.statusText = "OK") {
              swal(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
              $state.go('emailforgetpass');
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
      * Owner : 
      * 
   */ 
  
    $scope.currentLan = localStorage.getItem('currentLang').toString();
    $scope.defaultLang = localStorage.getItem('defaultLang').toString();

    
    $scope.getNewsletterById = function (userId) {
      
      $scope.NewslettersService.getNewsletterById(userId).then(function (result) {
        var details = result.data;
        if (result.statusText = "OK") {
          console.log(details);
          $scope.status = details.status;
          $scope.temp = details.temp;
          if (angular.equals($scope.currentLan, $scope.defaultLang)) {
            $scope.userdetails = result.data;
            $scope.title = $scope.userdetails.title;
            $scope.subject = $scope.userdetails.subject;
            $scope.sender = $scope.userdetails.sender;
            $scope.senderemail = $scope.userdetails.senderemail;
            $scope.contentdesc = $scope.userdetails.contentdesc;
            $scope.imgfile = $scope.userdetails.imgfile;
            $scope.imgfile1 = $scope.userdetails.imgfile1;
           
          }
          else {

            $scope.userdetails = result.data;
            $scope.title = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].title : details.title;
            $scope.subject = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].subject : details.subject;
            $scope.sender = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].sender : details.sender;
            $scope.senderemail = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].senderemail : details.senderemail;
            $scope.contentdesc = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].contentdesc : details.contentdesc;
            $scope.imgfile = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].imgfile : details.imgfile;



          }
        }
        else {
        }
      });
    }
    $scope.getNewsletterById($stateParams.id);

    //////////////////////////////////
    /*
     *
     *  Function : update UserForgot
     * Description : Update UserForgot details
     * Owner : jeeja
     * 
     */
    $scope.getNewslettertemp = function () {
      $scope.NewsletterTemplateService.getAllNewsLetterTemplates().then(function (result) {
        if (result.statusText = "OK") {
          $scope.templist = result.data;
        } else {
    
        }
      });
    }
    $scope.getNewslettertemp();

    $scope.updateUserForgot = function () {
      var formData = $scope.formdata;
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
            "defaultLang": localStorage.getItem("defaultLang"),
            "userSelectedLang": localStorage.getItem("currentLang")
          };
        }


        $scope.NewslettersService.updateUserForgot($stateParams.id, data).then(function (result) {

          if (result.statusText = "OK") {
            swal("Sccess!", "Successfully updated User", "success");
            $state.reload();
          }
        });
      }
    }

    ///////////////////////////////////////////////////////////////////////

  }
}());
