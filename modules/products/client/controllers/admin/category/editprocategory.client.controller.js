(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditProCategoryController', EditProCategoryController);



  EditProCategoryController.$inject = ['$scope', '$http', '$state', '$stateParams', '$location', 'productcategoryService', 'extrafieldService'];

  function EditProCategoryController($scope, $http, $state, $stateParams, $location, productcategoryService, extrafieldService) {
    //var vm = this;

    $scope.formdata = {};
    $scope.productcategoryService = productcategoryService;
    $scope.extrafieldService = extrafieldService;

    /*
       * Function : getCategoryDEtails
       * description : Get category items
       */

     $scope.currentLan=localStorage.getItem('currentLang').toString();
     $scope.defaultLang=localStorage.getItem('defaultLang').toString();
    $scope.getCategoryDetails = function (categoryid) {
      $scope.productcategoryService.getCategoryDetails(categoryid).then(function (result) {
        var details=result.data;
       // console.log(details);
   // $scope.formdata = result.data;
      //  $scope.selectedExtrafieldGroup = result.data.selectedExtrafieldGroup;
        if (result.statusText = "OK") {
      
          $scope.status =details.status;
         // console.log(details);    
       if(angular.equals($scope.currentLan, $scope.defaultLang)){
        console.log(details);  
       $scope.userdetails = result.data;
       $scope.categoryname = $scope.userdetails.category;
       $scope.desc = $scope.userdetails.description;
       $scope.metaDescription =  $scope.userdetails.metaDescription;
       $scope.metaKeywords = $scope.userdetails.metaKeywords;
       $scope.urlKey =  $scope.userdetails.urlKey;
       $scope.menu = $scope.userdetails.displayInMenu;
       $scope.sidebar =  $scope.userdetails.displayInSidebar;
       $scope.selectedExtrafieldGroup = $scope.userdetails.extrafieldGroup;
     }
     else{
      
       $scope.userdetails = result.data;
       console.log($scope.userdetails);
        $scope.categoryname =$scope.currentLan in details.oLang ?details.oLang[ $scope.currentLan].category:details.category;
        $scope.desc =$scope.currentLan in details.oLang ?details.oLang[ $scope.currentLan].description :details.description;
        $scope.metaDescription =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].metaDescription:details.metaDescription ;
        $scope.metaKeywords = $scope.currentLan in details.oLang ?details.oLang[ $scope.currentLan].metaKeywords:details.metaKeywords ; 

        $scope.urlKey =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].urlKey:details.urlKey ;
        $scope.menu =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].displayInMenu:details.displayInMenu ;
        $scope.sidebar =$scope.currentLan in details.oLang ?details.oLang[ $scope.currentLan].displayInSidebar:details.displayInSidebar ;
        $scope.selectedExtrafieldGroup = $scope.currentLan in details.oLang ?details.oLang[ $scope.currentLan].extrafieldGroup:details.extrafieldGroup ; 

     }
     }
      })
    }

    $scope.getCategoryDetails($stateParams.id);

    /*
       * Function : updateCategory
       */

    $scope.updateCategory = function () {
      console.log($scope.selectedExtrafieldGroup)
      $scope.formdata.extrafieldGroup = $scope.selectedExtrafieldGroup;
      $scope.productcategoryService.updateCategory($scope.formdata).then(function (result) {
        $location.path('/product/category');
      })
    }


    /*
       * Function : updateCategory
       */

    $scope.deleteCategory = function () {
      $scope.productcategoryService.deleteCategory($stateParams.id).then(function (result) {
        $location.path('/product/category');
      })
    }

    /*
       * Function : getextrafieldGroupItems
       * description : Get all extrafield group items
       */
    $scope.getExtrafieldGroupItems = function () {
      $scope.extrafieldService.getExtraFieldGroup().then(function (result) {
        $scope.extrafieldGroupItems = result['data'];
      })
    }
    $scope.getExtrafieldGroupItems();


    // ///////////////////select 0ne/////////////////////////////////
    // if ($stateParams.id) {

    //   var val = { 'id': $stateParams.id };

    //   $http({
    //     url: '/api/admin/editcat',
    //     method: "POST",
    //     data: val
    //   })
    //     .then(function (response) {

    //       $scope.formdata.category = response.data.data.category;
    //       $scope.formdata.id = response.data.data.cat_id;

    //     },
    //     function (response) { // optional
    //       // failed
    //     });

    // }


    // /////////////////////select/////////////////////////////
    // $http({
    //   url: '/api/admin/selectCategory',
    //   method: "POST",

    // })
    //   .then(function (response) {
    //     $scope.list = response.data.data;
    //     // success
    //   },
    //   function (response) { // optional
    //     // failed
    //   });

    // ///////////////////////insert////////////////////////////
    // $scope.updatecat = function () {
    //   // $scope.formdata.id=$stateParams.id;
    //   if ($scope.validation() == 0) {


    //     $http({
    //       url: '/api/admin/updatecat',
    //       method: "POST",
    //       data: $scope.formdata
    //     })
    //       .then(function (response) {

    //         $state.go('category');
    //         // success
    //       },

    //       function (response) { // optional
    //         // failed
    //       });
    //   }
    // }

    // $scope.iconw = function () {
    //   document.getElementById('imgfile').click();

    // }

    // function readFile(ev) {

    //   if (this.files && this.files[0]) {
    //     var FR = new FileReader();
    //     FR.onload = function (e) {
    //       document.getElementById("imgfiles").src = e.target.result;
    //       ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1] = e.target.result;
    //       //document.getElementById("b64").innerHTML = e.target.result;
    //     };
    //     FR.readAsDataURL(this.files[0]);
    //   }
    // }

    // if (document.getElementById("imgfile") != null) {
    //   document.getElementById("imgfile").addEventListener("change", readFile, false);
    // }

    // $scope.del = function (id) {

    //   var val = { 'id': id };
    //   $http({
    //     url: '/api/admin/delcate',
    //     method: "POST",
    //     data: val
    //   })
    //     .then(function (response) {
    //       $state.go('category');

    //     },
    //     function (response) { // optional
    //       // failed
    //     });

    // }


    // $scope.rmerrorclass = function () {
    //   angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
    // }
    // $scope.adderrorclass = function (cls) {
    //   angular.element(document.querySelector(cls)).addClass('validationErr');
    // }

    // $scope.validation = function () {
    //   var error = 0;
    //   $scope.rmerrorclass();

    //   if ($scope.formdata.category == '' || angular.isUndefined($scope.formdata.category)) {
    //     $scope.adderrorclass(".cat");
    //     error = 1;

    //   }

    //   return error;
    // }



  }
}());
