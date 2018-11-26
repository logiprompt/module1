(function () {
  'use strict';
  angular
    .module('promotions')
    .controller('PromoshipController', PromoshipController);
  PromoshipController.$inject = ['$scope', '$http', '$state', '$stateParams', '$location', 'shippingpriceService'];
  function PromoshipController($scope, $http, $state, $stateParams, $location, shippingpriceService) {

    $scope.formdata = {};
    $scope.shippingpriceService = shippingpriceService;
    $scope.currentLan=localStorage.getItem('currentLang').toString();
    $scope.defaultLang=localStorage.getItem('defaultLang').toString();
   
    /* shipping prod rule */

    // $scope.formdata.values ='0';
    // //$scope.choices.length	
    // // console.log($scope.choices.length);
    // $scope.addNewValues = function () {
    //   var newItemNo1 = $scope.formdata.values.length + 1;
    //   $scope.formdata.values.push({ 'id': 'values' + newItemNo1 });
    //  // console.log($scope.choices.length);
    // };

    // $scope.removeValues = function (val) {
    //   if ($scope.formdata.values.length > 1) {
    //     $scope.formdata.values.splice(val, 1);
    //   }
    //   //console.log($scope.choices.length);
    // };
   
  $scope.getShippingCountryList = function () {
    //console.log(110);
    $scope.shippingpriceService.getShippingCountryList().then(function (result) {
      $scope.list=result.data;
  // console.log($scope.list);
   
    })
  }
  $scope.getShippingCountryList();

    $scope.values = [{}]; 
    $scope.addNewValuesEdit = function () { 
     
      var newItemNo1 = $scope.values.length + 1; 
     
      $scope.values.push({ 'id': 'values' + newItemNo1 }); 
      $scope.formdata.values[newItemNo1-1]='';
    };

    $scope.addNewValues = function () 
    {    
      var newItemNo1 = $scope.values.length + 1; 
      $scope.values.push({ 'id': 'values' + newItemNo1 }); 
    };

    $scope.removeValues = function (val) {
      if ($scope.values.length > 1) {
        $scope.values.splice(val, 1);
      }
    };

    //get Item List
    $scope.getShippingPriceList = function () {
      $scope.shippingpriceService.getShippingPriceList().then(function (result) {
        $scope.ShippingPriceList = result['data'];
        //console.log( $scope.ShippingPriceList);
        $scope.ShippingPriceList.forEach(function (element) {
          element.startDate = element.startDate.split("T")[0];
          element.endDate = element.endDate.split("T")[0];
        }, this);
      })
    }
    if ($stateParams.id == undefined) {
      $scope.getShippingPriceList();
    }

    //Add Shipping price rule
    $scope.AddShippingPrice = function () {
      if($scope.formData.$valid && $scope.formdata.status!=0){
     // var data=$scope.formdata;
      var data = {
        "ruleName": $scope.formdata.ruleName,
         "description": $scope.formdata.description,
        "image": $scope.imgss,
        "displayIn": $scope.formdata.displayIn,
        "startDate": $scope.formdata.startDate,
        "endDate": $scope.formdata.endDate,
        "status": $scope.formdata.status,
        "applyTo": $scope.formdata.applyTo,
        "conditions": $scope.formdata.conditions,
        "values": $scope.formdata.values,
        "conditionsStatus": $scope.formdata.conditionsStatus,
        "actionApplyTo": $scope.formdata.actionApplyTo,
        "discountAmount": $scope.formdata.discountedShippingAmount,
        "stopRuleProcess": $scope.formdata.stopRuleProcess
      }

    // console.log(data);
      $scope.shippingpriceService.addShippingPrice(data).then(function (result) {
      //  console.log(result);
        //$location.path('/promotions/shipping');
        if(result.statusText = "OK"){
				  swal("Success!", "Successfully added!", "success");  
			 $state.go('promoshipping');
			  }else{
				  swal("error!", "Already exist!", "error");
			  }
      })
    }
    }

    //Delete Shipping price rule
    $scope.deleteShippingPrice = function (itemId) {


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
        $scope.shippingpriceService.deleteShippingPrice(itemId).then(function (result) {
        if(result.statusText = "OK"){
        swal(
                      'Deleted!',
                      'Item has been deleted.',
                      'success'
                    )
                    $state.reload();
                   // $scope.getShippingPriceList();
         }else{
           
         }
      })
      }
      })
    
    }

    //get shipping price rule details
   // console.log($stateParams.id);
    $scope.getShippingPriceDetails = function (itemId) {
     // console.log(itemId);
      $scope.shippingpriceService.getShippingPriceDetails(itemId).then(function (result) {
      //  console.log(result);
      // $scope.shipping=result.data; 
        //$scope.formdata = result['data'];
       // $scope.formdata.startDate = $scope.formdata.startDate.split("T")[0];
       // $scope.formdata.endDate = $scope.formdata.endDate.split("T")[0];

       var details=result.data;
        if (result.statusText = "OK")
        {     

          $scope.status =details.status.toString();    
          $scope.userdetails1 = result.data; 
          if(angular.equals($scope.currentLan, $scope.defaultLang))
          {
            $scope.userdetails = result.data;
            $scope.formdata.ruleName = $scope.userdetails.ruleName;
            $scope.formdata.description = $scope.userdetails.description;
          }
          else
          {           
            $scope.userdetails = result.data;
            $scope.formdata.ruleName =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].ruleName : details.ruleName;
            $scope.formdata.description = $scope.currentLan in details.oLang  ?details.oLang[ $scope.currentLan].description :  details.description;
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
        $scope.formdata.conditionsStatus = $scope.userdetails.conditionsStatus;
          $scope.values = $scope.userdetails.values;  
       // $scope.vallen=$scope.values.length;
       // for(var i=1;i<=$scope.vallen;$i++){
        $scope.formdata.values= $scope.userdetails.values; 
       // console.log($scope.formdata.values[i]);
        //}
        
        }
          else
          {            
          }




      })
    }
    if ($stateParams.id != undefined) {
      $scope.getShippingPriceDetails($stateParams.id);
    }

    $scope.updateShippingPriceRule = function(){
     // console.log(436);
      if($scope.formData.$valid && $scope.formdata.status!=0){
        // var data=$scope.formdata;
     //  console.log(657);
     if (localStorage.getItem("currentLang") == 'en') {
         var data = {
           "ruleName": $scope.formdata.ruleName,
            "description": $scope.formdata.description,
           "image": $scope.imgss,
           "displayIn": $scope.formdata.displayIn,
           "startDate": $scope.formdata.startDate,
           "endDate": $scope.formdata.endDate,
           "status": $scope.formdata.status,
           "applyTo": $scope.formdata.applyTo,
           "conditions": $scope.formdata.conditions,
           "values": $scope.formdata.values,
           "conditionsStatus": $scope.formdata.conditionsStatus,
           "actionApplyTo": $scope.formdata.actionApplyTo,
           "discountAmount": $scope.formdata.discountAmount,
           "stopRuleProcess": $scope.formdata.stopRuleProcess,
           "id":$stateParams.id,
           "isDefaultLang" : true
         }
        }
        else{

          var data = {
            "ruleName": $scope.formdata.ruleName,
             "description": $scope.formdata.description,
            "image": $scope.imgss,
            "displayIn": $scope.formdata.displayIn,
            "startDate": $scope.formdata.startDate,
            "endDate": $scope.formdata.endDate,
            "status": $scope.formdata.status,
            "applyTo": $scope.formdata.applyTo,
            "conditions": $scope.formdata.conditions,
            "values": $scope.formdata.values,
            "conditionsStatus": $scope.formdata.conditionsStatus,
            "actionApplyTo": $scope.formdata.actionApplyTo,
            "discountAmount": $scope.formdata.discountAmount,
            "stopRuleProcess": $scope.formdata.stopRuleProcess,
            "id":$stateParams.id,
            "isDefaultLang" : false,
            "defaultLang":localStorage.getItem("defaultLang"),
            "userSelectedLang":localStorage.getItem("currentLang")
          }

        }
       //  console.log(data);

      $scope.shippingpriceService.updateShippingPriceRule(data).then(function (result) {
       // console.log(result);
        if (result.statusText = "OK") {
          swal("Success!", "Successfully updated ", "success");
         // $scope.getShippingPriceList();
          $state.go('promoshipping');
        }
       // $location.path('/promotions/shipping');
      })
    }
    }


    /* shipping prod rule */





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
      //console.log(linkid)
     // console.log(checkedValue[0])
      if (checkedValue.length > 1) {
        $scope.editpage[0].removeAttribute("href");
      }
      else {

        $scope.editpage[0].setAttribute("href", "/promotions/editshipping/" + linkid);
      }

    }
    $scope.chk = {};

    $scope.newpage = function () {
      $state.go('promoaddshipping');
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
     // console.log(checkedValue)
      for (var i = 0; i < checkedValue.length; i++) {
        $scope.chkValue.push(checkedValue[i].value);
      }

      var itemId=$scope.chkValue;
     // console.log(itemId);
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
          $scope.shippingpriceService.delChecked(itemId).then(function(result){
          if(result.statusText = "OK"){
          swal(
                        'Deleted!',
                        'Items have been deleted.',
                        'success'
                      )
                      $state.reload();
           // $scope.getShippingPriceList();
           }else{
             
           }
        })
        }
        })
      

    }
    setTimeout(getActionBtns, 2000);



    $scope.stateChanged=function(){
      var details= $scope.userdetails1;
     
    if($scope.check1){
      $scope.formdata.ruleName = $scope.userdetails1.ruleName;
    }
    else{
      $scope.formdata.ruleName =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].ruleName : details.ruleName;
    
    }
    
    if($scope.check2){
      $scope.formdata.description = $scope.userdetails1.description;
    }
    else{
      $scope.formdata.description = $scope.currentLan in details.oLang  ?details.oLang[ $scope.currentLan].description :  details.description;
    
    }
    
    if($scope.check3){
    
      console.log($scope.userdetails1);
     var defimg=[];
     defimg='/'+ $scope.userdetails1.image;
      document.getElementById("imgfiles").src =defimg;
      $scope.imgss=$scope.userdetails1.image;
    
    }
    else{
      $scope.imgss =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].$scope.imgss:details.image ;
    }
    
    
    
    
    if($scope.check4){
          $scope.custom = $scope.userdetails.custom;
    
    }
    else{
      $scope.custom =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].custom :details.custom;
    
    }
    if($scope.check5){
      $scope.status =details.status.toString(); 
    
    }
    else{
    //$scope.status =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].status :details.status;
    
    }
    
    }


    function readFile(ev) {

      if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          document.getElementById("imgfiles").src = e.target.result;
         // ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1] = e.target.result;
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
