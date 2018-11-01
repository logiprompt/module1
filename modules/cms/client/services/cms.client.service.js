// Cms service used to communicate Cms REST endpoints
(function () {
  'use strict';

  angular
    .module('cms')
    .factory('CmsService', CmsService);

  CmsService.$inject = ['$resource','$http'];
  function CmsService($resource,$http) {
  var cms = {};
  
	 /*
	  * Function : addPost
	  * Description : add new post
	  * owner : prabin
	  */
cms.addPost = function(data){
		  
		return $http({
	           url: '/api/cms/post',
	           method: "POST",
	           data:data
	       });
	   }

cms.listPost = function(){
	  
	return $http({
           url: '/api/cms/post',
           method: "GET"
       });
   }

cms.delete_post = function(id){
	return $http({
        url: '/api/cms/post/'+id,
        method: "DELETE"
    });
}

return cms;
  }
}());
