// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('core')
  .service('mainstoreService', mainstoreService);

  mainstoreService.$inject = ['$resource','$http'];
  function mainstoreService($resource,$http) {
    
	  
	 var mainstore = {};
	  
	 /*
	  * Function : insMainstore
	  * Description : add Mainstore details
	  * owner : anju
	  */
	 mainstore.insMainstore = function(data){
		 
		return $http({
	           url: '/api/insMainstore',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getCountry
	  * Description : get all Country details
	  * owner : anju
	  */
	 mainstore.getCountrys = function(){
		 
		return $http({
			   url: '/api/insMainstores',
			   method: "POST"
		   });
	   }
	   
/*
	  * Function : getState
	  * Description : get all State details
	  * owner : anju
	  */
	   
	    mainstore.getStatesbyId = function(changeId){
		 console.log(changeId);
		return $http({
			   url: '/api/getsStatesbyId',
			   method: "POST",
			   data:{'userId':changeId}
		   });
	}
	
	/*
	  * Function : getDistrict
	  * Description : get all District details
	  * owner : anju
	  */
	   
	    mainstore.getDistrictbyId = function(stateId){
		 console.log(stateId);
		return $http({
			   url: '/api/getsDistrictbyId',
			   method: "POST",
			   data:{'userId':stateId}
		   });
	}
	

	 /*
	  * Function : delete cmsratingaction
	  * Description : Delete cmsratingaction details by id
	  * owner : anju
	  */
	 mainstore.delCmsratingAction = function(userId){		  
		 return $http({
			url: '/api/cmsratingactionbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedcmsratingaction
	  * Description : Delete details by ids
	  * owner : anju
	  */
	 mainstore.delCheckedCmsratingAction= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/cmsratingaction/delCheckedCmsratingAction',
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

	 
	 mainstore.getCmsratingActionById = function(userId){
		 console.log(userId);
		return $http({
			   url: '/api/cmsratingactionbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 mainstore.updateCmsratingAction = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/cmsratingactionbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return mainstore;
	  
	 
  }
  

}());
