// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('paymentfailureService', paymentfailureService);

  paymentfailureService.$inject = ['$resource','$http'];
  function paymentfailureService($resource,$http) {
    
	  
	 var userforgot = {};
	  
	 /*
	  * Function : addPaymentFailure
	  * Description : add PaymentFailure details
	  * owner : anju
	  */
	 userforgot.addPaymentFailure = function(data){
		 
		return $http({
	           url: '/api/addPaymentFailure',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getPaymentFailure
	  * Description : get all PaymentFailure details
	  * owner : anju
	  */
	 userforgot.getPaymentFailure = function(){
		  
		return $http({
			   url: '/api/addPaymentFailure',
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
