// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('invoicecommentsService', invoicecommentsService);

  invoicecommentsService.$inject = ['$resource','$http'];
  function invoicecommentsService($resource,$http) {
    
	  
	 var invoicecommentsService = {};
	  
	 /*
	  * Function : adduser
	  * Description : add user details
	  * owner : jeeja
	  */
	 invoicecommentsService.addInvoicecomments = function(data){
		 
		return $http({
	           url: '/api/addInvoicecomments',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 

 /*
	  * Function : getUsers
	  * Description : get all user details
	  * owner : jeeja
	  */
	 invoicecommentsService.getinvoice = function(){
		  
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
	 invoicecommentsService.delInvoice = function(userId){
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
	 invoicecommentsService.delcheckedinvoice = function(userId){
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
	 invoicecommentsService.getInvoiceById = function(userId){
		 return $http({
		        url: '/api/getinvoice',
				method: "GET",
				params:{'userId':userId}
		    });
	 }
	 
	 /*
	  * 
	  */
	 invoicecommentsService.updateInvoice = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/updateinvoice',
				method: "PUT",
		        data:data
		    });
	 }
	 return invoicecommentsService;
	  
	 
  }
  

}());
