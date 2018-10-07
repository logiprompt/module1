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
	  * Description : add extra field group details
	  * owner : prabin
	  */
	 extraFieldGroup.getExtraFieldGroup = function(){
		  
		 return $http({
		        url: '/api/extrafieldgroups',
		        method: "GET"
		    });
		}
	 
	 return extraFieldGroup;
	  
	 
  }
  

}());
