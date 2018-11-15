// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('shipmentcreationService', shipmentcreationService);

  shipmentcreationService.$inject = ['$resource','$http'];
  function shipmentcreationService($resource,$http) {
    
	  
	 var shipmentcreation = {};
	  
	 /*
	  * Function : addshipmentcreation
	  * Description : add shipmentcreation details
	  * owner : anju
	  */
	 shipmentcreation.addShipmentCreation = function(data){
		 
		return $http({
	           url: '/api/addShipmentCreation',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getshipmentcreation
	  * Description : get all shipmentcreation details
	  * owner : anju
	  */
	 shipmentcreation.getShipmentCreation = function(){
		  
		return $http({
			   url: '/api/addShipmentCreation',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : delete shipmentcreation
	  * Description : Delete shipmentcreation details by id
	  * owner : anju
	  */
	 shipmentcreation.delShipmentCreation = function(userId){		  
		 return $http({
			url: '/api/shipmentcreationbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedshipmentcreation
	  * Description : Delete details by ids
	  * owner : anju
	  */
	 shipmentcreation.delCheckedShipmentCreation= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/shipmentcreation/delCheckedShipmentCreation',
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

	 
	 shipmentcreation.getShipmentCreationById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/shipmentcreationbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 shipmentcreation.updateShipmentCreation = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/shipmentcreationbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return shipmentcreation;
	  
	 
  }
  

}());
