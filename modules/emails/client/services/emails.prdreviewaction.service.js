// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('prdReviewActionService', prdReviewActionService);
  prdReviewActionService.$inject = ['$resource','$http'];
  function prdReviewActionService($resource,$http) {
	 var prdReviewAction = {}; 

	 /*
	  * Function : addprdReviewAction
	  * Description : add prdReviewAction details
	  * owner : ck
	  */

	prdReviewAction.addPrdReviewAction = function(data)
	{	
		console.log(data);	 
	    return $http({
	           url: '/api/prdreviewaction',
	           method: "POST",
	           data:data
	       });
	}
 	/*
	  * Function : getprdReviewAction
	  * Description : get all prdReviewAction details
	  * owner : ck
	  */
	 prdReviewAction.getprdReviewAction = function(){		  
		return $http({
			   url: '/api/prdreviewaction',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : deleteprdReviewAction
	  * Description : Delete prdReviewAction details by id
	  * owner : ck
	  */
	 prdReviewAction.delprdReviewAction = function(userId)
		{		  
		 	return $http({
			url: '/api/prdreviewactionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}
			 /*
	  * Function : delCheckedprdReviewAction
	  * Description : Delete details by ids
	  * owner : ck
	  */
	 prdReviewAction.delCheckedprdReviewAction= function(userId)
	 {
		//console.log(userId);		  
	   return $http({
			  url: '/api/prdreviewaction/delCheckedprdReviewAction',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }

	prdReviewAction.getPrdReviewActionById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/prdreviewactionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */

	 prdReviewAction.updateprdReviewAction = function(userId,data){
		//console.log(data);
		 return $http({
		        url: '/api/prdreviewactionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }

	 return prdReviewAction;	   
  }  
}());
