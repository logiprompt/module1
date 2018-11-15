// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('orderprocessService', orderprocessService);

  orderprocessService.$inject = ['$resource','$http'];
  function orderprocessService($resource,$http) {
    
	  
	 var orderprocess = {};
	  
	 /*
	  * Function : addOrderProcess
	  * Description : add OrderProcess details
	  * owner : anju
	  */
	 orderprocess.addOrderProcess = function(data){
		 
		return $http({
	           url: '/api/addOrderProcess',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getOrderprocess
	  * Description : get all Orderprocess details
	  * owner : anju
	  */
	 orderprocess.getOrderProcess = function(){
		  
		return $http({
			   url: '/api/addOrderProcess',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : delete OrderProcess
	  * Description : Delete OrderProcess details by id
	  * owner : anju
	  */
	 orderprocess.delOrderProcess = function(userId){		  
		 return $http({
			url: '/api/orderprocessbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedorderprocess
	  * Description : Delete details by ids
	  * owner : anju
	  */
	 orderprocess.delCheckedOrderProcess= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/orderprocess/delCheckedOrderProcess',
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

	 
	 orderprocess.getOrderProcessById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/orderprocessbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 orderprocess.updateOrderProcess = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/orderprocessbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return orderprocess;
	  
	 
  }
  

}());
