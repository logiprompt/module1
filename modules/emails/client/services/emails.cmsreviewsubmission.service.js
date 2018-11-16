// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('cmsreviewsubmissionService', cmsreviewsubmissionService);

  cmsreviewsubmissionService.$inject = ['$resource','$http'];
  function cmsreviewsubmissionService($resource,$http) {
    
	  
	 var cmsreviewsubmission = {};
	  
	 /*
	  * Function : addcmsreviewsubmission
	  * Description : add cmsreviewsubmission details
	  * owner : anju
	  */
	 cmsreviewsubmission.addReviewSubmition = function(data){
		 
		return $http({
	           url: '/api/addReviewSubmition',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getcmsreviewsubmission
	  * Description : get all cmsreviewsubmission details
	  * owner : anju
	  */
	 cmsreviewsubmission.getCmsreviewSubmission = function(){
		  
		return $http({
			   url: '/api/addReviewSubmition',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : delete cmsreviewsubmission
	  * Description : Delete cmsreviewsubmission details by id
	  * owner : anju
	  */
	 cmsreviewsubmission.delCmsreviewSubmission = function(userId){		  
		 return $http({
			url: '/api/cmsreviewsubmissionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedcmsreviewsubmission
	  * Description : Delete details by ids
	  * owner : anju
	  */
	 cmsreviewsubmission.delCheckedCmsreviewSubmission= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/cmsreviewsubmission/delCheckedCmsreviewSubmission',
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

	 
	 cmsreviewsubmission.getCmsreviewSubmissionById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/cmsreviewsubmissionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 cmsreviewsubmission.updateReviewSubmition = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/cmsreviewsubmissionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return cmsreviewsubmission;
	  
	 
  }
  

}());
