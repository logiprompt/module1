(function () {
  'use strict';
  angular
    .module('core')
    .controller('ProCategoryController', ProCategoryController);
  ProCategoryController.$inject = ['$scope', '$http', '$state', '$location', 'productcategoryService'];
  function ProCategoryController($scope, $http, $state, $location, productcategoryService) {
    $scope.formdata = {};
    $scope.productcategoryService = productcategoryService;

    
    /*
         * Function : getCategoryItems
         * description : Get all category items for the list
         */
    $scope.getCategoryItems = function () {
      $scope.productcategoryService.getCategoryItems().then(function (result) {
        $scope.categoryItems = result['data'];
        $scope.categoryItems.forEach(function (element) {
          element.created = element.created.split("T")[0];
        }, this);
      })
    }
    $scope.getCategoryItems();

    /*
         * Function : insCategory
         * description : Add new category
         */
    $scope.insCategory = function () {
      if ($scope.category == 1) {
        $scope.addNewCategory();
      } else {
        $scope.addSubCategory();
      }
    }

    $scope.addNewCategory = function () {
      $scope.formdata.level = $scope.category;
      $scope.productcategoryService.addCategory($scope.formdata).then(function (result) {
        $location.path('/product/category');
      })
    }

    $scope.addSubCategory = function () {
      $scope.formdata.category = $scope.formdata.subcategory
      $scope.formdata.parentId = $scope.selectedCategoryId;
      $scope.formdata.level = $scope.category;
      $scope.productcategoryService.addSubCategory($scope.formdata).then(function (result) {
        $location.path('/product/category');
      })
    }

    /*
        * Function : deleteCategory
        * description : delete a category
        */
    $scope.deleteCategory = function (categoryId) {
      $scope.productcategoryService.deleteCategory(categoryId).then(function (result) {
        $scope.getCategoryItems();
      })
    }

    /*
        * Function : selectionChange
        * description : radio button change
        */
    $scope.selectionChange = function () {
      $scope.formdata.category = '';
    }

    /*
        * Function : selectedCategoryChanged
        * description : get category name and id from drop down
        */
    $scope.selectedCategoryChanged = function (selectedCategory) {
      $scope.selectedCategoryId = selectedCategory;
    }









    /////////////////////defaultLang//////////
    $http({
      url: '/api/admin/getdefaultLang',
      method: "POST",
    })
      .then(function (response) {

        $scope.formdata.defaultlang = response.data.data;

      },
      function (response) { // optional
        // failed
      });
    $scope.formdata.catlang = '0';
    $scope.formdata.extra = '0';
    $scope.formdata.menu = '0';
    $scope.formdata.sidebar = '0';




    $scope.iconw = function () {
      document.getElementById('imgfile').click();

    }
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



    $scope.rmerrorclass = function () {
      angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
      angular.element(document.querySelectorAll('.tabvalidationErr')).removeClass('tabvalidationErr');
    }
    $scope.adderrorclass = function (cls) {
      angular.element(document.querySelector(cls)).addClass('validationErr');
    }
    $scope.taberrorclass = function (cls) {
      angular.element(document.querySelector(cls)).addClass('tabvalidationErr');
    }

    $scope.validation = function () {
      var error = 0;
      $scope.rmerrorclass();
      if ($scope.formdata.category == '' || angular.isUndefined($scope.formdata.category)) {
        $scope.adderrorclass(".cat");
        $scope.taberrorclass(".tcat");
        error = 1;
      }

      return error;
    }


    $scope.openLangModel = function (id) {

      $scope.formdata.id = id;
    }





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

        $scope.editpage[0].setAttribute("href", "/product/editcat/" + linkid);
      }

    }
    $scope.chk = {};

    $scope.newpage = function () {
      $state.go('proaddcategory');
    }
    $scope.editpages = function () {

      var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
      if (checkedValue.length > 0) {
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
      for (var i = 0; i < checkedValue.length; i++) {
        $scope.chkValue.push(checkedValue[i].value);
      }

    }
    setTimeout(getActionBtns, 1500);
  }
}());
