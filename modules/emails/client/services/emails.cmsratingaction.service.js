// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('cmsratingactionService', cmsratingactionService);

  cmsratingactionService.$inject = ['$resource','$http'];
  function cmsratingactionService($resource,$http) {
    
	  
	 var cmsratingaction = {};
	  
	 /*
	  * Function : addcmsratingaction
	  * Description : add cmsratingaction details
	  * owner : anju
	  */
	 cmsratingaction.addRatingAction = function(data){
		 
		return $http({
	           url: '/api/addRatingAction',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getcmsratingaction
	  * Description : get all cmsratingaction details
	  * owner : anju
	  */
	 cmsratingaction.getCmsratingAction = function(){
		  
		return $http({
			   url: '/api/addRatingAction',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : delete cmsratingaction
	  * Description : Delete cmsratingaction details by id
	  * owner : anju
	  */
	 cmsratingaction.delCmsratingAction = function(userId){		  
		 return $http({
			url: '/api/cmsratingactionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedcmsratingaction
	  * Description : Delete details by ids
	  * owner : anju
	  */
	 cmsratingaction.delCheckedCmsratingAction= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/cmsratingaction/delCheckedCmsratingAction',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 
	 /*
	  * Function : getUserForgetById
	  * Description : get one UserForget details by id
	
	  */

	  
	//  userforgot.getUserForgotById = function(userId){
	// 	 return $http({
	// 	        url: '/api/userforgotid',
	// 			method: "GET",
	// 			params:{userId:userId}
	// 	    });
	//  }

	 
	 cmsratingaction.getCmsratingActionById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/cmsratingactionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 cmsratingaction.updateCmsratingAction = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/cmsratingactionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return cmsratingaction;
	  
	 
  }
  

}());
