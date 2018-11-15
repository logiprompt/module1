// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('invoicecommentsService', invoicecommentsService);

  invoicecommentsService.$inject = ['$resource','$http'];
  function invoicecommentsService($resource,$http) {
    
	  
	 var invoicecomments = {};
	  
	 /*
	  * Function : adduser
	  * Description : add user details
	  * owner : 
	  */
	 invoicecomments.addInvoicecomments = function(data){
		 
		return $http({
	           url: '/api/addInvoicecomment',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 

 /*
	  * Function : getUsers
	  * Description : get all user details
	  * owner : jeeja
	  */
	 invoicecomments.getInvoicecomments = function(){
		  
		return $http({
			   url: '/api/addInvoicecomment',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteInvoice
	  * Description : Delete user details by id
	  * 
	  */
	 invoicecomments.delInvoice = function(userId){
		 	console.log(13);	  
		 return $http({
		        url: '/api/addInvoicecomment/',
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
	 invoicecomments.delcheckedcomment = function(userId){
			  
	   return $http({
			  url: '/api/invoice/delCheckedinvoicecomments',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 
	 /*
	  * Function : getUserById
	  * Description : get one user details by id
	  * 
	  */
	 invoicecomments.getInvoicecommentById = function(userId){
		 return $http({
		        url: '/api/getinvoicecomment',
				method: "GET",
				params:{'userId':userId}
		    });
	 }
	 
	 /*
	  * 
	  */
	 invoicecomments.updateInvoicecomments = function(userId,data){
		 console.log(data);
		 return $http({
		        url: '/api/updateinvoicecomment',
				method: "PUT",
		        data:data
		    });
	 }
	 return invoicecomments;
	  
	 
  }
  

}());
