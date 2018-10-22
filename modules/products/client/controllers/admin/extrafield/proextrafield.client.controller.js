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
   $scope.editExtrafield = false;
   
  
   /*
    * Function : getExtraFieldGroups
    * description : Get all extra field groups
    * Owner : Prabin
    */
   	$scope.getExtraFieldGroup = function(){
   		$scope.extrafieldService.getExtraFieldGroup().then(function(result){
 		   if(result.statusText = "OK"){
 			   $scope.extrafieldGroups = result.data;
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
				   $scope.groupid = groupId;
				   
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
		   extrafieldObj.olang = [];
		   
		   
			   if(type == 'textarea'){
				   if($scope.extrafieldform_ta_extrafield.$valid){
				   extrafieldObj.groupid = $stateParams.groupid ;
				   extrafieldObj.status = $scope.extrafield_ta_status ? $scope.extrafield_ta_status : '';
				   extrafieldObj.name = $scope.extrafield_ta_name;
				   extrafieldObj.label = $scope.extrafield_ta_label;
				   extrafieldObj.size = $scope.extrafield_ta_size ? $scope.extrafield_ta_size : '';
				   extrafieldObj.classname = $scope.extrafield_ta_class ? $scope.extrafield_ta_class : '';
				   extrafieldObj.style = $scope.extrafield_ta_style ? $scope.extrafield_ta_style :'';
				   extrafieldObj.defvalue = $scope.extrafield_ta_defvalue ? $scope.extrafield_ta_defvalue : '';
				   extrafieldObj.type = $scope.extrafield_ta_type ? $scope.extrafield_ta_type : type;
				   extrafieldObj.FEvisibility = $scope.extrafield_ta_FEvisibility ? $scope.extrafield_ta_FEvisibility : '';
				   extrafieldObj.position = $scope.extrafield_ta_position ? $scope.extrafield_ta_position : '';
				   extrafieldObj.required = $scope.extrafield_ta_required ? $scope.extrafield_ta_required : '';
				   extrafieldObj.cols = $scope.extrafield_ta_cols;
				   extrafieldObj.rows = $scope.extrafield_ta_rows;
				   extrafieldObj.values = $scope.values;

				   var eng = {
						   'name' : $scope.extrafield_ta_name,
						   'label' : $scope.extrafield_ta_label,
						   'values' : $scope.values
					   };
				   extrafieldObj.olang.en =  eng  ;
				   
				   }
			   }else if(type == 'radio'){
				   if($scope.extrafieldform_ra_extrafield.$valid){
				   extrafieldObj.groupid = $stateParams.groupid ;
				   extrafieldObj.status = $scope.extrafield_ra_status ? $scope.extrafield_ra_status : '';
				   extrafieldObj.name = $scope.extrafield_ra_name;
				   extrafieldObj.label = $scope.extrafield_ra_label;
				   extrafieldObj.size = $scope.extrafield_ra_size ? $scope.extrafield_ra_size : '';
				   extrafieldObj.classname = $scope.extrafield_ra_class ? $scope.extrafield_ra_class : '';
				   extrafieldObj.style = $scope.extrafield_ra_style ? $scope.extrafield_ra_style :'';
				   extrafieldObj.defvalue = $scope.extrafield_ra_defvalue ? $scope.extrafield_ra_defvalue : '';
				   extrafieldObj.type = $scope.extrafield_ra_type ? $scope.extrafield_ra_type : type;
				   extrafieldObj.FEvisibility = $scope.extrafield_ra_FEvisibility ? $scope.extrafield_ra_FEvisibility : '';
				   extrafieldObj.position = $scope.extrafield_ra_position ? $scope.extrafield_ra_position : '';
				   extrafieldObj.required = $scope.extrafield_ra_required ? $scope.extrafield_ra_required : '';

				   extrafieldObj.values = $scope.values;
				   
				   var eng = {
						   'name' : $scope.extrafield_ra_name,
						   'label' : $scope.extrafield_ra_label,
						   'values' : $scope.values
					   };
				   extrafieldObj.olang.en =  eng  ;
				   }
			   }else if(type == 'checkbox'){
				   if($scope.extrafieldform_cb_extrafield.$valid){
				   extrafieldObj.groupid = $stateParams.groupid ;
				   extrafieldObj.status = $scope.extrafield_cb_status ? $scope.extrafield_cb_status : '';
				   extrafieldObj.name = $scope.extrafield_cb_name;
				   extrafieldObj.label = $scope.extrafield_cb_label;
				   extrafieldObj.size = $scope.extrafield_cb_size ? $scope.extrafield_cb_size : '';
				   extrafieldObj.classname = $scope.extrafield_cb_class ? $scope.extrafield_cb_class : '';
				   extrafieldObj.style = $scope.extrafield_cb_style ? $scope.extrafield_cb_style :'';
				   extrafieldObj.defvalue = $scope.extrafield_cb_defvalue ? $scope.extrafield_cb_defvalue : '';
				   extrafieldObj.type = $scope.extrafield_cb_type ? $scope.extrafield_cb_type : type;
				   extrafieldObj.FEvisibility = $scope.extrafield_cb_FEvisibility ? $scope.extrafield_cb_FEvisibility : '';
				   extrafieldObj.position = $scope.extrafield_cb_position ? $scope.extrafield_cb_position : '';
				   extrafieldObj.required = $scope.extrafield_cb_required ? $scope.extrafield_cb_required : '';
				   extrafieldObj.values = $scope.values;
				   
				   var eng = {
						   'name' : $scope.extrafield_cb_name,
						   'label' : $scope.extrafield_cb_label,
						   'values' : $scope.values
					   };
				   extrafieldObj.olang.en =  eng  ;
				   }
			   }else if(type == 'dropdown'){
				   if($scope.extrafieldform_dd_extrafield.$valid){
				   extrafieldObj.groupid = $stateParams.groupid ;
				   extrafieldObj.status = $scope.extrafield_dd_status ? $scope.extrafield_dd_status : '';
				   extrafieldObj.name = $scope.extrafield_dd_name;
				   extrafieldObj.label = $scope.extrafield_dd_label;
				   extrafieldObj.size = $scope.extrafield_dd_size ? $scope.extrafield_dd_size : '';
				   extrafieldObj.classname = $scope.extrafield_dd_class ? $scope.extrafield_dd_class : '';
				   extrafieldObj.style = $scope.extrafield_dd_style ? $scope.extrafield_dd_style :'';
				   extrafieldObj.defvalue = $scope.extrafield_dd_defvalue ? $scope.extrafield_dd_defvalue : '';
				   extrafieldObj.type = $scope.extrafield_dd_type ? $scope.extrafield_dd_type : type;
				   extrafieldObj.FEvisibility = $scope.extrafield_dd_FEvisibility ? $scope.extrafield_dd_FEvisibility : '';
				   extrafieldObj.position = $scope.extrafield_dd_position ? $scope.extrafield_dd_position : '';
				   extrafieldObj.required = $scope.extrafield_dd_required ? $scope.extrafield_dd_required : '';
				   extrafieldObj.cols = $scope.extrafield_dd_cols;
				   extrafieldObj.rows = $scope.extrafield_dd_rows;
				   extrafieldObj.values = $scope.values;
				   var eng = {
						   'name' : $scope.extrafield_dd_name,
						   'label' : $scope.extrafield_dd_label,
						   'values' : $scope.values
					   };
				   extrafieldObj.olang.en =  eng  ;
				   }
			   }else {
				   if($scope.extrafieldform_tb_extrafield.$valid){
				   extrafieldObj.groupid = $stateParams.groupid ;
				   extrafieldObj.status = $scope.extrafield_tb_status ? $scope.extrafield_tb_status : '';
				   extrafieldObj.name = $scope.extrafield_tb_name;
				   extrafieldObj.label = $scope.extrafield_tb_label;
				   extrafieldObj.size = $scope.extrafield_tb_size ? $scope.extrafield_tb_size : '';
				   extrafieldObj.classname = $scope.extrafield_tb_class ? $scope.extrafield_tb_class : '';
				   extrafieldObj.style = $scope.extrafield_tb_style ? $scope.extrafield_tb_style :'';
				   extrafieldObj.defvalue = $scope.extrafield_tb_defvalue ? $scope.extrafield_tb_defvalue : '';
				   extrafieldObj.type = $scope.extrafield_tb_type ? $scope.extrafield_tb_type : type;
				   extrafieldObj.FEvisibility = $scope.extrafield_tb_FEvisibility ? $scope.extrafield_tb_FEvisibility : '';
				   extrafieldObj.position = $scope.extrafield_tb_position ? $scope.extrafield_tb_position : '';
				   extrafieldObj.required = $scope.extrafield_tb_required ? $scope.extrafield_tb_required : '';
				   extrafieldObj.cols = $scope.extrafield_tb_cols;
				   extrafieldObj.rows = $scope.extrafield_tb_rows;
				   extrafieldObj.values = $scope.values;
				   var eng = {
						   'name' : $scope.extrafield_tb_name,
						   'label' : $scope.extrafield_tb_label,
						   'values' : $scope.values
					   };
				   extrafieldObj.olang.en =  eng  ;
				   }
			   }
			   
			   if($scope.editExtrafield){
				   
				   $scope.extrafieldService.updateExtrafield($scope.editExtrafieldid,extrafieldObj).then(function(result){
					   if(result.statusText = "OK"){
						   
		      				 swal( 'Updated!',
		      	                     'Updated extra field.',
		      	                     'success'
		      	                   )
		      				clearFormField(type);
		      				$('.nav-link.tcat').click();	      				
		      				   $scope.getExtrafields($stateParams.groupid);
		      				
		      				  }else{
		      					swal( 'error!',
			      	                   'Error while update this field ! Please try again later.',
			      	                   'error'
			      	                )
		      				  }
					   
				   })
				   clearFormField();
			   }else{
			   $scope.extrafieldService.createExtraField(extrafieldObj).then(function(result){
				   if(result.statusText = "OK"){
					   
	      				 swal( 'Created!',
	      	                     'New field created.',
	      	                     'success'
	      	                   )
	      				clearFormField();
	      				$('.nav-link.tcat').click();	      				
	      				   $scope.getExtrafields($stateParams.groupid);
	      				
	      				  }else{
	      					swal( 'error!',
		      	                   'Error while creating new field ! Please try again later.',
		      	                   'error'
		      	                )
	      				  }
			   })
	   }
		   
	   }
	   
	   function clearFormField(type){
		   //clear form 
				if(type == 'textarea'){
					$scope.extrafield_ta_label = '';
 				$scope.extrafield_ta_name = '';
 				$scope.extrafield_ta_size = '';
 				$scope.extrafield_ta_class = '';
 				$scope.extrafield_ta_style = '';
 				$scope.extrafield_ta_defvalue = '';
 				$scope.extrafield_ta_type = '';
 				$scope.extrafield_ta_FEvisibility = '';
 				$scope.extrafield_ta_position = '';
 				$scope.extrafield_ta_status = '';
 				$scope.extrafield_ta_required = '';
 				$scope.extrafield_ta_cols = '';
 				$scope.extrafield_ta_rows = '';
 				 $scope.values = [{id: '1'}];
 				$scope.olang = [];
 				$scope.extrafieldform_ta_extrafield.$submitted = false;
		   }else if(type == 'radio'){
			  $scope.extrafield_ra_label = '';
 				$scope.extrafield_ra_name = '';
 				$scope.extrafield_ra_size = '';
 				$scope.extrafield_ra_class = '';
 				$scope.extrafield_ra_style = '';
 				$scope.extrafield_ra_defvalue = '';
 				$scope.extrafield_ra_type = '';
 				$scope.extrafield_ra_FEvisibility = '';
 				$scope.extrafield_ra_position = '';
 				$scope.extrafield_ra_status = '';
 				$scope.extrafield_ra_required = '';
 				$scope.extrafield_ra_cols = '';
 				$scope.extrafield_ra_rows = '';
 				 $scope.values = [{id: '1'}];
 				$scope.olang = [];
 				$scope.extrafieldform_ra_extrafield.$submitted = false;
		   }else if(type == 'checkbox'){
			  $scope.extrafield_cb_label = '';
 				$scope.extrafield_cb_name = '';
 				$scope.extrafield_cb_size = '';
 				$scope.extrafield_cb_class = '';
 				$scope.extrafield_cb_style = '';
 				$scope.extrafield_cb_defvalue = '';
 				$scope.extrafield_cb_type = '';
 				$scope.extrafield_cb_FEvisibility = '';
 				$scope.extrafield_cb_position = '';
 				$scope.extrafield_cb_status = '';
 				$scope.extrafield_cb_required = '';
 				$scope.extrafield_cb_cols = '';
 				$scope.extrafield_cb_rows = '';
 				 $scope.values = [{id: '1'}];
 				$scope.olang = [];
 				$scope.extrafieldform_cb_extrafield.$submitted = false;
		   }else if(type == 'dropdown'){
			  $scope.extrafield_dd_label = '';
 				$scope.extrafield_dd_name = '';
 				$scope.extrafield_dd_size = '';
 				$scope.extrafield_dd_class = '';
 				$scope.extrafield_dd_style = '';
 				$scope.extrafield_dd_defvalue = '';
 				$scope.extrafield_dd_type = '';
 				$scope.extrafield_dd_FEvisibility = '';
 				$scope.extrafield_dd_position = '';
 				$scope.extrafield_dd_status = '';
 				$scope.extrafield_dd_required = '';
 				$scope.extrafield_dd_cols = '';
 				$scope.extrafield_dd_rows = '';
 				 $scope.values = [{id: '1'}];
 				$scope.olang = [];
 				$scope.extrafieldform_dd_extrafield.$submitted = false;
		   }else {
			  $scope.extrafield_tb_label = '';
 				$scope.extrafield_tb_name = '';
 				$scope.extrafield_tb_size = '';
 				$scope.extrafield_tb_class = '';
 				$scope.extrafield_tb_style = '';
 				$scope.extrafield_tb_defvalue = '';
 				$scope.extrafield_tb_type = '';
 				$scope.extrafield_tb_FEvisibility = '';
 				$scope.extrafield_tb_position = '';
 				$scope.extrafield_tb_status = '';
 				$scope.extrafield_tb_required = '';
 				$scope.extrafield_tb_cols = '';
 				$scope.extrafield_tb_rows = '';
 				 $scope.values = [{id: '1'}];
 				$scope.olang = [];
 				$scope.extrafieldform_tb_extrafield.$submitted = false;
		   }
				 
	   }
	   
	   /*
	    * Edit extra field
	    */
	   $scope.editextrafield = function(index){
		  // $state.go('proeditextrafield',{groupid :$stateParams.groupid, fieldid : fieldid });
		   var selectedField = $scope.extrafields[index];
		   $scope.editExtrafield = true;
		   $scope.editExtrafieldid = selectedField._id;
		   
		   $('.nav-link.textarea').removeClass('displaynone');
		   $('.nav-link.textbox').removeClass('displaynone');
		   $('.nav-link.dropdown').removeClass('displaynone');
		   $('.nav-link.checkbox').removeClass('displaynone');
		   $('.nav-link.radio').removeClass('displaynone');
	   
		   if(selectedField.type == 'textarea'){
			   $scope.extrafield_ta_status = selectedField.status ? selectedField.status.toString() : "0";
			   $scope.extrafield_ta_name = selectedField.name;
			   $scope.extrafield_ta_label = selectedField.label;
			   $scope.extrafield_ta_size = selectedField.size ? selectedField.size.toString() : '';
			   $scope.extrafield_ta_class = selectedField.classname;
			   $scope.extrafield_ta_style = selectedField.style;
			   $scope.extrafield_ta_defvalue = selectedField.defvalue;
			   $scope.extrafield_ta_type = selectedField.type;
			   $scope.extrafield_ta_FEvisibility = selectedField.FEvisibility;
			   $scope.extrafield_ta_position = selectedField.position;
			   $scope.extrafield_ta_required = selectedField.required;
			   $scope.extrafield_ta_cols = selectedField.cols ? selectedField.cols.toString() : '0';
			   $scope.extrafield_ta_rows = selectedField.rows ? selectedField.rows.toString() : '0';
			   $scope.values = selectedField.values;
			  
			   setTimeout(function(){
				   $('.nav-link.textarea').click();
				   $('.nav-link.textbox').addClass('displaynone');
				   $('.nav-link.dropdown').addClass('displaynone');
				   $('.nav-link.checkbox').addClass('displaynone');
				   $('.nav-link.radio').addClass('displaynone');
			   }, 10);
			   
			   
		   }else if(selectedField.type == 'radio'){
			   $scope.extrafield_ra_status = selectedField.status ? selectedField.status.toString() : "0";
			   $scope.extrafield_ra_name = selectedField.name;
			   $scope.extrafield_ra_label = selectedField.label;
			   $scope.extrafield_ra_size = selectedField.size ? selectedField.size.toString() : '';
			   $scope.extrafield_ra_class = selectedField.classname;
			   $scope.extrafield_ra_style = selectedField.style;
			   $scope.extrafield_ra_defvalue = selectedField.defvalue;
			   $scope.extrafield_ra_type = selectedField.type;
			   $scope.extrafield_ra_FEvisibility = selectedField.FEvisibility;
			   $scope.extrafield_ra_position = selectedField.position;
			   $scope.extrafield_ra_required = selectedField.required;
			   $scope.values = selectedField.values;
			   $('.nav-link.radio').click();
			   $('.nav-link.textbox').addClass('displaynone');
			   $('.nav-link.dropdown').addClass('displaynone');
			   $('.nav-link.checkbox').addClass('displaynone');
			   $('.nav-link.textarea').addClass('displaynone');
			   
		   }else if(selectedField.type == 'checkbox'){
			   $scope.extrafield_cb_status = selectedField.status ? selectedField.status.toString() : "0";
			   $scope.extrafield_cb_name = selectedField.name;
			   $scope.extrafield_cb_label = selectedField.label;
			   $scope.extrafield_cb_size = selectedField.size ? selectedField.size.toString() : '';
			   $scope.extrafield_cb_class = selectedField.classname;
			   $scope.extrafield_cb_style = selectedField.style;
			   $scope.extrafield_cb_defvalue = selectedField.defvalue;
			   $scope.extrafield_cb_type = selectedField.type;
			   $scope.extrafield_cb_FEvisibility = selectedField.FEvisibility;
			   $scope.extrafield_cb_position = selectedField.position;
			   $scope.extrafield_cb_required = selectedField.required;
			   $scope.values = selectedField.values;
			   
			   $('.nav-link.checkbox').click();
			   $('.nav-link.textbox').addClass('displaynone');
			   $('.nav-link.dropdown').addClass('displaynone');
			   $('.nav-link.radio').addClass('displaynone');
			   $('.nav-link.textarea').addClass('displaynone');
			   
		   }else if(selectedField.type == 'dropdown'){
			   $scope.extrafield_dd_status = selectedField.status ? selectedField.status.toString() : "0";
			   $scope.extrafield_dd_name = selectedField.name;
			   $scope.extrafield_dd_label = selectedField.label;
			   $scope.extrafield_dd_size = selectedField.size ? selectedField.size.toString() : '';
			   $scope.extrafield_dd_class = selectedField.classname;
			   $scope.extrafield_dd_style = selectedField.style;
			   $scope.extrafield_dd_defvalue = selectedField.defvalue;
			   $scope.extrafield_dd_type = selectedField.type;
			   $scope.extrafield_dd_FEvisibility = selectedField.FEvisibility;
			   $scope.extrafield_dd_position = selectedField.position;
			   $scope.extrafield_dd_required = selectedField.required;
			   $scope.values = selectedField.values;
			   
			   $('.nav-link.dropdown').click();			   
			   $('.nav-link.textbox').addClass('displaynone');
			   $('.nav-link.checkbox').addClass('displaynone');
			   $('.nav-link.radio').addClass('displaynone');
			   $('.nav-link.textarea').addClass('displaynone');
			   
		   }else {
			   $scope.extrafield_tb_status = selectedField.status ? selectedField.status.toString() : "0";
			   $scope.extrafield_tb_name = selectedField.name;
			   $scope.extrafield_tb_label = selectedField.label;
			   $scope.extrafield_tb_size = selectedField.size ? selectedField.size.toString() : '';
			   $scope.extrafield_tb_class = selectedField.classname;
			   $scope.extrafield_tb_style = selectedField.style;
			   $scope.extrafield_tb_defvalue = selectedField.defvalue;
			   $scope.extrafield_tb_type = selectedField.type;
			   $scope.extrafield_tb_FEvisibility = selectedField.FEvisibility;
			   $scope.extrafield_tb_position = selectedField.position;
			   $scope.extrafield_tb_required = selectedField.required;
			   $scope.values = selectedField.values;
			   
			   $('.nav-link.textbox').click();
			   $('.nav-link.dropdown').addClass('displaynone');
			   $('.nav-link.checkbox').addClass('displaynone');
			   $('.nav-link.radio').addClass('displaynone');
			   $('.nav-link.textarea').addClass('displaynone');
			   
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
