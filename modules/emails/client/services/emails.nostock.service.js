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
	nostock.addNoStock = function(data)
	{	
		console.log(data);	 
	    return $http({
	           url: '/api/nostock',
	           method: "POST",
	           data:data
	       });
	}

 	/*
	  * Function : getUsers
	  * Description : get all UserForget details
	  * owner : jeeja
	  */
	 nostock.getNoStock = function(){
		  
		return $http({
			   url: '/api/nostock',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  * owner : prabin
	  */
	 nostock.delNoStock = function(userId)
		{		  
		 	return $http({
			url: '/api/NoStockbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	  * owner : jeeja
	  */
	 nostock.delCheckedNoStock= function(userId){
		//console.log(userId);		  
	   return $http({
			  url: '/api/nostock/delCheckedNoStock',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 
	nostock.getNoStockById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/nostockbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */
	 nostock.updateNoStock = function(userId,data){
		console.log(data);
		 return $http({
		        url: '/api/nostockbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return nostock;
	  
	 
  }
  

}());
