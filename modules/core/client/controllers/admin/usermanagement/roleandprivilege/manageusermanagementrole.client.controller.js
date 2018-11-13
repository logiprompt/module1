(function () {
  'use strict';

  angular
    .module('core')
    .controller('Manageusermanagementrole', Manageusermanagementrole);



    Manageusermanagementrole.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'adminMenuService','aclService'];

  function Manageusermanagementrole($scope, $http, $state, $stateParams, Upload, adminMenuService,aclService) {

    var vm = this;
    $scope.formdata = {};
    $scope.check = 1;
    $scope.username = localStorage.getItem('username');
    $scope.adminMenuService = adminMenuService;
    $scope.aclService = aclService;
 /**
  * Function : getmenu
       * Description : get menu details
       * Owner : jeeja
  * 
  **/
    $scope.getMenuList = function () {
      $scope.aclService.getMenuList().then(function(data){
         if(data.statusText = "OK")
         {
           $scope.menuList = data.data;
        console.log( $scope.menuList);
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
       * Function : addacl
       * Description : Add acl details
       *
       */

    $scope.addacl = function () {

      $scope.chkroleValue = [];
      var checkedroleValue = document.querySelectorAll('.rowrolechk:checked');
      for (var i = 0; i < checkedroleValue.length; i++) {
        $scope.chkroleValue.push(checkedroleValue[i].value);
      }
      $scope.formdata.role = $scope.chkroleValue;
  // console.log($scope.formdata.role);  
    
      if ($scope.validation() == 0) {
         var data = {
                     "menuIDs": $scope.formdata.role,
                     "userID":$stateParams.id
                     }
       // var data = $scope.formdata;
       // console.log(data);
        $scope.aclService.addAcl(data).then(function (result) {
        //  console.log(result.statusText);
          if (result.statusText = "OK") {
            
            swal("Success!", "Successfully added!", "success");
            //$state.reload();
            $state.go('usermanagementrole');
          } else {
            swal("error!", "Already exist!", "error");
          }

        })
       
       
      }
      else{

        swal("Error!", "You have not selected any menu!");

      }
   
  

    }


    $scope.getAclList = function(userID){
     // console.log(userID);
      $scope.aclService.getAclList(userID).then(function(result){
       if(result.statusText = "OK"){
         $scope.acllist = result.data[0].menuIDs;
 
        //  $scope.extrafieldGroup = result.data;
        // 	   $scope.groupName = $scope.extrafieldGroup.groupname;
        //      $scope.status = $scope.extrafieldGroup.status.toString();
            
  //console.log($scope.acllist);
        }else{
          
        }
     });
    }

    $scope.getAclList($stateParams.id);
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


        $scope.validation = function () {
          var error = 0;
          $scope.rmerrorclass();
    
    
          if ($scope.formdata.role == '' || angular.isUndefined($scope.formdata.role)) {
            $scope.adderrorclass(".rowrollchk");
            $scope.taberrorclass(".roll");
            error = 6;
          }
    
    
          return error;
    
    
    
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
     // console.log(linkid)
     // console.log(checkedValue[0])
      if (checkedValue.length > 1) {
        $scope.editpage[0].removeAttribute("href");
      }
      else {

        $scope.editpage[0].setAttribute("href", "/settings/editmenu/" + linkid);
      }

    }
    $scope.chk = {};

    $scope.newpage = function () {
      $state.go('settingsmenuadd');
    }
    $scope.editpages = function () {
      var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
      if (checkedValue.length > 0) {
       // console.log($scope.editpage[0].getAttribute("href"));
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
     // console.log(checkedValue)
      for (var i = 0; i < checkedValue.length; i++) {
        $scope.chkValue.push(checkedValue[i].value);
      }

    }
    setTimeout(getActionBtns, 1500);


  }






}());
