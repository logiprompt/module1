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
          "name": "Joe", "age": "21", "children": [
            { "name": "Smith", "age": "42", "children": [] },
            {
              "name": "Gary", "age": "21", "children": [
                {
                  "name": "Jenifer", "age": "23", "children": [
                    { "name": "Dani", "age": "32", "children": [] },
                    { "name": "Max", "age": "34", "children": [] }
                  ]
                }
              ]
            }
          ]
        },
        { "name": "Albert", "age": "33", "children": [] },
        { "name": "Ron", "age": "29", "children": [] }
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
