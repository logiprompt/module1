// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('products')
  .service('taxgroupService', taxgroupService);

  taxgroupService.$inject = ['$resource','$http'];
  function taxgroupService($resource,$http) {
    
	  
	 var taxgroup = {};
	  
	 /*
	  * Function : taxgroup
	  * Description : add taxgroup details
	
	  */
	 taxgroup.addtaxgroup = function(data){
		 
		return $http({
	           url: '/api/taxgroup',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getUsers
	  * Description : get all UserForget details
	 
	  */
	 taxgroup.getTaxGroup = function(){
		  
		return $http({
			   url: '/api/taxgroup',
			   method: "GET"
		   });
	   }
	

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  
	  */
	 taxgroup.delOrderHold = function(userId)
		{		  
		 	return $http({
			url: '/api/orderholdbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	
	  */
	 taxgroup.delCheckedOrderHold= function(userId){
		//console.log(userId);		  
	   return $http({
			  url: '/api/orderhold/delCheckedOrderHold',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 


	 
	taxgroup.getTaxGroupById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/taxgroupbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}

	 /*
	  * 
	  */
	 taxgroup.updateOrderHold = function(userId,data){
		//console.log(userId);
		 return $http({
		        url: '/api/orderholdbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return taxgroup;
	  
	 
  }
  

}());
