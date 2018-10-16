(function () {
  'use strict';

  angular
    .module('core')
    .controller('Currencyedit', Currencyedit);



    Currencyedit.$inject = ['$scope','$http','$state','$stateParams', 'Upload','currencyService','CoreService'];

  function Currencyedit ($scope, $http, $state, $stateParams, Upload,currencyService,CoreService) {

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

  $scope.getCurrencyById = function(currencyId){
    console.log(0);
    $scope.currencyService.getCurrencyById(currencyId).then(function(result){
     if(result.statusText = "OK"){
       $scope.currencyid = result.data;
$scope.currency = $scope.currencyid.currency;
       $scope.shortname = $scope.currencyid.shortname;
$scope.symbol = $scope.currencyid.symbol;
$scope.status = $scope.currencyid.status;
      //  $scope.extrafieldGroup = result.data;
			// 	   $scope.groupName = $scope.extrafieldGroup.groupname;
      //      $scope.status = $scope.extrafieldGroup.status.toString();
           


console.log(1);
console.log(result);
      }else{
        
      }
   });
  }
  $scope.getCurrencyById($stateParams.id);
 //////////////////////////////////
  /*
	 *
   *  Function : update currency
	 * Description : Update Currency details
	 * Owner : jeeja
   * 
	 */

      $scope.updateCurrency = function(){
        if($scope.formdata.$valid){
       var data = {		  			 
            "currency":$scope.currency,
            "shortname":$scope.shortname,
            "symbol":$scope.symbol,
            "status" :$scope.status
            }
       
        $scope.currencyService.updateCurrency($stateParams.id,data).then(function(result){
          if(result.statusText = "OK"){
            swal("Sccess!", "Successfully updated Extra Field Group!", "success"); 
            $state.go('generalcurrencylist');
           }
        });
      }
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
console.log(linkid)
console.log(checkedValue[0])
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
console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
 
}
setTimeout(getActionBtns, 1500);         


 }






}());
