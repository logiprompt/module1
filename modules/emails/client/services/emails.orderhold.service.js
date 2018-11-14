// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('orderholdService', orderholdService);

  orderholdService.$inject = ['$resource','$http'];
  function orderholdService($resource,$http) {
    
	  
	 var orderhold = {};
	  
	 /*
	  * Function : addOrderHold
	  * Description : add UserForget details
	
	  */
	 orderhold.addOrderHold = function(data){
		 
		return $http({
	           url: '/api/orderhold',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getUsers
	  * Description : get all UserForget details
	 
	  */
	 orderhold.getOrderHold = function(){
		  
		return $http({
			   url: '/api/orderhold',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  
	  */
		orderhold.delOrderHold = function(userId)
		{		  
		 	return $http({
			url: '/api/orderholdbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	
	  */
	 orderhold.delCheckedOrderHold= function(userId){
		//console.log(userId);		  
	   return $http({
			  url: '/api/orderhold/delCheckedOrderHold',
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

	 
	orderhold.getOrderHoldById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/orderholdbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */
	 orderhold.updateOrderHold = function(userId,data){
		//console.log(userId);
		 return $http({
		        url: '/api/orderholdbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return orderhold;
	  
	 
  }
  

}());
