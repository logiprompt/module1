// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('userforgotService', userforgotService);

  userforgotService.$inject = ['$resource','$http'];
  function userforgotService($resource,$http) {
    
	  
	 var userforgot = {};
	  
	 /*
	  * Function : addUserForget
	  * Description : add UserForget details
	  * owner : jeeja
	  */
	 userforgot.addUserForgot = function(data){
		 
		return $http({
	           url: '/api/userforgot',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getUsers
	  * Description : get all UserForget details
	  * owner : jeeja
	  */
	 userforgot.getUserForgot = function(){
		  
		return $http({
			   url: '/api/userforgot',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  * owner : prabin
	  */
	 userforgot.delUserForgot = function(userId){		  
		 return $http({
			url: '/api/userforgotbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	  * owner : jeeja
	  */
	 userforgot.delCheckedUserForget= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/userforgot/delCheckedUserForgot',
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

	 
	 userforgot.getUserForgotById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/userforgotbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 userforgot.updateUserForgot = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/userforgotbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return userforgot;
	  
	 
  }
  

}());
