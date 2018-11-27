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
    $scope.getSubMenulist = function () {
      businesstypeaddService.getSubMenulist().then(function (result) {
      
        if (result.statusText = "OK") {
          $scope.dataForTheTree =result.data;
         console.log(result);
        } else {
          
        }

      })
   
    }

    $scope.getSubMenulist();
    $scope.treeOptions = {
      nodeChildren: "childIDs",
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



      $scope.showSelected = function(node){
     //console.log(node);
      $scope.stypename=node._id;

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
     
      console.log($scope.formdata.$valid);
      // if ($scope.formdata.$valid && $scope.subTypeName) {
      var data = {
        "businessTypeName": $scope.btypename,
         "subTypeName": $scope.stypename,
        "image": $scope.file,
        "description": $scope.description,
        "slug": $scope.slug,
        "URLkey": $scope.urlkey,
        "menuLink": $scope.menulink,
        "displaySelectedIn": $scope.displayin,
        "status": $scope.status
      }

     // console.log(data);
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
        showCancelButton: true,
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
