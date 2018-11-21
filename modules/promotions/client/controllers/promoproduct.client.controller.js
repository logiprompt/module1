(function () {
  'use strict';
  angular
    .module('promotions')
    .controller('PromoproductController', PromoproductController);
  PromoproductController.$inject = ['$scope', '$http', '$state', '$stateParams', '$location', 'productcategoryService', 'productpriceService'];
  function PromoproductController($scope, $http, $state, $stateParams, $location, productcategoryService, productpriceService) {
    $scope.formdata = {}; 
    $scope.formData = {};
    $scope.productcategoryService = productcategoryService;
    $scope.productpriceService = productpriceService;

    /******** Product price rule - arun */

    $scope.getProductPriceList = function () 
    {
      $scope.productpriceService.getProductPriceList().then(function (result) 
      {
        $scope.productPriceList = result['data']
        console.log($scope.productPriceList);
        $scope.productPriceList.forEach(function (element) 
        {
          element.startDate = element.startDate.split("T")[0];
          element.endDate = element.endDate.split("T")[0];
        }, this);
      })
    }

    if ($stateParams.id == undefined)
    {
       $scope.getProductPriceList();
    }
/////////////////////////////////////////////////////////////////////////////////////////

$scope.currentLan=localStorage.getItem('currentLang').toString();
$scope.defaultLang=localStorage.getItem('defaultLang').toString();
  $scope.getProductPriceDetails = function(userId)
  {
      $scope.productpriceService.getProductPriceDetails(userId).then(function(result)
      {
        var details=result.data;
        if (result.statusText = "OK")
        {     
          $scope.status =details.status.toString();    
          if(angular.equals($scope.currentLan, $scope.defaultLang))
          {
            $scope.userdetails = result.data;
            $scope.formdata.ruleName = $scope.userdetails.ruleName;
            $scope.formdata.description = $scope.userdetails.description;
          }
          else
          {           
            $scope.userdetails = result.data;
            $scope.ruleName =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].ruleName : details.ruleName;
            $scope.subject = $scope.currentLan in details.oLang  ?details.oLang[ $scope.currentLan].subject :  details.subject;
          }

        $scope.formdata.startDate = $scope.userdetails.startDate;
        $scope.formdata.endDate = $scope.userdetails.endDate;
        $scope.formdata.status = $scope.userdetails.status;
        $scope.formdata.applyTo = $scope.userdetails.applyTo;
        $scope.formdata.conditions = $scope.userdetails.conditions;
        $scope.formdata.actionApplyTo = $scope.userdetails.actionApplyTo;
        $scope.formdata.discountAmount = $scope.userdetails.discountAmount;
        $scope.formdata.stopRuleProcess = $scope.userdetails.stopRuleProcess;
        $scope.formdata.displayIn = $scope.userdetails.displayIn;
        $scope.formdata.actionApplyTo = $scope.userdetails.actionApplyTo;  


        }
          else
          {            
          }
      });
  }
  if ($stateParams.id != undefined)
  {
  $scope.getProductPriceDetails($stateParams.id);
  }

    //////////////////////////////////////////////////////////////////////////

    // $scope.getCategoryItems = function () 
    // {
    //   $scope.productpriceService.getProductPriceDetails().then(function (result) 
    //   {
    //     console.log(result);
    //     $scope.categoryItems = result['data'];
    //     $scope.categoryItems.forEach(function (element) 
    //     {
    //       element.created = element.created.split("T")[0];
    //     }, this);
    //   })
    // }
    // $scope.getCategoryItems();

    $scope.cancel = function () 
    {  
    }

    $scope.AddProductPrice = function () 
    {
      if($scope.formData.$valid)
      {     
        var data = {
                      "ruleName": $scope.formdata.ruleName,
                      "description": $scope.formdata.description,
                      "startDate": $scope.formdata.startDate,
                      "endDate": $scope.formdata.endDate,
                      "status": $scope.formdata.status,
                      "applyTo": $scope.formdata.applyTo,
                      "conditions": $scope.formdata.conditions,
                      "actionApplyTo": $scope.formdata.actionApplyTo,
                      "discountAmount": $scope.formdata.discountAmount,
                      "stopRuleProcess": $scope.formdata.stopRuleProcess,
                      "displayIn": $scope.formdata.displayIn,
                      "image": $scope.imgss   
                    }
        $scope.productpriceService.addProductPrice(data).then(function (result) 
        {
            if(result.statusText = "OK")
            {
                  swal('Success!','Successfully added.', 'success')
                  //$state.go('productpromotions');
            }
            else
            {}
        })
      }
    }

    $scope.updateProductPrice = function(){
      console.log(2345);
      if($scope.formData.$valid && $scope.formdata.status!=0){
        // var data=$scope.formdata;
        if (localStorage.getItem("currentLang") == 'en') {
        var data = {
          "ruleName": $scope.formdata.ruleName,
          "description": $scope.formdata.description,
          "startDate": $scope.formdata.startDate,
          "endDate": $scope.formdata.endDate,
          "status": $scope.formdata.status,
          "applyTo": $scope.formdata.applyTo,
          "conditions": $scope.formdata.conditions,
          "actionApplyTo": $scope.formdata.actionApplyTo,
          "discountAmount": $scope.formdata.discountAmount,
          "stopRuleProcess": $scope.formdata.stopRuleProcess,
          "displayIn": $scope.formdata.displayIn,
          "image": $scope.imgss,
           "id":$stateParams.id,
           "isDefaultLang" : true,
         }
        }
        else {
          var data = {
            "ruleName": $scope.formdata.ruleName,
          "description": $scope.formdata.description,
          "startDate": $scope.formdata.startDate,
          "endDate": $scope.formdata.endDate,
          "status": $scope.formdata.status,
          "applyTo": $scope.formdata.applyTo,
          "conditions": $scope.formdata.conditions,
          "actionApplyTo": $scope.formdata.actionApplyTo,
          "discountAmount": $scope.formdata.discountAmount,
          "stopRuleProcess": $scope.formdata.stopRuleProcess,
          "displayIn": $scope.formdata.displayIn,
          "image": $scope.imgss,
           "id":$stateParams.id,
            "isDefaultLang" : false,
            "defaultLang":localStorage.getItem("defaultLang"),
            "userSelectedLang":localStorage.getItem("currentLang")
          };
        }
console.log(data);
      $scope.productpriceService.updateProductPrice(data).then(function (result) {

        console.log(result);
        if (result.statusText = "OK") {
          swal("Success!", "Successfully updated ", "success");

          //$scope.getShippingPriceList();
          // $state.go('emailcmsratingaction');
        }
       // $location.path('/promotions/shipping');
      })
    }
    }


    $scope.deleteProductPrice = function (itemId) 
    {
      swal({
        title: 'Are you sure?',
        text: "You want to delete this item!",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if(result){
        $scope.productpriceService.deleteProductPrice(itemId).then(function (result) {
        if(result.statusText = "OK"){
        swal(
                      'Deleted!',
                      'Item has been deleted.',
                      'success'
                    )
                    $scope.getProductPriceList();
         }else{
           
         }
      })
      }
      })
    
    }



    // $scope.deleteProductPrice = function (itemId) {

    //   $scope.productpriceService.deleteProductPrice(itemId).then(function (result) {
    //     $scope.getProductPriceList();
    //   })
    // }


    /******** Product price rule ends- */





    /////////////////////defaultLang//////////
    // $http({
    //   url: '/api/admin/getdefaultLang',
    //   method: "POST",
    // })
    //   .then(function (response) {

    //     $scope.formdata.defaultlang = response.data.data;

    //   },
    //   function (response) { // optional
    //     // failed
    //   });
    // $scope.formdata.sale = '1';
    // $scope.formdata.con = '1';
    // $scope.formdata.status = '0';
    // $http({
    //   url: '/api/admin/getallLanguages',
    //   method: "POST",

    // })
    //   .then(function (response) 
    //   {
    //     $scope.listlang = response.data.data;
    //   },
    //   function (response) { // optional
    //     // failed
    //   });


    // $scope.values1 = [{ id: 'choice1' }];
    // //$scope.choices.length	
    // // console.log($scope.choices.length);
    // $scope.addNewValues = function () {
    //   var newItemNo1 = $scope.values1.length + 1;
    //   $scope.values1.push({ 'id': 'values1' + newItemNo1 });
    //   //console.log($scope.choices.length);
    // };

    // $scope.removeValues = function (val) {
    //   if ($scope.values1.length > 1) {
    //     $scope.values1.splice(val, 1);
    //   }
    //   //console.log($scope.choices.length);
    // };

    /////////////////////select/////////////////////////////


    ///////////////////////insert////////////////////////////
    // $scope.insCategory = function () {
    //   if ($scope.validation() == 0) {
    //     $http({
    //       url: '/api/admin/insCategory',
    //       method: "POST",
    //       data: $scope.formdata
    //     })
    //       .then(function (response) {
    //         $state.reload();
    //         // success
    //       },
    //       function (response) { // optional
    //         // failed
    //       });
    //   }
    // }



    // $scope.del = function (id) {
    //   var val = { 'id': id };
    //   $http({
    //     url: '/api/admin/delcate',
    //     method: "POST",
    //     data: val
    //   })
    //     .then(function (response) {
    //       $state.reload();
    //     },
    //     function (response) { // optional
    //       // failed
    //     });
    // }
    // $scope.rmerrorclass = function () {
    //   angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
    //   angular.element(document.querySelectorAll('.tabvalidationErr')).removeClass('tabvalidationErr');
    // }
    // $scope.adderrorclass = function (cls) {
    //   angular.element(document.querySelector(cls)).addClass('validationErr');
    // }
    // $scope.taberrorclass = function (cls) {
    //   angular.element(document.querySelector(cls)).addClass('tabvalidationErr');
    // }

    // $scope.validation = function () {
    //   var error = 0;
    //   $scope.rmerrorclass();
    //   if ($scope.formdata.category == '' || angular.isUndefined($scope.formdata.category)) {
    //     $scope.adderrorclass(".cat");
    //     $scope.taberrorclass(".tcat");
    //     error = 1;
    //   }

    //   return error;
    // }

    ///////////////////////////////////////////////////////////////////////
    // $scope.addCategory = function () {


    //   $http({
    //     url: '/api/admin/addCategory',
    //     method: "POST",
    //     data: $scope.formdata
    //   })
    //     .then(function (response) {

    //       // success
    //     },
    //     function (response) { // optional
    //       // failed
    //     });
    // }
    // $scope.validation2 = function () {
    //   var error = 0;
    //   $scope.rmerrorclass();
    //   if ($scope.formdata.categorylang == '' || angular.isUndefined($scope.formdata.categorylang)) {
    //     $scope.adderrorclass(".categorylang");
    //     error = 1;
    //   }
    //   if ($scope.formdata.catlang == '0' || angular.isUndefined($scope.formdata.catlang)) {
    //     $scope.adderrorclass(".catlang");
    //     error = 1;
    //   }
    //   return error;
    // }
    // $scope.openLangModel = function (id) {

    //   $scope.formdata.id = id;
    // }
    // $scope.insCategoryLang = function () 
    // {
    //   if ($scope.validation2() == 0) 
    //   {
    //     $('#myModal').modal('hide');
    //     $http({
    //       url: '/api/admin/insCategoryLang',
    //       method: "POST",
    //       data: $scope.formdata
    //     })
    //       .then(function (response) {
    //         $state.reload();
    //         // success
    //       },
    //       function (response) { // optional
    //         // failed
    //       });
    //   }
    // }

    function getActionBtns() 
    {

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

        $scope.editpage[0].setAttribute("href", "/promotions/editproductprice/" + linkid);
      }

    }
    $scope.chk = {};

    $scope.newpage = function () {
      $state.go('promoaddproduct');
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
      console.log(checkedValue)
      for (var i = 0; i < checkedValue.length; i++) {
        $scope.chkValue.push(checkedValue[i].value);
      }

 var itemId=$scope.chkValue;
     console.log(itemId);
        swal({
          title: 'Are you sure?',
          text: "You want to delete checked items!",
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if(result){
          $scope.productpriceService.delChecked(itemId).then(function(result){
          if(result.statusText = "OK"){
          swal(
                        'Deleted!',
                        'Items have been deleted.',
                        'success'
                      )
            $scope.getProductPriceList();
           }else{
             
           }
        })
        }
        })

    }
    setTimeout(getActionBtns, 2000);




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


  }
}());
