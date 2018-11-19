(function () {
  'use strict';

  angular
    .module('products')
    .controller('BusinessTypeaddController', BusinessTypeaddController);



  BusinessTypeaddController.$inject = ['$scope', '$http', '$state', '$stateParams', 'Upload', 'businesstypeaddService'];

  function BusinessTypeaddController($scope, $http, $state, $stateParams, Upload, businesstypeaddService) {

    $scope.formdata = {};
    $scope.status = '0';
    $scope.businesstypeaddService = businesstypeaddService;
    /////////////////////select/////////////////////////////

    $scope.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
      injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
      }
    }
    $scope.dataForTheTree =
      [
        {
          "_id": "5beaa8df64061e5b3ce1ea4d",
          "level": 1,
          "hasChild": true,
          "__v": 1,
          "children": [
              {
                  "_id": "5beaa9057a7ec0471468ad1c",
                  "level": 2,
                  "hasChild": true,
                  "__v": 1,
                  "children": [
                      {
                          "_id": "5bebb6251778491e886da21c",
                          "level": 2,
                          "hasChild": false,
                          "__v": 0,
                          "children": [],
                          "modified": "2018-11-14T05:44:05.530Z",
                          "created": "2018-11-14T05:44:05.530Z",
                          "path": "submenusub",
                          "urlslug": "submenusub",
                          "alt": "submenusub",
                          "description": "submenusub",
                          "parentID": "5beaa9057a7ec0471468ad1c",
                          "menu": "submenusub"
                      }
                  ],
                  "modified": "2018-11-13T10:35:49.780Z",
                  "created": "2018-11-13T10:35:49.780Z",
                  "path": "submenu1",
                  "urlslug": "submenu1",
                  "alt": "submenu1",
                  "description": "submenu1",
                  "parentID": "5beaa8df64061e5b3ce1ea4d",
                  "menu": "submenu1"
              }
          ],
          "modified": "2018-11-13T10:35:11.630Z",
          "created": "2018-11-13T10:35:11.630Z",
          "path": "menu1",
          "urlslug": "menu1",
          "alt": "menu1",
          "description": "menu1",
          "parentID": null,
          "menu": "menu1"
      },
      {
          "_id": "5beaa9287a7ec0471468ad1d",
          "level": 1,
          "hasChild": false,
          "__v": 0,
          "children": [],
          "modified": "2018-11-13T10:36:24.983Z",
          "created": "2018-11-13T10:36:24.983Z",
          "path": "menu2",
          "urlslug": "menu2",
          "alt": "menu2",
          "description": "menu2",
          "parentID": null,
          "menu": "menu2"
      }
      ];


      $scope.showSelected = function(node){
      
      }

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



    /*
      * Function : addordercreation
      * Description : Add ordercreation details
   	
      */

    $scope.addBusiness = function () {
      console.log($scope.file);
      debugger;
      console.log($scope.formdata.$valid);
      // if ($scope.formdata.$valid) {
      var data = {
        "businessTypeName": $scope.btypename,
        // "subTypeName": $scope.stypename,
        "image": $scope.file,
        "description": $scope.description,
        "slug": $scope.slug,
        "URLkey": $scope.urlkey,
        "menuLink": $scope.menulink,
        "displaySelectedIn": $scope.displayin,
        "status": $scope.status
      }

      console.log(data);
      businesstypeaddService.addBusiness(data).then(function (result) {
        console.log(result);
        if (result.statusText = "OK") {
          swal("Success!", "Successfully added!", "success");
          //$state.go('emailordercompletion');
        } else {
          swal("error!", "Already exist!", "error");
        }

      })
      //  }

    }
    ///////////////////////////////////////////////////////////////////////


    /*
         * FUnction : delOrderHold
         * Description : delete OrderHold By Id
       
         */
    $scope.delOrderHold = function (userId) {


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
          $scope.orderholdService.delOrderHold(userId).then(function (result) {
            if (result.statusText = "OK") {

              swal('Deleted!',
                'User has been deleted.',
                'success')

              $state.reload();
            } else {

            }
          })
        }
      })

    }
    ///////////////////////////////////////////////////////////////////////


  }






}());
