// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('prdTagActionService', prdTagActionService);
  prdTagActionService.$inject = ['$resource','$http'];
  function prdTagActionService($resource,$http) {
	 var  prdTagAction = {}; 

	 /*
	  * Function : add prdTagAction
	  * Description : add  prdTagAction details
	  * owner : ck
	  */

	 prdTagAction.addPrdTagAction = function(data)
	{	
		//console.log(data);	 
	    return $http({
	           url: '/api/prdTagAction',
	           method: "POST",
	           data:data
	       });
	}
 	/*
	  * Function : get prdTagAction
	  * Description : get all  prdTagAction details
	  * owner : ck
	  */
	  prdTagAction.getprdTagAction = function(){		  
		return $http({
			   url: '/api/prdTagAction',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : delete prdTagAction
	  * Description : Delete  prdTagAction details by id
	  * owner : ck
	  */
	  prdTagAction.delprdTagAction = function(userId)
		{		  
		 	return $http({
			url: '/api/prdTagActionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}
			 /*
	  * Function : delChecked prdTagAction
	  * Description : Delete details by ids
	  * owner : ck
	  */
	  prdTagAction.delCheckedprdTagAction= function(userId)
	 {
		//console.log(userId);		  
	   return $http({
			  url: '/api/prdTagAction/delCheckedprdTagAction',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }

	 prdTagAction.getprdTagActionById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/prdTagActionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */

	  prdTagAction.updateprdTagAction = function(userId,data){
		//console.log(data);
		 return $http({
		        url: '/api/prdTagActionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }

	 return  prdTagAction;	   
  }  
}());
