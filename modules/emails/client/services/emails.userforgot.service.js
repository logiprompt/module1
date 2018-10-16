// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('core')
  .service('userforgotService', userforgotService);

  userforgotService.$inject = ['$resource','$http'];
  function userforgotService($resource,$http) {
    
	  
	 var userforgot = {};
	  
	 /*
	  * Function : addUserForget
	  * Description : add UserForget details
	  * owner : jeeja
	  */
	 userforgot.addUserForgot = function(data){
		 
		return $http({
	           url: '/api/userforgot',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getUsers
	  * Description : get all UserForget details
	  * owner : jeeja
	  */
	 userforgot.getUserForgot = function(){
		  
		return $http({
			   url: '/api/userforgot',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  * owner : prabin
	  */
	 userforgot.deleteUserForgot = function(userId){		  
		 return $http({
		        url: '/api/userforgot/'+userId,
		        method: "DELETE"
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	  * owner : jeeja
	  */
	 userforgot.delCheckedUserForgot= function(userId){
		console.log(12);		  
	   return $http({
			  url: '/api/userforgot/delCheckedUserForgot/'+userId,
			  method: "DELETE"
		  });
	  }
   
	 
	 /*
	  * Function : getUserForgetById
	  * Description : get one UserForget details by id
	  * owner : jeeja
	  */
	 userforgot.getUserForgotById = function(userId){
		 return $http({
		        url: '/api/userforgot/'+userId,
		        method: "GET"
		    });
	 }
	 
	 /*
	  * 
	  */
	 userforgot.updateUserForgot = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/userforgot/'+userId,
		        method: "PUT",
		        data:data
		    });
	 }
	 return userforgot;
	  
	 
  }
  

}());
