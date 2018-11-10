// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('core')
  .service('aclService', aclService);

  aclService.$inject = ['$resource','$http'];
  function aclService($resource,$http) {
    
	  
	 var acl = {};
	  
	 /*
	  * Function : addacl
	  * Description : add acl details
	 
	  */
	 acl.addAcl = function(data){
		 //console.log(data);
		return $http({
	           url: '/api/acl/create',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 

 /*
	  * Function : getExtraFieldGroups
	  * Description : get All acl details
	  
	  */
	 acl.getacl = function(){
		  
		return $http({
			   url: '/api/acl/getacl',
			   method: "POST"
		   });
	   }
	

	 /*
	  * Function : delacl
	  * Description : Delete acl details by id
	
	  */
	 acl.delacl = function(aclId){		  
		 return $http({
		        url: '/api/acl/'+aclId,
		        method: "DELETE"
		    });
		}
	 

		 /*
	  * Function : delCheckedacl
	  * Description : Delete acl details by ids
	  
	  */
	 acl.delCheckedacl = function(aclId){
		 console.log(12);		  
		return $http({
			   url: '/api/acl/delCheckedacl/'+aclId,
			   method: "DELETE"
		   });
	   }
	
	 /*
	  * Function : getaclById
	  * Description : get one acl details by id
	 
	  */
	 acl.getAclList = function(userID){
		return $http({
			   url: '/api/acl',
			   method: "POST",
			 params:{'userID':userID}
		   });
	}
	
	 
	 /*
	  * 
	  */
	 acl.updateacl = function(aclId,data){
		 return $http({
		        url: '/api/acl/'+aclId,
		        method: "PUT",
		        data:data
		    });
	 }
	 return acl;
	  
	 
  }
  

}());
