// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('core')
  .service('userMngAdminUserService', userMngAdminUserService);

  userMngAdminUserService.$inject = ['$resource','$http'];
  function userMngAdminUserService($resource,$http) {
    
	  
	 var userMngAdminUser = {};
	  
	 /*
	  * Function : addacl
	  * Description : add acl details
	  * owner : jeeja
	  */
	//  userMngAdminUser.addAcl = function(data){
		 
	// 	return $http({
	//            url: '/api/acl/create',
	//            method: "POST",
	//            data:data
	//        });
	//    }
	 
	 

 /*
	  * Function : getExtraFieldGroups
	  * Description : get All acl details
	  * owner : jeeja
	  */
	//  acl.getacl = function(){
		  
	// 	return $http({
	// 		   url: '/api/acl/getacl',
	// 		   method: "POST"
	// 	   });
	//    }
	

	 /*
	  * Function : delacl
	  * Description : Delete acl details by id
	  * owner : jeeja
	  */
	//  acl.delacl = function(aclId){		  
	// 	 return $http({
	// 	        url: '/api/acl/'+aclId,
	// 	        method: "DELETE"
	// 	    });
	// 	}
	 

		 /*
	  * Function : delCheckedacl
	  * Description : Delete acl details by ids
	  * owner : jeeja
	  */
	//  acl.delCheckedacl = function(aclId){
	// 	 console.log(12);		  
	// 	return $http({
	// 		   url: '/api/acl/delCheckedacl/'+aclId,
	// 		   method: "DELETE"
	// 	   });
	//    }
	
	 /*
	  * Function : getaclById
	  * Description : get one acl details by id
	  * owner : 
	  */

	 userMngAdminUser.getAdminUserById = function(userId){
		return $http({
			   url: '/api/admin/selectAdminuser/',
			   method: "POST",
			   params:{'userId':userId}
			  // params:{'userId':'userId'}
		   });
	}
	
	 
	 /*
	  * 
	  */

	 userMngAdminUser.updateUser = function(userId,data){
		 return $http({
		        url: '/api/admin/selectAdminusers/'+userId,
		        method: "PUT",
		        data:data
		    });
	 }

	 return userMngAdminUser;
	  
	 
  }
  

}());
