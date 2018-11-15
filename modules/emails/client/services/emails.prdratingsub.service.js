// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('prdRatingSubService', prdRatingSubService);
  prdRatingSubService.$inject = ['$resource','$http'];
  function prdRatingSubService($resource,$http) {
	 var prdRatingSub = {}; 

	 /*
	  * Function : addprdRatingSub
	  * Description : add prdRatingSub details
	  * owner : ck
	  */

	prdRatingSub.addPrdRatingSub = function(data)
	{	
		//console.log(data);	 
	    return $http({
	           url: '/api/prdratingsub',
	           method: "POST",
	           data:data
	       });
	}
 	/*
	  * Function : getprdRatingSub
	  * Description : get all prdRatingSub details
	  * owner : ck
	  */
	 prdRatingSub.getprdRatingSub = function(){		  
		return $http({
			   url: '/api/prdratingsub',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : deleteprdRatingSub
	  * Description : Delete prdRatingSub details by id
	  * owner : ck
	  */
	 prdRatingSub.delprdRatingSub = function(userId)
		{		  
		 	return $http({
			url: '/api/prdratingsubbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}
			 /*
	  * Function : delCheckedprdRatingSub
	  * Description : Delete details by ids
	  * owner : ck
	  */
	 prdRatingSub.delCheckedprdRatingSub= function(userId)
	 {
		//console.log(userId);		  
	   return $http({
			  url: '/api/prdratingSub/delCheckedprdRatingSub',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }

	prdRatingSub.getPrdRatingSubById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/prdratingsubbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */

	 prdRatingSub.updateprdRatingSub = function(userId,data){
		//console.log(data);
		 return $http({
		        url: '/api/prdratingsubbyid',
		        method: "PUT", 
		        data:data
		    });
	 }

	 return prdRatingSub;	   
  }  
}());
