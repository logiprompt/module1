// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('subscriptionService',subscriptionService);

  subscriptionService.$inject = ['$resource','$http'];
  function subscriptionService($resource,$http) {
    
	  
	 var subscriptionService = {};
	  
	 /*
	  * Function : adduser
	  * Description : add user details
	  * owner : jeeja
	  */
	 subscriptionService.addSubscription = function(data){
		 
		return $http({
	           url: '/api/addSubscription',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 

 /*
	  * Function : getUsers
	  * Description : get all user details
	  * owner : jeeja
	  */
	 subscriptionService.getsubscription = function(){
		  
		return $http({
			   url: '/api/addSubscription',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteInvoice
	  * Description : Delete user details by id
	  * 
	  */
	 subscriptionService.delInvoice = function(userId){
		 	console.log(13);	  
		 return $http({
		        url: '/api/addInvoice/',
				method: "DELETE",
				params:{'userId':userId}
				
			});
			console.log(params);
		}

			 /*
	  * Function : delCheckedinvoice
	  * Description : Delete details by ids
	  * 
	  */
	 subscriptionService.delcheckedinvoice = function(userId){
		console.log(12);		  
	   return $http({
			  url: '/api/invoice/delCheckedinvoice',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 
	 /*
	  * Function : getUserById
	  * Description : get one user details by id
	  * 
	  */
	 subscriptionService.getInvoiceById = function(userId){
		 return $http({
		        url: '/api/getinvoice',
				method: "GET",
				params:{'userId':userId}
		    });
	 }
	 
	 /*
	  * 
	  */
	 subscriptionService.updateInvoice = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/updateinvoice',
				method: "PUT",
		        data:data
		    });
	 }
	 return subscriptionService;
	  
	 
  }
  

}());
