// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('shipmentupdatesService', shipmentupdatesService);

  shipmentupdatesService.$inject = ['$resource','$http'];
  function shipmentupdatesService($resource,$http) {
    
	  
	 var shipmentupdates = {};
	  
	 /*
	  * Function : addshipmentupdates
	  * Description : add shipmentupdates details
	  * owner : anju
	  */
	 shipmentupdates.addShipmentUpdates = function(data){
		 
		return $http({
	           url: '/api/addShipmentUpdates',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getshipmentupdates
	  * Description : get all shipmentupdates details
	  * owner : anju
	  */
	 shipmentupdates.getShipmentUpdates = function(){
		  
		return $http({
			   url: '/api/addShipmentUpdates',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : delete shipmentupdates
	  * Description : Delete shipmentupdates details by id
	  * owner : anju
	  */
	 shipmentupdates.delShipmentUpdates = function(userId){		  
		 return $http({
			url: '/api/shipmentupdatesbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedshipmentupdates
	  * Description : Delete details by ids
	  * owner : anju
	  */
	 shipmentupdates.delCheckedShipmentUpdates= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/shipmentupdates/delCheckedShipmentUpdates',
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

	 
	 shipmentupdates.getShipmentUpdatesById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/shipmentupdatesbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 shipmentupdates.updateShipmentUpdates = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/shipmentupdatesbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return shipmentupdates;
	  
	 
  }
  

}());
