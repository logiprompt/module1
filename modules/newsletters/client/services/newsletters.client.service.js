// Newsletters service used to communicate Newsletters REST endpoints
(function () {
  'use strict';

  angular
    .module('newsletters')
    .service('NewslettersService', NewslettersService);

  //   .factory('NewslettersService', NewslettersService);

  // NewslettersService.$inject = ['$resource'];

  // function NewslettersService($resource) {
  //   return $resource('api/newsletters/:newsletterId', {
  //     newsletterId: '@_id'
  //   }, {
  //     update: {
  //       method: 'PUT'
  //     }
  //   });
  // }

  
  NewslettersService.$inject = ['$resource','$http','Upload'];
  function NewslettersService($resource,$http,Upload) {
    
	  
	 var newsletter = {};
	  
	 /*
	  * Function : addUserForget
	  * Description : add UserForget details
	  * owner : 
    * 
	  */
	 newsletter.addNewsLetter = function(data){
		 console.log(data);
		return Upload.upload({
	           url: '/api/getNewslettertemp',
	           method: "POST",
	           data:data
	       });
	   }

 /*
	  * Function : getUsers
	  * Description : get all UserForget details
	  * owner : 
    * 
	  */
	 newsletter.getNewslettertemp = function(){
		  
		return $http({
			   url: '/api/getNewslettertemp',
			   method: "GET"
		   });
	   }
     newsletter.getnews = function(){
		  
      return $http({
           url: '/api/getnews',
           method: "GET"
         });
       }

	 /*
	  * Function : deleteUser
	  * Description : Delete UserForget details by id
	  * owner : 
    * 
	  */
	 newsletter.delUserForgot = function(userId){		  
		 return $http({
			url: '/api/userforgotbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}

			 /*
	  * Function : delCheckedUserForget
	  * Description : Delete details by ids
	  * owner : 
    * 
	  */
	 newsletter.delCheckedUserForget= function(userId){
		console.log(userId);		  
	   return $http({
			  url: '/api/userforgot/delCheckedUserForgot',
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

	 

  newsletter.getNewsletterById = function(userId){
    return $http({
           url: '/api/getNewsletterById',
       method: "GET",
       params:{'userId':userId}
       });
  }
	 /*
	  * 
	  */
	 newsletter.updateUserForgot = function(userId,data){
		 console.log(userId);
		 return $http({
		        url: '/api/userforgotbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return newsletter;
	  
	 
  }
}());
