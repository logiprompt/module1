(function () {
  'use strict';
  angular
    .module('core')
    .controller('CategoryController', CategoryController)
  CategoryController.$inject = ['$scope', '$http', '$state', '$location', 'CmsService'];
  function CategoryController($scope, $http, $state, $location, CmsService) {
    $scope.formdata = {};
    $scope.CmsService = CmsService;
  
    $scope.generateSlgURL = function(){
   	 var replaceSpacesText = $scope.formdata.category;
   	 $scope.formdata.category_slug = replaceSpacesText.split(" ").join("_").toLowerCase();
   	 $scope.formdata.category_url = "product/"+$scope.formdata.category_slug+"_"+Number(new Date())+".html"
    }
    
    
    /*
         * Function : getCategoryItems
         * description : Get all category items for the list
         */
    $scope.getCategoryItems = function () {
      $scope.CmsService.getCategoryItems().then(function (result) {
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
    $scope.insCategory = function () 
    {
      if ($scope.category == 1) 
      {
        $scope.addNewCategory();
      } 
      else 
      {
        $scope.addSubCategory();
      }
    }


    $scope.addNewCategory = function () {
    	if($scope.catform.$valid){

      //$scope.formdata.level = $scope.category;

      var data = {
        "category": $scope.formdata.category,
        "level":  $scope.category,
        "description": $scope.formdata.description,
        "category_url": $scope.formdata.category_url,
        "category_metadesc": $scope.formdata.desc,
        "category_metakey": $scope.formdata.key,
        "menu": $scope.formdata.dispmenu,
        "sidebar": $scope.formdata.sidebar,
        "status": $scope.formdata.status,
        "image": $scope.imgss   
      }

      $scope.CmsService.addCategory(data).then(function (result) {
        $location.path('cms/category');
      })
    	}
    }

    $scope.addSubCategory = function () {
    	if($scope.catform.$valid){
      //$scope.formdata.category = $scope.formdata.subcategory;
      $scope.formdata.parentId = $scope.selectedCategoryId;
      //$scope.formdata.level = $scope.category;
      
      var data = {
        "category": $scope.selectedCategoryId,
        "level": $scope.category,
        "parentId": $scope.selectedCategory,
        "description": $scope.formdata.description,
        "category_url": $scope.formdata.category_url,
        "category_metadesc": $scope.formdata.desc,
        "category_metakey": $scope.formdata.key,
        "menu": $scope.formdata.dispmenu,
        "sidebar": $scope.formdata.sidebar,
        "status": $scope.formdata.status,
        "image": $scope.imgss   
      }


     // $scope.formdata.extrafieldGroup = $scope.selectedExtrafieldGroup;
      $scope.CmsService.addSubCategory(data).then(function (result) {
        $location.path('cms/category');
      })
    	}
    }

    /*
        * Function : deleteCategory
        * description : delete a category
        */
    $scope.deleteCategory = function (categoryId) {
      swal({
        title: 'Are you sure?',
        text: "You want to delete this !",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result) {

      $scope.CmsService.deleteCategory(categoryId).then(function (result) {
        if (result.statusText = "OK") {
          swal(
            'Deleted!',
            'Category has been deleted.',
            'success'
          )
          //$state.reload();
        $scope.getCategoryItems();
      } else {

      }
      })
    }
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
    //$scope.formdata.menu = '0';
    //$scope.formdata.sidebar = '0';

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
      if ($scope.formdata.category == '' || angular.isUndefined($scope.formdata.category)) 
      {
        $scope.adderrorclass(".cat");
        $scope.taberrorclass(".tcat");
        error = 1;
      }
      return error;
    }

    $scope.openLangModel = function (id) 
    {
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
      if (checkedValue.length > 1) {
        $scope.editpage[0].removeAttribute("href");
      }
      else {
        $scope.editpage[0].setAttribute("href", "/cms/editcat/" + linkid);
      }
    }
    $scope.chk = {};
    $scope.newpage = function () {
      $state.go('addcategory');
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
      var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
      for (var i = 0; i < checkedValue.length; i++) {
        $scope.chkValue.push(checkedValue[i].value);
      }
      var categoryId = $scope.chkValue;
      swal({
        title: 'Are you sure?',
        text: "You want to delete checked items!",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result) {
          $scope.CmsService.delCheckedCmscategory(categoryId).then(function (result) {
            if (result.statusText = "OK") {
              swal('Deleted!',
                    'Cms Category has been deleted.',
                    'success');
              $state.reload();
              //  $scope.getUser();
            } else {
            }
          })
        }
      })
    }
    setTimeout(getActionBtns, 1500);
  }
}());
