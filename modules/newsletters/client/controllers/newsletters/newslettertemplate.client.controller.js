(function () {
  'use strict';

  angular
    .module('newsletters')
    .controller('NewstemplateController', NewstemplateController);

  NewstemplateController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', '$location', 'NewsletterTemplateService'];

  function NewstemplateController($scope, $http, $state, $stateParams, Upload, $location, NewsletterTemplateService) {
    $scope.formdata = {};
    $scope.NewsletterTemplateService = NewsletterTemplateService;
    $scope.currentLan=localStorage.getItem('currentLang').toString();
    /*newsletter template starts*/
   
    $scope.defaultLang = localStorage.getItem('defaultLang').toString();
    //add new template
    $scope.addNewsLetterTemplate = function () {
      var desc = CKEDITOR.instances['desc'].document.getBody().getHtml();
     // $scope.formdata.content = desc;
     console.log($scope.formdata.$valid);
      if ($scope.formdata.$valid && $scope.status!=0) {
       // console.log(121212);
        var data = {
          "templateName": $scope.name,
          "templateSubject": $scope.subject,
          "senderName": $scope.sender,
          "senderEmail": $scope.senderEmail,
          "content":desc,
          "status": $scope.status,
          "oLang": {}
        }
      $scope.NewsletterTemplateService.addNewsLetterTemplate(data).then(function (result) {
        if (result.statusText = "OK") {
          swal("Success!", "Successfully added !", "success");
          $state.go('newslettertemplate');
         //$location.path('/newsletters/template');
        } else {
          swal("error!", " already exist!", "error");
        }
       
      })
    }
  }
    //get template lists
    $scope.getAllNewsLetterTemplates = function () {
      $scope.NewsletterTemplateService.getAllNewsLetterTemplates().then(function (result) {
        $scope.newLetterTemplates = result['data'];
      
        
      })
    }

    if ($stateParams.id == undefined) {
     // alert(111111);
      $scope.getAllNewsLetterTemplates();
    }

    //get newsletter template details
    if ($stateParams.id != undefined) {
      //console.log(333333);
      $scope.NewsletterTemplateService.getNewsLetterTemplateDetails($stateParams.id).then(function (result) {
        //$scope.NewsLetterDetails = result['data'];
        var details = result.data;
       console.log(details.content);
   
       
     // console.log(details);
        if (result.statusText ="OK") {
 
           $scope.status = details.status;
           if (angular.equals($scope.currentLan, $scope.defaultLang)) {
             $scope.userdetails = result.data;
             $scope.name = $scope.userdetails.templateName;
             $scope.subject = $scope.userdetails.templateSubject;
             $scope.sender = $scope.userdetails.senderName;
             $scope.senderEmail = $scope.userdetails.senderEmail;
             $scope.desc = $scope.userdetails.content;
            // CKEDITOR.instances['desc'].setData(details.content);
           }
           else {
console.log(details);
           $scope.userdetails = result.data;
             $scope.name = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].senderName : details.senderName;
             $scope.subject = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].templateSubject : details.templateSubject;
             $scope.sender = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].senderName : details.senderName;
             $scope.senderEmail = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].senderEmail : details.senderEmail;
             $scope.desc = $scope.currentLan in details.oLang ? details.oLang[$scope.currentLan].content : details.content;


           }
        }
      })
    }

    //update newsletter template
    
    $scope.updateNewsTemplate = function(){
   
     var desc = CKEDITOR.instances['desc'].document.getBody().getHtml();
    //  $scope.NewsLetterDetails.content = desc;
    console.log($scope.formdata.$valid)
      if ($scope.formdata.$valid && $scope.status != 0) {


        if (localStorage.getItem("currentLang") == 'en') {
          var data = {
            "templateName": $scope.name,
            "templateSubject": $scope.subject,
            "senderName": $scope.sender,
            "senderEmail": $scope.senderEmail,
            "content":desc,
            "status": $scope.status,
            "userId": $stateParams.id,
            "isDefaultLang": true,

          }
        }
        else {
          var data = {
            "templateName": $scope.name,
            "templateSubject": $scope.subject,
            "senderName": $scope.sender,
            "senderEmail": $scope.senderEmail,
            "content":desc,
            "userId": $stateParams.id,
            "isDefaultLang": false,
            "defaultLang": localStorage.getItem("defaultLang"),
            "userSelectedLang": localStorage.getItem("currentLang")
          };
        }
      $scope.NewsletterTemplateService.updateNewsLetterTemplate( data).then(function (result) {
        if (result.statusText = "OK") {
          swal("Sccess!", "Successfully updated ", "success");
          $state.go('newslettertemplate');
        }
        //$location.path('/newsletters/template');
      })
    }
    }

    /*newsletter template ends*/



    ///////////////////////////////////////////////////////


   /*
       * FUnction : delNewsTemp
       * Description : delete NewsTemp id
       * 
       * 
       */
      $scope.delNewsTemp = function (userId) {


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
            $scope.NewsletterTemplateService.delNewsTemp(userId).then(function (result) {
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
      //console.log(checkedValue)
      for (var i = 0; i < checkedValue.length; i++) {
        $scope.chkValue.push(checkedValue[i].value);
      }
      var userId = $scope.chkValue;
      //console.log(userId);
    
      swal({
        title: 'Are you sure?',
        text: "You want to delete checked items!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          $scope.NewsletterTemplateService.delcheckednewstemp(userId).then(function (result) {
            if (result.statusText = "OK") {
              swal(
                'Deleted!',
                'Checked items has been deleted.',
                'success'
              )
              $state.reload();
              //  $scope.getUser();
            } else {
  
            }
          })
        }
        else{}
      })
    }
    setTimeout(getActionBtns, 1500);


  }






}());
