(function () {
  'use strict';
  angular
    .module('products')
    .controller('ProtaxgroupsController', ProtaxgroupsController);
    ProtaxgroupsController.$inject = ['$scope','$http','$state','$stateParams','taxgroupService'];
  function ProtaxgroupsController ($scope, $http, $state,$stateParams,taxgroupService) {
   //alert(); 
   $scope.formdata = {};

/////////////////////defaultLang//////////
 
        // $scope.formdata = {};
$scope.taxgroupService=taxgroupService;
/////////////////////defaultLang//////////
$scope.status='0';
$scope.getTaxGroup=function(){
    
    //	console.log(data);
        $scope.taxgroupService.getTaxGroup().then(function(result){
  console.log(result.data)
  $scope.alltaxgroups=result.data;
          // if(result.statusText = "OK"){
          //   swal("Success!", "Successfully added!", "success");  
          //   $state.go('taxgroups');
          // }else{
          //   swal("error!", "Already exist!", "error");
          // }
          
        })
  

}
$scope.getTaxGroup();

$scope.values1 = [{id: 'choice1'}];
//$scope.choices.length	
  // console.log($scope.choices.length);
 $scope.addNewValues = function() {
       var newItemNo1 = $scope.values1.length+1;
       $scope.values1.push({'id':'values1'+newItemNo1});
       //console.log($scope.choices.length);
 };
       
 $scope.removeValues = function(val) {
         if($scope.values1.length>1){
       $scope.values1.splice(val,1);
         }
       //console.log($scope.choices.length);
 };

///////////////////////////////////////////////////////////////////////

  $scope.openLangModel=function(id){
    
    $scope.formdata.id=id;
  }


 function getActionBtns(){


 $scope.addpage  = document.querySelectorAll(".add-action");
 $scope.addpage[0].addEventListener("click", $scope.newpage, false);

 $scope.editpage= document.querySelectorAll(".edit-action");
 $scope.editpage[0].addEventListener("click", $scope.editpages, false);

 var delpage= document.querySelectorAll(".delete-action");
 delpage[0].addEventListener("click", $scope.delpage, false);



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

    $scope.editpage[0].setAttribute("href", "/editcat/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('protaxgroupadd');
}
$scope.editpages=function(){
  
   var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
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
setTimeout(getActionBtns, 1000);
 }
}());
