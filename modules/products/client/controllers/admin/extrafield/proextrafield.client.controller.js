(function () {
  'use strict';
  angular
    .module('core')
    .controller('ProextrafieldController', ProextrafieldController);
    ProextrafieldController.$inject = ['$scope','$http','$state','$stateParams','ProductsService','extrafieldService'];
  function ProextrafieldController ($scope, $http, $state, $stateParams, ProductsService, extrafieldService) {
   //alert(); 
	  $scope.formdata = {};
   $scope.textfieldform = {};
   $scope.extrafieldService = extrafieldService;
   
  
   /*
    * Function : getExtraFieldGroups
    * description : Get all extra field groups
    * Owner : Prabin
    */
   	$scope.getExtraFieldGroup = function(){
   		$scope.extrafieldService.getExtraFieldGroup().then(function(result){
 		   if(result.statusText = "OK"){
 			   $scope.extrafieldGroups = result.data;
 			  }else{
 				  
 			  }
 	   });
   	}
   	$scope.getExtraFieldGroup();
   	
   	/*
	   * Function : getExtraFieldGroupById
	   * description : Get one extra field group by groupid
	   * Owner : Prabin
	   */
	  	$scope.getExtraFieldGroupById = function(groupId){
	  		$scope.extrafieldService.getExtraFieldGroupById(groupId).then(function(result){
			   if(result.statusText = "OK"){
				   $scope.extrafieldGroup = result.data;
				   $scope.groupName = $scope.extrafieldGroup.groupname;
				   $scope.status = $scope.extrafieldGroup.status.toString();
				   
				  }else{
					  
				  }
		   });
	  	}
	  	$scope.getExtraFieldGroupById($stateParams.id);
	  	
	  	
	  /*
	   * FUnction : deleteExtraFieldGroup
	   * Description : delete extra field group by id
	   * Owner : prain
	   * 
	   */
	   $scope.deleteExtraFieldGroup = function(groupId){
		   
		   
		   swal({
               title: 'Are you sure?',
               text: "You want to delete this Extrafield Group!",
               type: 'warning',
               showCancelButton: false,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
             }).then((result) => {
            	 if(result){
            	 $scope.extrafieldService.deleteExtraFieldGroup(groupId).then(function(result){
      			   if(result.statusText = "OK"){
      				 swal(
      	                     'Deleted!',
      	                     'Group name has been deleted.',
      	                     'success'
      	                   )
      				   $scope.getExtraFieldGroup();
      				  }else{
      					  
      				  }
      		   })
             }
             })
		  
	   }
	   
	   
	   /*
	    * Function: addExtrafield_textbox
	    * Desvription : Add Extra field TEXT BOX
	    * Owner : prabin
	    */
	   $scope.addExtrafield_textbox = function(){
		   
	   }
	   
/////////////////////defaultLang//////////
  
$scope.formdata.catlang='0';
$scope.formdata.extra='0';

$scope.values = [{id: 'choice1'}];
//$scope.choices.length	
  // console.log($scope.choices.length);
 $scope.addNewChoice = function() {
       var newItemNo = $scope.values.length+1;
       $scope.values.push({'id':'values'+newItemNo});
       //console.log($scope.choices.length);
 };
       
 $scope.removeChoice = function(val) {
         if($scope.values.length>1){
       $scope.values.splice(val,1);
         }
       //console.log($scope.choices.length);
 };

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

$scope.values2 = [{id: 'choice1'}];
//$scope.choices.length	
  // console.log($scope.choices.length);
 $scope.addNewSltlist = function() {
       var newItemNo2 = $scope.values2.length+1;
       $scope.values2.push({'id':'values2'+newItemNo2});
       //console.log($scope.choices.length);
 };
       
 $scope.removeSltlist = function(val) {
         if($scope.values2.length>1){
       $scope.values2.splice(val,1);
         }
       //console.log($scope.choices.length);
 };

$scope.values3 = [{id: 'choice1'}];
//$scope.choices.length	
  // console.log($scope.choices.length);
 $scope.addNewCheck = function() {
       var newItemNo3 = $scope.values3.length+1;
       $scope.values3.push({'id':'values3'+newItemNo3});
       //console.log($scope.choices.length);
 };
       
 $scope.removeCheck = function(val) {
         if($scope.values3.length>1){
       $scope.values3.splice(val,1);
         }
       //console.log($scope.choices.length);
 };
 
 



  
        $scope.rmerrorclass=function(){
                angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
                angular.element(document.querySelectorAll('.tabvalidationErr')).removeClass('tabvalidationErr');
                }
                $scope.adderrorclass=function(cls){
                angular.element(document.querySelector(cls)).addClass('validationErr');
                }
                $scope.taberrorclass=function(cls){
                  angular.element(document.querySelector(cls)).addClass('tabvalidationErr');
                  }

                $scope.validation=function(){
                var error=0;
                $scope.rmerrorclass();
                  if($scope.formdata.category=='' || angular.isUndefined($scope.formdata.category) ){
                    $scope.adderrorclass(".cat");
                    $scope.taberrorclass(".tcat");
                    error=1;
                    }

                    return error;          
            }


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

    $scope.editpage[0].setAttribute("href", "/product/editextrafield/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('progroupadd');
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
