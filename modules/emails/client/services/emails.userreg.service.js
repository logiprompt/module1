// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('core')
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
	  * owner : prabin
	  */
	 userreg.delUser = function(userId){		  
		 return $http({
		        url: '/api/userreg/delUser/'+userId,
		        method: "DELETE"
		    });
		}

			 /*
	  * Function : delCheckedUser
	  * Description : Delete details by ids
	  * owner : jeeja
	  */
	 userreg.delCheckedUser = function(userId){
		console.log(12);		  
	   return $http({
			  url: '/api/userreg/delCheckedUser/'+userId,
			  method: "DELETE"
		  });
	  }
   
	 
	 /*
	  * Function : getUserById
	  * Description : get one user details by id
	  * owner : jeeja
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
		        url: '/api/userreg/updateUser/'+userId,
		        method: "POST",
		        data:data
		    });
	 }
	 return userreg;
	  
	 
  }
  

}());
