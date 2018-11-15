// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('prdReviewSubService', prdReviewSubService);
  prdReviewSubService.$inject = ['$resource','$http'];
  function prdReviewSubService($resource,$http) {
	 var prdReviewSub = {}; 

	 /*
	  * Function : addprdReviewSub
	  * Description : add prdReviewSub details
	  * owner : ck
	  */

	prdReviewSub.addPrdReviewSub = function(data)
	{	
		console.log(data);	 
	    return $http({
	           url: '/api/prdreviewsub',
	           method: "POST",
	           data:data
	       });
	}
 	/*
	  * Function : getprdReviewSub
	  * Description : get all prdReviewSub details
	  * owner : ck
	  */
	 prdReviewSub.getprdReviewSub = function(){		  
		return $http({
			   url: '/api/prdreviewsub',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : deleteprdReviewSub
	  * Description : Delete prdReviewSub details by id
	  * owner : ck
	  */
	 prdReviewSub.delprdReviewSub = function(userId)
		{		  
		 	return $http({
			url: '/api/prdreviewsubbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}
			 /*
	  * Function : delCheckedprdReviewSub
	  * Description : Delete details by ids
	  * owner : ck
	  */
	 prdReviewSub.delCheckedprdReviewSub= function(userId)
	 {
		//console.log(userId);		  
	   return $http({
			  url: '/api/prdReviewSub/delCheckedprdReviewSub',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }

	prdReviewSub.getPrdReviewSubById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/prdreviewsubbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */

	 prdReviewSub.updateprdReviewSub = function(userId,data){
		//console.log(data);
		 return $http({
		        url: '/api/prdreviewsubbyid',
		        method: "PUT", 
		        data:data
		    });
	 }

	 return prdReviewSub;	   
  }  
}());
