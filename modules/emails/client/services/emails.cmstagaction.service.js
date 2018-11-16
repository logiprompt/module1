// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('cmsTagActionService', cmsTagActionService);
  cmsTagActionService.$inject = ['$resource','$http'];
  function cmsTagActionService($resource,$http) {
	 var  cmsTagAction = {}; 

	 /*
	  * Function : add cmsTagAction
	  * Description : add  cmsTagAction details
	  * owner : ck
	  */

	 cmsTagAction.addCmsTagAction = function(data)
	{	
		//console.log(data);	 
	    return $http({
	           url: '/api/cmsTagAction',
	           method: "POST",
	           data:data
	       });
	}
 	/*
	  * Function : get cmsTagAction
	  * Description : get all  cmsTagAction details
	  * owner : ck
	  */
	 cmsTagAction.getCmsTagAction = function(){		  
		return $http({
			   url: '/api/cmsTagAction',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : delete cmsTagAction
	  * Description : Delete  cmsTagAction details by id
	  * owner : ck
	  */
	  cmsTagAction.delcmsTagAction = function(userId)
		{		  
		 	return $http({
			url: '/api/cmsTagActionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}
			 /*
	  * Function : delChecked cmsTagAction
	  * Description : Delete details by ids
	  * owner : ck
	  */
	  cmsTagAction.delCheckedcmsTagAction= function(userId)
	 {
		//console.log(userId);		  
	   return $http({
			  url: '/api/cmsTagAction/delCheckedcmsTagAction',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }

	 cmsTagAction.getCmsTagActionById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/cmsTagActionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */

	  cmsTagAction.updateCmsTagAction = function(userId,data){
		//console.log(data);
		 return $http({
		        url: '/api/cmsTagActionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }

	 return  cmsTagAction;	   
  }  
}());
