// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('shareusersService', shareusersService);

  shareusersService.$inject = ['$resource','$http'];
  function shareusersService($resource,$http) {
    
	  
	 var shareusersService = {};
	  
	 /*
	  * Function : addOrderHold
	  * Description : add UserForget details
	
	  */
	 shareusersService.addShareUsers  = function(data){
		 
		return $http({
	           url: '/api/shareusers',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getUsers
	  * Description : get all UserForget details
	 
	  */
	 shareusersService.getShareUsers = function(){
		  
		return $http({
			   url: '/api/shareusers',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  
	  */
	 shareusersService.delShareUsers  = function(userId)
		{		  
		 	return $http({
			url: '/api/shareusersbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	
	  */
	 shareusersService.delCheckedOrderCompletion= function(userId){
		//console.log(userId);		  
	   return $http({
			  url: '/api/ordercompletion/delCheckedOrderCompletion',
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

	 
	shareusersService.getShareUsersById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/shareusersbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */
	 shareusersService.updateShareUser = function(userId,data){
		//console.log(userId);
		 return $http({
		        url: '/api/shareusersbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return shareusersService;
	  
	 
  }
  

}());
