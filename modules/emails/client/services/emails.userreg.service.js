// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('userregService', userregService);

  userregService.$inject = ['$resource','$http'];
  function userregService($resource,$http) {
    
	  
	 var userreg = {};
	  
	 /*
	  * Function : adduser
	  * Description : add user details
	  * owner : jeeja
	  */
	 userreg.addUser = function(data){
		 
		return $http({
	           url: '/api/userreg',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 

 /*
	  * Function : getUsers
	  * Description : get all user details
	  * owner : jeeja
	  */
	 userreg.getUser = function(){
		  
		return $http({
			   url: '/api/userreg',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete user details by id
	  * 
	  */
	 userreg.delUser = function(userId){
		 	console.log(13);	  
		 return $http({
		        url: '/api/userreg/',
				method: "DELETE",
				params:{'userId':userId}
				
			});
			console.log(params);
		}

			 /*
	  * Function : delCheckedUser
	  * Description : Delete details by ids
	  * 
	  */
	 userreg.delCheckedUser = function(userId){
		console.log(12);		  
	   return $http({
			  url: '/api/userreg/delCheckedUser/',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 
	 /*
	  * Function : getUserById
	  * Description : get one user details by id
	  * 
	  */
	 userreg.getUserById = function(userId){
		 return $http({
		        url: '/api/userreg/'+userId,
		        method: "GET"
		    });
	 }
	 
	 /*
	  * 
	  */
	 userreg.updateUser = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/userreg',
				method: "PUT",
		        data:data
		    });
	 }
	 return userreg;
	  
	 
  }
  

}());
