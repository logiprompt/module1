// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';
  angular
  .module('emails')
  .service('memoCommentsService', memoCommentsService);
  memoCommentsService.$inject = ['$resource','$http'];
  function memoCommentsService($resource,$http) {
	 var memoComments = {}; 
	 /*
	  * Function : addmemocomments
	  * Description : add memocomments details
	  * owner : ck
	  */
	memoComments.addMemoComments = function(data)
	{	
		console.log(data);	 
	    return $http({
	           url: '/api/memocomments',
	           method: "POST",
	           data:data
	       });
	}
 	/*
	  * Function : getmemocomments
	  * Description : get all memocomments details
	  * owner : ck
	  */
	 memoComments.getMemoComments = function(){		  
		return $http({
			   url: '/api/memocomments',
			   method: "GET"
		   });
	   }
	 /*
	  * Function : deletememocomments
	  * Description : Delete memocomments details by id
	  * owner : ck
	  */
	 memoComments.delMemoComments = function(userId)
		{		  
		 	return $http({
			url: '/api/memocommentsbyid',
				method: "DELETE",
				params:{'userId':userId}
		    });
		}
			 /*
	  * Function : delCheckedmemocomments
	  * Description : Delete details by ids
	  * owner : ck
	  */
	 memoComments.delCheckedMemoComments= function(userId){
		//console.log(userId);		  
	   return $http({
			  url: '/api/memocomments/delCheckedmemoComments',
			  method: "DELETE",
			  params:{'userId':userId}
		  });
	  }
	memoComments.getMemoCommentsById = function(userId){
		// console.log(userId);
		return $http({
			   url: '/api/memocommentsbyid',
			   method: "GET",
			   params:{'userId':userId}
		   });
	}
	 /*
	  * 
	  */
	 memoComments.updateMemoComments = function(userId,data){
		console.log(data);
		 return $http({
		        url: '/api/memocommentsbyid',
		        method: "PUT", 
		        data:data
		    });
	 }
	 return memoComments;	   
  }  
}());
