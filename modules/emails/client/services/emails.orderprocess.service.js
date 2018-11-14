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
	  * Function : getOrderComments
	  * Description : get all OrderComments details
	  * owner : anju
	  */
	 orderprocess.getOrderComments = function(){
		  
		return $http({
			   url: '/api/addOrderComments',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : delete OrderComments
	  * Description : Delete OrderComments details by id
	  * owner : anju
	  */
	 orderprocess.delOrderComments = function(userId){		  
		 return $http({
			url: '/api/ordercommentsbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedPaymentFailure
	  * Description : Delete details by ids
	  * owner : anju
	  */
	 orderprocess.delCheckedOrderComments= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/ordercomments/delCheckedOrderComments',
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

	 
	 orderprocess.getOrderCommentsById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/ordercommentsbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 orderprocess.updateOrderComments = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/ordercommentsbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return orderprocess;
	  
	 
  }
  

}());
