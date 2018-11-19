// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('core')
  .service('serviceAreaCountryService', serviceAreaCountryService);

  serviceAreaCountryService.$inject = ['$resource','$http'];
  function serviceAreaCountryService($resource,$http) {
    
	  
	 var serviceAreaCountry = {};
	  
	 /*
	  * Function : addserviceAreaCountry
	  * Description : add serviceAreaCountry details
	  * owner : ck
	  */
	 serviceAreaCountry.addgencountrylist = function(data){
		 
		return $http({
	           url: '/api/genserviceareacountries',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getserviceAreaCountry
	  * Description : get all serviceAreaCountry details
	  * owner : ck
	  */
	 serviceAreaCountry.getserviceAreaCountry = function(){
		  
		return $http({
			   url: '/api/genserviceareacountry',
			   method: "POST"
		   });
	   }
	
 /*
	  * Function : getserviceAreaCountry
	  * Description : get all serviceAreaCountry details
	  * owner : ck
	  */
	 serviceAreaCountry.getServiceAreas = function(){
		  
		return $http({
			   url: '/api/genserviceareas',
			   method: "POST"
		   });
	   }
	 /*
	  * Function : delete serviceAreaCountry
	  * Description : Delete serviceAreaCountry details by id
	  * owner : ck
	  */
	 serviceAreaCountry.delserviceAreaCountry = function(userId){		  
		 return $http({
			url: '/api/serviceareacountrybyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedserviceAreaCountry
	  * Description : Delete details by ids
	  * owner : ck
	  */
	 serviceAreaCountry.delCheckedserviceAreaCountry= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/serviceareacountry/delCheckedserviceAreaCountry',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
   
	 
	 /*
	  * Function : getUserForgetById
	  * Description : get one UserForget details by id
	
	  */

	  
	//  userforgot.getUserForgotById = function(userId){
	// 	 return $http({
	// 	        url: '/api/userforgotid',
	// 			method: "GET",
	// 			params:{userId:userId}
	// 	    });
	//  }

	 
	 serviceAreaCountry.getserviceAreaCountryById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/serviceareacountrybyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 serviceAreaCountry.updateserviceAreaCountry = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/serviceareacountrybyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return serviceAreaCountry;
	  
	 
  }
  

}());
