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
	  * owner : anju
	  */
	 serviceAreaCountry.addRatingAction = function(data){
		 
		return $http({
	           url: '/api/addserviceareacountry',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getserviceAreaCountry
	  * Description : get all serviceAreaCountry details
	  * owner : anju
	  */
	 serviceAreaCountry.getserviceAreaCountry = function(){
		  
		return $http({
			   url: '/api/genserviceareacountry',
			   method: "POST"
		   });
	   }
	

	 /*
	  * Function : delete serviceAreaCountry
	  * Description : Delete serviceAreaCountry details by id
	  * owner : anju
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
	  * owner : anju
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
