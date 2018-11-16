// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('cmstagsubmissionService', cmstagsubmissionService);

  cmstagsubmissionService.$inject = ['$resource','$http'];
  function cmstagsubmissionService($resource,$http) {
    
	  
	 var cmstagsubmission = {};
	  
	 /*
	  * Function : addcmstagsubmission
	  * Description : add cmstagsubmission details
	  * owner : anju
	  */
	 cmstagsubmission.addTagSubmission = function(data){
		 
		return $http({
	           url: '/api/addTagSubmission',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getcmstagsubmission
	  * Description : get all cmstagsubmission details
	  * owner : anju
	  */
	 cmstagsubmission.getCmstagSubmission = function(){
		  
		return $http({
			   url: '/api/addTagSubmission',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : delete cmstagsubmission
	  * Description : Delete cmstagsubmission details by id
	  * owner : anju
	  */
	 cmstagsubmission.delCmstagSubmission = function(userId){		  
		 return $http({
			url: '/api/cmstagsubmissionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedcmstagsubmission
	  * Description : Delete details by ids
	  * owner : anju
	  */
	 cmstagsubmission.delCheckedCmstagSubmission= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/cmstagsubmission/delCheckedCmstagSubmission',
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

	 
	 cmstagsubmission.getCmstagSubmissionById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/cmstagsubmissionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 cmstagsubmission.updateTagSubmission = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/cmstagsubmissionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return cmstagsubmission;
	  
	 
  }
  

}());
