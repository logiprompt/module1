(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditCategoryController', EditCategoryController);

  EditCategoryController.$inject = ['$scope', '$http', '$state', '$stateParams', '$location', 'CmsService'];

  function EditCategoryController($scope, $http, $state, $stateParams, $location, CmsService) {
    //var vm = this;

    $scope.formdata = {};
    $scope.CmsService = CmsService;
    $scope.generateSlgURL = function(){
      	 var replaceSpacesText = $scope.formdata.category;
      	 $scope.formdata.category_slug = replaceSpacesText.split(" ").join("_").toLowerCase();
      	 $scope.formdata.category_url = "product/"+$scope.formdata.category_slug+"_"+Number(new Date())+".html"
       }

    /*
       * Function : getCategoryDEtails
       * description : Get category items
       */
      $scope.currentLan=localStorage.getItem('currentLang').toString();
      $scope.defaultLang=localStorage.getItem('defaultLang').toString();
    $scope.getCategoryDetails = function () {
      $scope.CmsService.getCategoryDetails($stateParams.id).then(function (result) {
        var details=result.data;
        if (result.statusText = "OK")
        {   
          $scope.userdetails1 = result.data; 
          $scope.status =details.status.toString();    
          if(angular.equals($scope.currentLan, $scope.defaultLang))
          {
            $scope.userdetails = result.data;
            $scope.formdata.category = $scope.userdetails.category;
            $scope.formdata.description = $scope.userdetails.description;
            $scope.formdata.category_url=$scope.userdetails.category_url;
          }
          else
          {           
            $scope.userdetails = result.data;
            $scope.formdata.category =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].category : details.category;
            $scope.formdata.description = $scope.currentLan in details.oLang  ?details.oLang[ $scope.currentLan].description :  details.description;
            $scope.formdata.category_url = $scope.currentLan in details.oLang  ?details.oLang[ $scope.currentLan].category_url :  details.category_url;
          }
           $scope.formdata.desc=$scope.userdetails.category_metadesc,
           $scope.formdata.key=$scope.userdetails.category_metakey,
           $scope.formdata.dispmenu=$scope.userdetails.menu,
           $scope.formdata.sidebar=$scope.userdetails.sidebar,
           $scope.formdata.status=$scope.userdetails.status
      }
      else
      {            
      }
  });
  }
    $scope.getCategoryDetails();

    /*
       * Function : updateCategory
       */
    $scope.updateCategory = function () {
     // console.log($scope.selectedExtrafieldGroup)
      //$scope.formdata.extrafieldGroup = $scope.selectedExtrafieldGroup;
      if (localStorage.getItem("currentLang") == 'en') {
      var data = {
        "category": $scope.formdata.category,
        "description": $scope.formdata.description,
        "category_url": $scope.formdata.category_url,
        "category_metadesc": $scope.formdata.desc,
        "category_metakey": $scope.formdata.key,
        "menu": $scope.formdata.dispmenu,
        "sidebar": $scope.formdata.sidebar,
        "status": $scope.formdata.status,
        "image": $scope.imgss ,
        "id" :$stateParams.id,
        "isDefaultLang" : true
      }
    } else {
       var data = {
        "category": $scope.formdata.category,
        "description": $scope.formdata.description,
        "category_url": $scope.formdata.category_url,
        "category_metadesc": $scope.formdata.desc,
        "category_metakey": $scope.formdata.key,
        "menu": $scope.formdata.dispmenu,
        "sidebar": $scope.formdata.sidebar,
        "status": $scope.formdata.status,
        "image": $scope.imgss ,
        "id" :$stateParams.id,
        "isDefaultLang" : false,
        "defaultLang":localStorage.getItem("defaultLang"),
        "userSelectedLang":localStorage.getItem("currentLang")
      }
    }
      $scope.CmsService.updateCategory(data).then(function (result) {
        if (result.statusText = "OK") {
          swal("Success!", "Successfully updated ", "success");

         $location.path('/cms/category');
          //$state.go('productpromotions');
        }
       // $location.path('/cms/category');
      })
    }

    /*
       * Function : updateCategory
       */

    $scope.deleteCategory = function () {
      $scope.CmsService.deleteCategory($stateParams.id).then(function (result) {
        $location.path('/cms/category');
      })
    }

    $scope.iconw = function () {
      document.getElementById('imgfile').click();

    }

    function readFile(ev) {

      if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          document.getElementById("imgfiles").src = e.target.result;
          //ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1] = e.target.result;
          //document.getElementById("b64").innerHTML = e.target.result;
        };
        FR.readAsDataURL(this.files[0]);
      }
    }

    if (document.getElementById("imgfile") != null) {
      document.getElementById("imgfile").addEventListener("change", readFile, false);
    }






$scope.stateChanged=function(){
  var details= $scope.userdetails1;
 
if($scope.check1){
  $scope.formdata.category = $scope.userdetails1.category;
}
else{
  $scope.formdata.category =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].category : details.category;
}

if($scope.check2){
 var defimg=[];
 defimg='/'+ $scope.userdetails1.image;
  document.getElementById("imgfiles").src =defimg;
  $scope.imgss=$scope.userdetails1.image;
}
// else{
//   $scope.imgss =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].$scope.imgss:details.image ;
// }

if($scope.check3){
  $scope.formdata.description = $scope.userdetails1.description;
}
else{
  $scope.formdata.description = $scope.currentLan in details.oLang  ?details.oLang[ $scope.currentLan].description :  details.description;
}

if($scope.check4){
  $scope.formdata.status = $scope.userdetails1.status;
}
// else{
//   $scope.content =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].content:details.content ;
// }$scope.formdata.desc=$scope.userdetails.category_metadesc,


if($scope.check5){
  $scope.formdata.desc = $scope.userdetails1.category_metadesc;
}
// else{
//   $scope.custom =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].custom :details.custom;
// }
if($scope.check6){
  $scope.formdata.key=$scope.userdetails1.category_metakey;

}
if($scope.check7){
  $scope.formdata.key=$scope.userdetails1.sidebar;

}
if($scope.check8){
  $scope.formdata.category_url=$scope.userdetails.category_url;
}
else{
  $scope.formdata.category_url = $scope.currentLan in details.oLang  ?details.oLang[ $scope.currentLan].category_url :  details.category_url;
}

}












  }
}());
