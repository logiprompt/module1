// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('shipmentcommentsService', shipmentcommentsService);

  shipmentcommentsService.$inject = ['$resource','$http'];
  function shipmentcommentsService($resource,$http) {
    
	  
	 var shipmentcomments = {};
	  
	 /*
	  * Function : addshipmentcomments
	  * Description : add shipmentcomments details
	  * owner : anju
	  */
	 shipmentcomments.addShipmentComments = function(data){
		 
		return $http({
	           url: '/api/addShipmentComments',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getsshipmentcomments
	  * Description : get all shipmentcomments details
	  * owner : anju
	  */
	 shipmentcomments.getShipmentComments = function(){
		  
		return $http({
			   url: '/api/addShipmentComments',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : delete shipmentcomments
	  * Description : Delete shipmentcomments details by id
	  * owner : anju
	  */
	 shipmentcomments.delShipmentComments = function(userId){		  
		 return $http({
			url: '/api/shipmentcommentsbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedshipmentcomments
	  * Description : Delete details by ids
	  * owner : anju
	  */
	 shipmentcomments.delCheckedShipmentComments= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/shipmentcomments/delCheckedShipmentComments',
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

	 
	 shipmentcomments.getShipmentCommentsById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/shipmentcommentsbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 shipmentcomments.updateShipmentComments = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/shipmentcommentsbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return shipmentcomments;
	  
	 
  }
  

}());
