(function () {
  'use strict';

  angular
    .module('core')
    .controller('Settingsmenu', Settingsmenu);



  Settingsmenu.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'adminMenuService'];

  function Settingsmenu($scope, $http, $state, $stateParams, Upload, adminMenuService) {

    var vm = this;
    $scope.formdata = {};
    $scope.check = 1;
    $scope.username = localStorage.getItem('username');
    $scope.adminMenuService = adminMenuService;
 /**
  * Function : getmenu
       * Description : get menu details
       * Owner : jeeja
  * 
  **/
    $scope.getMenuList = function () {
      $scope.adminMenuService.getMenuList().then(function(data){
         if(data.statusText = "OK"){
        $scope.menuList = data.data;
         }
         else{}
      })
    };
    
 $scope.getMenuList();


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




    //////////////////////////////////
    /*
       * Function : addmenu
       * Description : Add menu details
       * Owner : jeeja
       */

    $scope.addmenu = function () {
    
      if ($scope.formmenu.$valid) {
if($scope.check==1){
        var data = {
          "parentID":null,
          "menu": $scope.formdata.menu,
          "description": $scope.formdata.desc,
          "level": 1,
          "hasChild": false,
          "alt": $scope.formdata.alt
        }
      }
      else if($scope.check==2)
      {
        var data = {
          "parentID": $scope.formdata.menu,
          "menu":$scope.formdata.submenu,
          "description": $scope.formdata.desc,
          "level": 2,
          "hasChild": false,
          "alt": $scope.formdata.alt
        }
        console.log(data);
      }
        $scope.adminMenuService.addMenu(data).then(function (result) {
          if (result.statusText = "OK") {
            swal("Success!", "Successfully added menu!", "success");
            $state.reload();
          } else {
            swal("error!", "menu already exist!", "error");
          }

        })
      }
   
  

    }
    ///////////////////////////////////////////////////////////////////////


    function readFile(ev) {

      if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          document.getElementById("imgfiles").src = e.target.result;
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

    $scope.rmerrorclass=function(){
      angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
      angular.element(document.querySelectorAll('.tabvalidationErr')).removeClass('tabvalidationErr');
      }
      $scope.adderrorclass=function(cls){
      angular.element(document.querySelector(cls)).addClass('validationErr');
      }
      $scope.taberrorclass=function(cls){
        angular.element(document.querySelector(cls)).addClass('tabvalidationErr');
        }


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
      console.log(linkid)
      console.log(checkedValue[0])
      if (checkedValue.length > 1) {
        $scope.editpage[0].removeAttribute("href");
      }
      else {

        $scope.editpage[0].setAttribute("href", "/settings/countryedit/" + linkid);
      }

    }
    $scope.chk = {};

    $scope.newpage = function () {
      $state.go('countryadd');
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
