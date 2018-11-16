// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('emails')
  .service('subService',subService);

  subService.$inject = ['$resource','$http'];
  function subService($resource,$http) {
    
	  
	 var subService = {};
	  
	 /*
	  * Function : adduser
	  * Description : add user details
	  * owner : jeeja
	  */
	 subService.addSub = function(data){
		 
		return $http({
	           url: '/api/addSub',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 

 /*
	  * Function : getUsers
	  * Description : get all user details
	  * owner : jeeja
	  */
	 subService.getsub = function(){
		  
		return $http({
			   url: '/api/addSub',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteInvoice
	  * Description : Delete user details by id
	  * 
	  */
	 subService.delsub = function(userId){
		 	console.log(13);	  
		 return $http({
		        url: '/api/addSub/',
				method: "DELETE",
				params:{'userId':userId}
				
			});
			console.log(params);
		}

			 /*
	  * Function : delCheckedinvoice
	  * Description : Delete details by ids
	  * 
	  */
	 subService.delcheckeditem = function(userId){
		console.log(12);		  
	   return $http({
			  url: '/api/delcheckeditem',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 
	 /*
	  * Function : getUserById
	  * Description : get one user details by id
	  * 
	  */
	 subService.getSubById = function(userId){
		 console.log(1111);
		 return $http({
		        url: '/api/getsub',
				method: "GET",
				params:{'userId':userId}
		    });
	 }
	 
	 /*
	  * 
	  */
	 subService.updateSub = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/updateSub',
				method: "PUT",
		        data:data
		    });
	 }
	 return subService;
	  
	 
  }
  

}());
