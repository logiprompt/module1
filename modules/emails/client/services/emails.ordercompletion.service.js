// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('ordercompletionService', ordercompletionService);

  ordercompletionService.$inject = ['$resource','$http'];
  function ordercompletionService($resource,$http) {
    
	  
	 var ordercompletionService = {};
	  
	 /*
	  * Function : addOrderHold
	  * Description : add UserForget details
	
	  */
	 ordercompletionService.addOrderCompletion  = function(data){
		 
		return $http({
	           url: '/api/orderCompletion',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getUsers
	  * Description : get all UserForget details
	 
	  */
	 ordercompletionService.getOrderHold = function(){
		  
		return $http({
			   url: '/api/orderCompletion',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  
	  */
	 ordercompletionService.delOrderCompletion  = function(userId)
		{		  
		 	return $http({
			url: '/api/ordercompletionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	
	  */
	 ordercompletionService.delCheckedOrderCompletion= function(userId){
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

	 
	ordercompletionService.getOrderCompletionById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/ordercompletionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */
	 ordercompletionService.updateOrderCompletion = function(userId,data){
		//console.log(userId);
		 return $http({
		        url: '/api/ordercompletionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return ordercompletionService;
	  
	 
  }
  

}());
