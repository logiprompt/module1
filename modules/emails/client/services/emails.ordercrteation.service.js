// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('ordercreationService', ordercreationService);

  ordercreationService.$inject = ['$resource','$http'];
  function ordercreationService($resource,$http) {
    
	  
	 var ordercreation = {};
	  
	 /*
	  * Function : addUserForget
	  * Description : add UserForget details
	  * owner : jeeja
	  */
	 ordercreation.addOrderCreation = function(data){
		 
		return $http({
	           url: '/api/ordercreation',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getUsers
	  * Description : get all UserForget details
	  * owner : jeeja
	  */
	 ordercreation.getOrderCreation = function(){
		  
		return $http({
			   url: '/api/ordercreation',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  * owner : prabin
	  */
		ordercreation.delOrderCreation = function(userId)
		{		  
		 	return $http({
			url: '/api/ordercreationbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	  * owner : jeeja
	  */
	 ordercreation.delCheckedOrderCreation= function(userId){
		//console.log(userId);		  
	   return $http({
			  url: '/api/ordercreation/delCheckedOrderCreation',
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

	 
	ordercreation.getOrderCreationById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/ordercreationbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */
	 ordercreation.updateOrderCreation = function(userId,data){
		//console.log(userId);
		 return $http({
		        url: '/api/ordercreationbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return ordercreation;
	  
	 
  }
  

}());
