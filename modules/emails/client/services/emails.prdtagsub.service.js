// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('prdTagSubService', prdTagSubService);
  prdTagSubService.$inject = ['$resource','$http'];
  function prdTagSubService($resource,$http) {
	 var prdTagSub = {}; 

	 /*
	  * Function : addprdTagSub
	  * Description : add prdTagSub details
	  * owner : ck
	  */

	prdTagSub.addPrdTagSub = function(data)
	{	
		//console.log(data);	 
	    return $http({
	           url: '/api/prdtagsub',
	           method: "POST",
	           data:data
	       });
	}
 	/*
	  * Function : getprdTagSub
	  * Description : get all prdTagSub details
	  * owner : ck
	  */
	 prdTagSub.getprdTagSub = function(){		  
		return $http({
			   url: '/api/prdtagsub',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : deleteprdTagSub
	  * Description : Delete prdTagSub details by id
	  * owner : ck
	  */
	prdTagSub.delprdTagSub = function(userId)
	{		  
		 	return $http({
			url: '/api/prdtagsubbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
	}
			 /*
	  * Function : delCheckedprdTagSub
	  * Description : Delete details by ids
	  * owner : ck
	  */
	 prdTagSub.delCheckedprdTagSub= function(userId)
	 {
		//console.log(userId);		  
	   return $http({
			  url: '/api/prdtagsub/delCheckedprdTagSub',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }

	prdTagSub.getPrdTagSubById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/prdtagsubbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */

	 prdTagSub.updateprdTagSub = function(userId,data){
		//console.log(data);
		 return $http({
		        url: '/api/prdtagsubbyid',
		        method: "PUT", 
		        data:data
		    });
	 }

	 return prdTagSub;	   
  }  
}());
