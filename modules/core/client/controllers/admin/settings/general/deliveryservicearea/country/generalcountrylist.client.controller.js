(function () {
  'use strict';

  angular
    .module('core')
    .controller('Generalcountrylist', Generalcountrylist);



    Generalcountrylist.$inject = ['$scope','$http','$state','$stateParams', 'Upload','serviceAreaCountryService'];

  function Generalcountrylist ($scope, $http, $state, $stateParams, Upload,serviceAreaCountryService) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
  $scope.serviceAreaCountryService = serviceAreaCountryService;
 /////////////////////select/////////////////////////////

 ///////////////////////////////////////////////////////

 $scope.currentLan=localStorage.getItem('currentLang').toString();
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

 //////////////////////////////////////////////////////////////////////
 /*
	   * FUnction : delOrderCreation
	   * Description : delete OrderCreation By Id
	   * Owner :ck
	   */

$scope.getserviceAreaCountry = function(){
  //console.log(0);
   $scope.serviceAreaCountryService.getserviceAreaCountry().then(function(result){
    console.log(result.data);
   if(result.statusText = "OK"){
     $scope.servicecountrylist = result.data;
//console.log(1);
//console.log(result.data);
    }else{
      
    }
 });
}
$scope.getserviceAreaCountry();


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

    $scope.editpage[0].setAttribute("href", "/settings/generalcountryedit/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('generalcountryadd');
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
