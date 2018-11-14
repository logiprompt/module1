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
	  * Function : delete PaymentFailure
	  * Description : Delete PaymentFailure details by id
	  * owner : anju
	  */
	 userforgot.delPaymentFailure = function(userId){		  
		 return $http({
			url: '/api/paymentfailurebyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedPaymentFailure
	  * Description : Delete details by ids
	  * owner : jeeja
	  */
	 userforgot.delCheckedPaymentFailure= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/paymentfailure/delCheckedPaymentFailure',
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

	 
	 userforgot.getPaymentFailureById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/paymentfailurebyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 userforgot.updatePaymentFailure = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/paymentfailurebyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return userforgot;
	  
	 
  }
  

}());
