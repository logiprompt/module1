(function () {
  'use strict';

  angular
    .module('core')
    .controller('Currencylist', Currencylist);



    Currencylist.$inject = ['$scope','$http','$state','$stateParams', 'Upload','currencyService','CoreService'];

  function Currencylist ($scope, $http, $state, $stateParams, Upload,currencyService,CoreService) {

  $scope.formdata = {};
   $scope.status = "0";
   $scope.username= localStorage.getItem('username');
   $scope.CoreService = CoreService;
   $scope.currencyService = currencyService;

 /////////////////////select/////////////////////////////
////////////////////////ip fetch//////////////////////////////

$http.get("https://ipinfo.io/").then(function (response) {
  $scope.ip = response.data.ip;
  
  });
 ///////////////////////////////////////////////////////

 
$scope.setasDefault=function(id){

    $http({
          url: '/api/admin/setasDefault1',
          method: "POST",
          data:{'id':id}
      })
      .then(function(response) {
        $state.reload();
              // success
      }, 
      function(response) { // optional
              // failed
      });

}

/////////////////////////////////////////////////////////////////////////

$scope.choices = [{id: 'choice1'}];
//$scope.choices.length	
 
 $scope.addNewChoice = function() {
       var newItemNo = $scope.choices.length+1;
       $scope.choices.push({'id':'choice'+newItemNo});
     
 };
       
 $scope.removeChoice = function(val) {
         if($scope.choices.length>1){
       $scope.choices.splice(val,1);
         }
      
 };
 ///////////////////list /////////////////////
 /*
	 * Function : getCurrency
	 * Description : get Currency details
	 * Owner : 
	 */

  $scope.getCurrency = function(){
    console.log(0);
    $scope.currencyService.getCurrency().then(function(result){
     if(result.statusText = "OK"){
       $scope.currencylist = result.data;
      }else{
        
      }
   });
  }
  $scope.getCurrency();
 //////////////////////////////////
/*
	 * Function : addcurrency
	 * Description : Add Currency details
	 * Owner : 
	 */
  $scope.addcurrency = function(){
		if($scope.formdata.$valid){
		var data = {
        "currency":$scope.currency,
        "shortname":$scope.shortname,
        "symbol":$scope.symbol,
        "username":$scope.username,
        "ip":$scope.ip,
				"status" :$scope.status
        }
        console.log(data);
		
		  $scope.currencyService.addcurrency(data).then(function(result){
			  if(result.statusText = "OK"){
				  swal("Success!", "Successfully added Currency!", "success");  
				  $state.go('generalcurrencylist');
			  }else{
				  swal("error!", "Currency already exist!", "error");
			  }
			  
		  })
		}
			
    }
    
    /*
	   * FUnction : delCurrency
	   * Description : delete currency by id
	   * Owner : prain
	   * 
	   */
    $scope.delCurrency = function(currencyId){
		   
		   
      swal({
              title: 'Are you sure?',
              text: "You want to delete this currency!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if(result){
              $scope.currencyService.delCurrency(currencyId).then(function(result){
              if(result.statusText = "OK"){
              swal(
                            'Deleted!',
                            'Currency has been deleted.',
                            'success'
                          )
                $scope.getCurrency();
               }else{
                 
               }
            })
            }
            })
     
    }
///////////////////////////////////////////////////////////////////////



 function getActionBtns(){


 $scope.addpage  = document.querySelectorAll(".add-action");
 $scope.addpage[0].addEventListener("click", $scope.newpage, false);

 $scope.editpage= document.querySelectorAll(".edit-action");
 $scope.editpage[0].addEventListener("click", $scope.editpages, false);

 var delpage= document.querySelectorAll(".delete-action");
 delpage[0].addEventListener("click", $scope.delpage, false);

  var bus= document.querySelectorAll(".business-action");
 bus[0].addEventListener("click", $scope.insbus, false);



 }

 $scope.insbus=function(){
  $("#myModal").modal();
 }
$scope.chkall=function(){
$scope.editpage[0].removeAttribute("href");
 
}
$scope.addchkval=function(linkid){
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
//console.log(linkid)
//console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/settings/generalcurrencyedit/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('generalcurrencyadd');
}
$scope.editpages=function(){
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
    if(checkedValue.length>0){
    console.log($scope.editpage[0].getAttribute("href"));
  if($scope.editpage[0].getAttribute("href")){
  document.location=$scope.editpage[0].getAttribute("href");
  }
}
 
}
$scope.chkValue=[];


$scope.delpage=function(){
  $scope.chkValue=[];
 
  //$state.go('addlanguage');
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
//console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
var currencyId=$scope.chkValue;
console.log(currencyId);
  swal({
    title: 'Are you sure?',
    text: "You want to delete checked items!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if(result){
    $scope.currencyService.delCheckedCurrency(currencyId).then(function(result){
    if(result.statusText = "OK"){
    swal(
                  'Deleted!',
                  'Currency has been deleted.',
                  'success'
                )
      $scope.getCurrency();
     }else{
       
     }
  })
  }
  })


 
}
setTimeout(getActionBtns, 1500);         


 }






}());
