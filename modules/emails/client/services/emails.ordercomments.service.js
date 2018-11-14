// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('ordercommentsService', ordercommentsService);

  ordercommentsService.$inject = ['$resource','$http'];
  function ordercommentsService($resource,$http) {
    
	  
	 var ordercomments = {};
	  
	 /*
	  * Function : addOrderComments
	  * Description : add OrderComments details
	  * owner : anju
	  */
	 ordercomments.addOrderComments = function(data){
		 
		return $http({
	           url: '/api/addOrderComments',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getOrderComments
	  * Description : get all OrderComments details
	  * owner : anju
	  */
	 ordercomments.getOrderComments = function(){
		  
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
	 ordercomments.delOrderComments = function(userId){		  
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
	 ordercomments.delCheckedOrderComments= function(userId){
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

	 
	 ordercomments.getOrderCommentsById = function(userId){
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
	 ordercomments.updateOrderComments = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/ordercommentsbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return ordercomments;
	  
	 
  }
  

}());
