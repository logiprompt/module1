// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('cmsRatingSubService', cmsRatingSubService);
  cmsRatingSubService.$inject = ['$resource','$http'];
  function cmsRatingSubService($resource,$http) {
	 var cmsRatingSub = {}; 

	 /*
	  * Function : addcmsRatingSub
	  * Description : add cmsRatingSub details
	  * owner : ck
	  */

	cmsRatingSub.addCmsRatingSub = function(data)
	{	
		//console.log(data);	 
	    return $http({
	           url: '/api/cmsratingsub',
	           method: "POST",
	           data:data
	       });
	}

 	 /*
	  * Function : getcmsRatingSub
	  * Description : get all cmsRatingSub details
	  * owner : ck
	  */


	 cmsRatingSub.getcmsRatingSub = function(){		  
		return $http({
			   url: '/api/cmsratingsub',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : deletecmsRatingSub
	  * Description : Delete cmsRatingSub details by id
	  * owner : ck
	  */
	 cmsRatingSub.delcmsRatingSub = function(userId)
		{		  
		 	return $http({
			url: '/api/cmsratingsubbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}
	 
	 /*
	  * Function : delCheckedcmsRatingSub
	  * Description : Delete details by ids
	  * owner : ck
	  */
	 
	 cmsRatingSub.delCheckedcmsRatingSub= function(userId)
	 {
		//console.log(userId);		  
	   return $http({
			  url: '/api/cmsratingsub/delCheckedcmsRatingSub',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }

	cmsRatingSub.getCmsRatingSubById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/cmsratingsubbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */

	 cmsRatingSub.updatecmsRatingSub = function(userId,data){
		//console.log(data);
		 return $http({
		        url: '/api/cmsratingsubbyid',
		        method: "PUT", 
		        data:data
		    });
	 }

	 return cmsRatingSub;	

  }  
}());
