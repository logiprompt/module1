// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('orderunholdService', orderunholdService);

  orderunholdService.$inject = ['$resource','$http'];
  function orderunholdService($resource,$http) {
    
	  
	 var orderunhold = {};
	  
	 /*
	  * Function : addorderunhold
	  * Description : add UserForget details
	
	  */
	 orderunhold.addOrderUnhold = function(data){
		 
		return $http({
	           url: '/api/orderunhold',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getUsers
	  * Description : get all UserForget details
	 
	  */
	 orderunhold.getOrderUnhold = function(){
		  
		return $http({
			   url: '/api/orderunhold',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  
	  */
		orderunhold.delOrderUnhold = function(userId)
		{		  
		 	return $http({
			url: '/api/orderunholdbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	
	  */
	 orderunhold.delCheckedOrderUnhold= function(userId){
		//console.log(userId);		  
	   return $http({
			  url: '/api/orderunhold/delCheckedOrderUnhold',
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

	 
	orderunhold.getOrderUnholdById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/orderunholdbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */
	 orderunhold.updateOrderUnhold = function(userId,data){
		//console.log(userId);
		 return $http({
		        url: '/api/orderunholdbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return orderunhold;
	  
	 
  }
  

}());
