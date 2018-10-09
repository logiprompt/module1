// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('products')
  .service('extrafieldService', extrafieldService);

extrafieldService.$inject = ['$resource','$http'];
  function extrafieldService($resource,$http) {
    
	  
	 var extraFieldGroup = {};
	  
	 /*
	  * Function : addExtraFieldGroup
	  * Description : add extra field group details
	  * owner : prabin
	  */
	 extraFieldGroup.addExtraFieldGroup = function(data){
		  
		return $http({
	           url: '/api/extrafieldgroups/create',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 /*
	  * Function : getExtraFieldGroups
	  * Description : get ALl extra field group details
	  * owner : prabin
	  */
	 extraFieldGroup.getExtraFieldGroup = function(){
		  
		 return $http({
		        url: '/api/extrafieldgroups',
		        method: "GET"
		    });
		}
	 
	 /*
	  * Function : getExtraFieldGroups
	  * Description : Delete extra field group details by id
	  * owner : prabin
	  */
	 extraFieldGroup.deleteExtraFieldGroup = function(groupId){		  
		 return $http({
		        url: '/api/extrafieldgroups/'+groupId,
		        method: "DELETE"
		    });
		}
	 
	 /*
	  * Function : getExtraFieldGroupById
	  * Description : get one extra field group details by id
	  * owner : prabin
	  */
	 extraFieldGroup.getExtraFieldGroupById = function(groupId){
		 return $http({
		        url: '/api/extrafieldgroups/'+groupId,
		        method: "GET"
		    });
	 }
	 
	 /*
	  * Update Extra field Group by Id
	  */
	 extraFieldGroup.updateExtrafieldGroup = function(groupId,data){
		 return $http({
		        url: '/api/extrafieldgroups/'+groupId,
		        method: "PUT",
		        data:data
		    });
	 }
	 
	 /*
	  * Create Extra field
	  */
	 extraFieldGroup.createExtraField = function(data){
		 return $http({
	           url: '/api/extrafield/create',
	           method: "POST",
	           data:data
	       });
	 }
	 
	 
	 /*
	  * List Extra fields
	  */
	 extraFieldGroup.getExtraField = function(groupid){
		 return $http({
		        url: '/api/extrafield',
		        method: "GET"
		    });
	 }
	 
	 return extraFieldGroup;
	  
	 
  }
  

}());
