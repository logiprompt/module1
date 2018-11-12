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
	
	 
	
	 return acl;
	  
	 
  }
  

}());
