// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('invoicecreationService', invoicecreationService);

  invoicecreationService.$inject = ['$resource','$http'];
  function invoicecreationService($resource,$http) {
    
	  
	 var invoicecreationService = {};
	  
	 /*
	  * Function : adduser
	  * Description : add user details
	  * owner : jeeja
	  */
	 invoicecreationService.addInvoice = function(data){
		 
		return $http({
	           url: '/api/addInvoice',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 

 /*
	  * Function : getUsers
	  * Description : get all user details
	  * owner : jeeja
	  */
	 invoicecreationService.getinvoice = function(){
		  
		return $http({
			   url: '/api/addInvoice',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteInvoice
	  * Description : Delete user details by id
	  * 
	  */
	 invoicecreationService.delInvoice = function(userId){
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
	 invoicecreationService.delcheckedinvoice = function(userId){
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
	 invoicecreationService.getInvoiceById = function(userId){
		 return $http({
		        url: '/api/getinvoice',
				method: "GET",
				params:{'userId':userId}
		    });
	 }
	 
	 /*
	  * 
	  */
	 invoicecreationService.updateInvoice = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/updateinvoice',
				method: "PUT",
		        data:data
		    });
	 }
	 return invoicecreationService;
	  
	 
  }
  

}());
