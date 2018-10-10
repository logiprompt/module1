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
	  	if($stateParams.groupid){
	  		$scope.getExtraFieldGroupById($stateParams.groupid);
	  	}
	  	
	  	
	  	
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
	    * function : get all extrafields bu group id
	    * Description : list all extrafields by group
	    * owner : prabin
	    */
	   $scope.getExtrafields = function(groupId){
		   $scope.extrafieldService.getExtraField(groupId).then(function(result){
			   if(result.statusText = "OK"){
				   $scope.extrafields = result.data;				   
				   
				  }else{
					  
				  }
		   });
	   }
	   if($stateParams.groupid){
		   $scope.getExtrafields($stateParams.groupid);
	   }
	   
	   
	   /*
	    * Function: addExtrafield_extrafield
	    * Desvription : Add Extra field TEXT BOX textarea etc
	    * Owner : prabin
	    */
	   $scope.addExtrafield_extrafield = function(type){
		   var extrafieldObj = {};
		   
		   if($scope.extrafieldform_extrafield.$valid){
			   //console.log($scope.extrafieldform_textbox);
			   extrafieldObj.groupid = $stateParams.groupid ;
			   extrafieldObj.status = $scope.extrafield_status ? $scope.extrafield_status : '';
			   extrafieldObj.name = $scope.extrafield_name;
			   extrafieldObj.label = $scope.extrafield_label;
			   extrafieldObj.size = $scope.extrafield_size ? $scope.extrafield_size : '';
			   extrafieldObj.classname = $scope.extrafield_class ? $scope.extrafield_class : '';
			   extrafieldObj.style = $scope.extrafield_style ? $scope.extrafield_style :'';
			   extrafieldObj.defvalue = $scope.extrafield_defvalue ? $scope.extrafield_defvalue : '';
			   extrafieldObj.type = $scope.extrafield_type ? $scope.extrafield_type : type;
			   extrafieldObj.FEvisibility = $scope.extrafield_FEvisibility ? $scope.extrafield_FEvisibility : '';
			   extrafieldObj.position = $scope.extrafield_position ? $scope.extrafield_position : '';
			   extrafieldObj.required = $scope.extrafield_required ? $scope.extrafield_required : '';
			   extrafieldObj.required = $scope.extrafield_cols;
			   extrafieldObj.required = $scope.extrafield_rows;
			   extrafieldObj.values = $scope.values;
			   
			   $scope.extrafieldService.createExtraField(extrafieldObj).then(function(result){
				   if(result.statusText = "OK"){
	      				 swal( 'Created!',
	      	                     'New field created.',
	      	                     'success'
	      	                   )
	      	                   
	      	                   //clear form 
	      	            $scope.extrafield_label = '';
	      				$scope.extrafield_name = '';
	      				$scope.extrafield_size = '';
	      				$scope.extrafield_class = '';
	      				$scope.extrafield_style = '';
	      				$scope.extrafield_defvalue = '';
	      				$scope.extrafield_type = '';
	      				$scope.extrafield_FEvisibility = '';
	      				$scope.extrafield_position = '';
	      				$scope.extrafield_status = '';
	      				$scope.extrafield_required = '';
	      				$scope.extrafield_cols = '';
	      				$scope.extrafield_rows = '';
	      				 $scope.values = [{id: '1'}];
	      				$scope.extrafieldform_extrafield.$submitted = false;
	      	                   
	      				   $scope.getExtrafields($stateParams.groupid);
	      				 $('.nav-link.tcat').click();
	      				  }else{
	      					swal( 'error!',
		      	                   'Error while creating new field ! Please try again later.',
		      	                   'error'
		      	                )
	      				  }
			   })
		   }
	   }
	   
	   /*
	    * Function : delete field
	    * description : deleted field from group
	    * Owner : prabin
	    */
	   
	   $scope.deleteField = function(fieldid){
		   
		   swal({
               title: 'Are you sure?',
               text: "You want to delete this field!",
               type: 'warning',
               showCancelButton: false,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes, delete it!'
             }).then((result) => {
            	 if(result){
            	 $scope.extrafieldService.deleteExtraField(fieldid).then(function(result){
      			   if(result.statusText = "OK"){
      				 swal(
      	                     'Deleted!',
      	                     'Field has been deleted.',
      	                     'success'
      	                   )
      	                 $scope.getExtrafields($stateParams.groupid);
      				  }else{
      					  
      				  }
      		   })
             }
             })
	   }
/////////////////////defaultLang//////////
  
$scope.formdata.catlang='0';
$scope.formdata.extra='0';

$scope.values = [{id: '1'}];
//$scope.choices.length	
  // console.log($scope.choices.length);
 $scope.addNewChoice = function() {
       var newItemNo = $scope.values.length+1;
       $scope.values.push({'id':newItemNo});
       //console.log($scope.choices.length);
 };
       
 $scope.removeChoice = function(val) {
         if($scope.values.length>1){
       $scope.values.splice(val,1);
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
