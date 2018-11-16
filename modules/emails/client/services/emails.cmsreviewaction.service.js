// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('cmsReviewActionService', cmsReviewActionService);
  cmsReviewActionService.$inject = ['$resource','$http'];
  function cmsReviewActionService($resource,$http) {
	 var cmsReviewAction = {}; 

	 /*
	  * Function : addcmsReviewAction
	  * Description : add cmsReviewAction details
	  * owner : ck
	  */

	cmsReviewAction.addCmsReviewAction = function(data)
	{	
		console.log(data);	 
	    return $http({
	           url: '/api/cmsReviewAction',
	           method: "POST",
	           data:data
	       });
	}
 	/*
	  * Function : getcmsReviewAction
	  * Description : get all cmsReviewAction details
	  * owner : ck
	  */
	 cmsReviewAction.getcmsReviewAction = function(){		  
		return $http({
			   url: '/api/cmsReviewAction',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : deletecmsReviewAction
	  * Description : Delete cmsReviewAction details by id
	  * owner : ck
	  */
	 cmsReviewAction.delcmsReviewAction = function(userId)
		{		  
		 	return $http({
			url: '/api/cmsReviewActionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}
			 /*
	  * Function : delCheckedcmsReviewAction
	  * Description : Delete details by ids
	  * owner : ck
	  */
	 cmsReviewAction.delCheckedcmsReviewAction= function(userId)
	 {
		//console.log(userId);		  
	   return $http({
			  url: '/api/cmsReviewAction/delCheckedcmsReviewAction',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }

	cmsReviewAction.getCmsReviewActionById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/cmsReviewActionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */

	 cmsReviewAction.updateCmsReviewAction = function(userId,data){
		//console.log(data);
		 return $http({
		        url: '/api/cmsReviewActionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }

	 return cmsReviewAction;	   
  }  
}());
