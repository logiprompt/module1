// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('prdRatingAdminActionService', prdRatingAdminActionService);
  prdRatingAdminActionService.$inject = ['$resource','$http'];
  function prdRatingAdminActionService($resource,$http) {
	 var  prdRatingAdminAction = {}; 

	 /*
	  * Function : add prdRatingAdminAction
	  * Description : add  prdRatingAdminAction details
	  * owner : ck
	  */

	 prdRatingAdminAction.addPrdRatingAction = function(data)
	{	
		console.log(data);	 
	    return $http({
	           url: '/api/prdRatingAdminAction',
	           method: "POST",
	           data:data
	       });
	}
 	/*
	  * Function : get prdRatingAdminAction
	  * Description : get all  prdRatingAdminAction details
	  * owner : ck
	  */
	  prdRatingAdminAction.getprdRatingAdminAction = function(){		  
		return $http({
			   url: '/api/prdRatingAdminAction',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : delete prdRatingAdminAction
	  * Description : Delete  prdRatingAdminAction details by id
	  * owner : ck
	  */
	  prdRatingAdminAction.delprdRatingAdminAction = function(userId)
		{		  
		 	return $http({
			url: '/api/prdRatingAdminActionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}
			 /*
	  * Function : delChecked prdRatingAdminAction
	  * Description : Delete details by ids
	  * owner : ck
	  */
	  prdRatingAdminAction.delCheckedprdRatingAdminAction= function(userId)
	 {
		//console.log(userId);		  
	   return $http({
			  url: '/api/prdRatingAdminAction/delCheckedprdRatingAdminAction',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }

	 prdRatingAdminAction.getprdRatingAdminActionById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/prdRatingAdminActionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */

	  prdRatingAdminAction.updateprdRatingAdminAction = function(userId,data){
		//console.log(data);
		 return $http({
		        url: '/api/prdRatingAdminActionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }

	 return  prdRatingAdminAction;	   
  }  
}());
