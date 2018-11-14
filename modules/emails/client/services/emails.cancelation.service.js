// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('cancelationService', cancelationService);

  cancelationService.$inject = ['$resource','$http'];
  function cancelationService($resource,$http) {
    
	  
	 var cancelation = {};
	  
	 /*
	  * Function : addUserForget
	  * Description : add UserForget details
	  * owner : jeeja
	  */
	cancelation.addCancelation = function(data)
	{	
		console.log(data);	 
	    return $http({
	           url: '/api/cancelation',
	           method: "POST",
	           data:data
	       });
	}

 	/*
	  * Function : getUsers
	  * Description : get all UserForget details
	  * owner : jeeja
	  */
	 cancelation.getCancelation = function(){
		  
		return $http({
			   url: '/api/cancelation',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  * owner : prabin
	  */
	 cancelation.delCancelation = function(userId)
		{		  
		 	return $http({
			url: '/api/cancelationbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	  * owner : jeeja
	  */
	 cancelation.delCheckedCancelation= function(userId){
		//console.log(userId);		  
	   return $http({
			  url: '/api/cancelation/delCheckedCancelation',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 
	cancelation.getOrderCancelationById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/cancelationbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */
	 cancelation.updateOrderCancelation = function(userId,data){
	//	console.log(data);
		 return $http({
		        url: '/api/cancelationbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return cancelation;
	  
	 
  }
  

}());
