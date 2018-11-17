(function () {
  'use strict';

  angular
    .module('newsletters')
    .controller('NewstemplateController', NewstemplateController);

  NewstemplateController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', '$location', 'NewsletterTemplateService'];

  function NewstemplateController($scope, $http, $state, $stateParams, Upload, $location, NewsletterTemplateService) {
    $scope.formdata = {};
    $scope.NewsletterTemplateService = NewsletterTemplateService;

    /*newsletter template starts*/

    //add new template
    $scope.addNewsLetterTemplate = function () {
      var desc = CKEDITOR.instances['desc'].document.getBody().getHtml();
      $scope.formdata.content = desc;
      $scope.NewsletterTemplateService.addNewsLetterTemplate($scope.formdata).then(function (result) {
        $location.path('/newsletters/template');
      })
    }

    //get template lists
    $scope.getAllNewsLetterTemplates = function () {
      $scope.NewsletterTemplateService.getAllNewsLetterTemplates().then(function (result) {
        $scope.newLetterTemplates = result['data'];
      })
    }

    if ($stateParams.id == undefined) {
      $scope.getAllNewsLetterTemplates();
    }

    //get newsletter template details
    if ($stateParams.id != undefined) {
      $scope.NewsletterTemplateService.getNewsLetterTemplateDetails($stateParams.id).then(function (result) {
        $scope.NewsLetterDetails = result['data'];
        CKEDITOR.instances['desc'].setData($scope.NewsLetterDetails.content)
      })
    }

    //update newsletter template
    $scope.updateNewsTemplate = function(){
      var desc = CKEDITOR.instances['desc'].document.getBody().getHtml();
      $scope.NewsLetterDetails.content = desc;
      $scope.NewsletterTemplateService.updateNewsLetterTemplate($scope.NewsLetterDetails).then(function (result) {
        $location.path('/newsletters/template');
      })
    }

    /*newsletter template ends*/



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

    function readFile(ev) {

      if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          document.getElementById("imgfiles").src = e.target.result;
          ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1] = e.target.result;
          //document.getElementById("b64").innerHTML = e.target.result;
        };
        FR.readAsDataURL(this.files[0]);
      }
    }
    if (document.getElementById("imgfile") != null) {
      document.getElementById("imgfile").addEventListener("change", readFile, false);
    }

    $scope.iconw = function () {

      document.getElementById('imgfile').click();

    }

    // $(document).find('#myTable').DataTable();




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

        $scope.editpage[0].setAttribute("href", "/newsletters/editnewstemp/" + linkid);
      }

    }
    $scope.chk = {};

    $scope.newpage = function () {
      $state.go('newsaddtemplate');
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

    }
    setTimeout(getActionBtns, 1500);


  }






}());
