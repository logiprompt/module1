// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('nostockService', nostockService);

  nostockService.$inject = ['$resource','$http'];
  function nostockService($resource,$http) {
    
	  
	 var nostock = {};
	  
	 /*
	  * Function : addUserForget
	  * Description : add UserForget details
	  * owner : jeeja
	  */
	 nostock.addOrderCreation = function(data){
		 
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
	 nostock.getOrderCreation = function(){
		  
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
	 nostock.delOrderCreation = function(userId)
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
	 nostock.delCheckedOrderCreation= function(userId){
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

	 
	nostock.getOrderCreationById = function(userId){
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
	 nostock.updateOrderCreation = function(userId,data){
		//console.log(userId);
		 return $http({
		        url: '/api/ordercreationbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return nostock;
	  
	 
  }
  

}());
