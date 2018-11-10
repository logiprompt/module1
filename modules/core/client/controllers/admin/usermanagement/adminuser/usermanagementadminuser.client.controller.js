(function () {
  'use strict';

  angular
    .module('core')
    .controller('Usermanagementadminuser', Usermanagementadminuser);



  Usermanagementadminuser.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload'];

  function Usermanagementadminuser($scope, $http, $state, $stateParams, Upload) {

    $scope.formdata = {};
    $scope.formdata.status = '0';
    $scope.formdata.role = '0';
    $scope.formdata.country = '0';
    $scope.formdata.state = '0';
    $scope.formdata.district = '0';
    $scope.formdata.username = localStorage.getItem('username');
    /////////fetch ip///////////////
    $http.get("https://ipinfo.io/").then(function (response) {
      $scope.formdata.ip = response.data.ip;
    });

    /////////////////////select/////////////////////////////

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
    $http({
      url: '/api/admin/selectCountry',
      method: "POST",

    })
      .then(function (response) {
        $scope.list = response.data.data;
        // success
      },
        function (response) { // optional
          // failed
        });

    $http({
      url: '/api/admin/selectRoleprivileges',
      method: "POST",

    })
      .then(function (response) {
        $scope.role = response.data.data;
        // success
      },
        function (response) { // optional
          // failed
        });
    ///////////////////////////////////////////////////////////
    $http({
      url: '/api/admin/selectDistrict',
      method: "POST",

    })
      .then(function (response) {
        $scope.distlist = response.data.data;
        // success
      },
        function (response) { // optional
          // failed
        });
    ////////////////////////////////////////////////////////////////
    //////////////////////////load users list////////////////////////////////
    $http({
      url: '/api/admin/selectAdminusers',
      method: "POST",

    })
      .then(function (response) {
        $scope.userlist = response.data.data;
        // success
      },
        function (response) { // optional
          // failed
        });
    $scope.changestate = function () {
      var changeid = { 'id': $scope.formdata.state };
      console.log(changeid);
      $http({
        url: '/api/admin/changestate',
        method: "POST",
        data: changeid
      })
        .then(function (response) {
          // console.log(response.data.data);
          $scope.dist = response.data.data;

        },
          function (response) { // optional
            // failed
          });

    }
    ////////////////////////////////////////////////////////////////////

    $scope.changecountry = function () {
      var changeid = { 'id': $scope.formdata.country };
      console.log(changeid);
      $http({
        url: '/api/admin/changecountry',
        method: "POST",
        data: changeid
      })
        .then(function (response) {
          // console.log(response.data.data);
          $scope.state = response.data.data;

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
    ///////////////////////////////////insert ////////////////////////////////////////////////////


    $scope.insadminuser = function () {

      // $scope.chkroleValue = [];
      // var checkedroleValue = document.querySelectorAll('.rowrolechk:checked');
      // for (var i = 0; i < checkedroleValue.length; i++) {
      //   $scope.chkroleValue.push(checkedroleValue[i].value);
      // }
      // $scope.formdata.role = $scope.chkroleValue;
      if ($scope.validation() == 0) {


        var data = $scope.formdata;
        console.log(data);
        Upload.upload({
          url: '/api/admin/insadminuser',
          data: data,
          file: $scope.imgss
        }).then(function (response) {
          console.log(response);
          //$state.reload();
          if (response.data.data == 0) {
            swal("Sccess!", "Successfully added !", "success");
            $state.reload();
          }
          else if (response.data.data == 1) {
            swal("error!", "Already exist!", "error");
            //$state.reload();
          }
        });
      }

    }


    $scope.rmerrorclass = function () {
      angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
    }
    $scope.adderrorclass = function (cls) {
      angular.element(document.querySelector(cls)).addClass('validationErr');
    }
    $scope.taberrorclass = function (cls) {
      angular.element(document.querySelector(cls)).addClass('validationErr');
    }
    $scope.validation = function () {
      var error = 0;
      $scope.rmerrorclass();

      if ($scope.formdata.uname == 0 || angular.isUndefined($scope.formdata.uname)) {
        $scope.adderrorclass(".uname");
        $scope.taberrorclass(".tcat");
        error = 1;

      }
      if ($scope.formdata.fname == '' || angular.isUndefined($scope.formdata.fname)) {
        $scope.adderrorclass(".fname");
        $scope.taberrorclass(".tcat");
        error = 2;

      }
      if ($scope.formdata.lname == '' || angular.isUndefined($scope.formdata.lname)) {
        $scope.adderrorclass(".lname");
        $scope.taberrorclass(".tcat");
        error = 3;

      }
      if ($scope.formdata.email == '' || angular.isUndefined($scope.formdata.email)) {
        $scope.adderrorclass(".email");
        $scope.taberrorclass(".tcat");
        error = 4;
      }
      if ($scope.imgss == '' || angular.isUndefined($scope.imgss)) {
        $scope.adderrorclass(".write_textbox");
        $scope.taberrorclass(".tcat");
        error = 4;
      }

      if ($scope.formdata.status == 0 || angular.isUndefined($scope.formdata.status)) {
        $scope.adderrorclass(".status");
        $scope.taberrorclass(".tcat");
        error = 4;

      }


      if ($scope.formdata.cadminpassword == '' || angular.isUndefined($scope.formdata.cadminpassword)) {
        $scope.adderrorclass(".cadminpassword");
        $scope.taberrorclass(".login");
        error = 5;
      }

      if ($scope.formdata.password == '' || angular.isUndefined($scope.formdata.password)) {
        $scope.adderrorclass(".password");
        $scope.taberrorclass(".login");
        error = 6;
      }

      if ($scope.formdata.cpassword == '' || angular.isUndefined($scope.formdata.cpassword)) {
        $scope.adderrorclass(".cpassword");
        $scope.taberrorclass(".login");
        error = 5;
      }

      if ($scope.formdata.role == 0 || angular.isUndefined($scope.formdata.role)) {
        $scope.adderrorclass(".role");
        $scope.taberrorclass(".roll");
        error = 6;

      }

      // if ($scope.formdata.role == '' || angular.isUndefined($scope.formdata.role)) {
      //   $scope.adderrorclass(".rowrollchk");
      //   $scope.taberrorclass(".roll");
      //   error = 6;
      // }


      return error;



    }
    /////////////////////delete///////////////////
    $scope.del = function (id) {



      var val = { 'id': id };
      //console.log(val);
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        $http({
          url: '/api/admin/delAdminusers',
          method: "POST",
          data: val
        })
          .then(function (response) {
            $state.reload();

          },
            function (response) { // optional
              // failed
            });
        if (result.value) {
          swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })


    }
    /////////////////////////////////////

    function readFile(ev) {

      if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          document.getElementById("imgfiles").src = e.target.result;
          //ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result;
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

        $scope.editpage[0].setAttribute("href", "/usermanagement/editadminuserlist/" + linkid);
      }

    }
    $scope.chk = {};

    $scope.newpage = function () {
      $state.go('usermanagementaddadminuserlist');
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

      var ids = { 'id': $scope.chkValue };
      console.log(ids);
      //var val={'id':id};
      //console.log(val);

      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {


        $http({
          url: '/api/admin/delcheckedAdminusers',
          method: "POST",
          data: ids
        })
          .then(function (response) {
            $state.reload();

          },
            function (response) { // optional
              // failed
            });

        if (result.value) {
          swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    }
    setTimeout(getActionBtns, 1500);

  }

}());
