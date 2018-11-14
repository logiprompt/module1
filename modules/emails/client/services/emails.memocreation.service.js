// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('memoCreationService', memoCreationService);

  memoCreationService.$inject = ['$resource','$http'];
  function memoCreationService($resource,$http) {
    
	  
	 var memocreation = {};
	  
	 /*
	  * Function : addUserForget
	  * Description : add UserForget details
	  * owner : jeeja
	  */
	memocreation.addMemoCreation = function(data)
	{	
		console.log(data);	 
	    return $http({
	           url: '/api/memocreation',
	           method: "POST",
	           data:data
	       });
	}

 	/*
	  * Function : getUsers
	  * Description : get all UserForget details
	  * owner : jeeja
	  */
	 memocreation.getMemoCreation = function(){
		  
		return $http({
			   url: '/api/memocreation',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  * owner : prabin
	  */
	 memocreation.delMemoCreation = function(userId)
		{		  
		 	return $http({
			url: '/api/memocreationbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	  * owner : jeeja
	  */
	 memocreation.delCheckedMemoCreation= function(userId){
		//console.log(userId);		  
	   return $http({
			  url: '/api/memocreation/delCheckedmemocreation',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 
	memocreation.getMemoCreationById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/memocreationbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */
	 memocreation.updateMemoCreatin = function(userId,data){
		console.log(data);
		 return $http({
		        url: '/api/memocreationbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return memocreation;
	  
	 
  }
  

}());
