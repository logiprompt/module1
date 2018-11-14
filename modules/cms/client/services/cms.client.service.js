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

cms.getPostById = function(id){
	return $http({
        url: '/api/cms/post/'+id,
        method: "GET"
    });
}

cms.updatePostById = function(id,data){
	return $http({
        url: '/api/cms/post/'+id,
        method: "PUT",
        data:data
    });
}



/*
 * Function : addCategory
 * Description : add new category
 */

cms.addCategory = function (data) {
    return $http({
        url: '/api/cms/category/addCategory',
        method: "POST",
        data: data
    });
}

/*
 * Function : addSubCategory
 * Description : add sub category
 */

cms.addSubCategory = function (data) {
    return $http({
        url: '/api/cms/category/addSubCategory',
        method: "POST",
        data: data
    });
}

/*
 * Function : getCategoryItems
 * Description : get category Items
 */

cms.getCategoryItems = function () {
    return $http({
        url: '/api/cms/category/getCategoryItems',
        method: "GET"
    });
}

cms.deleteCategory = function (categoryId) {
    return $http({
        url: '/api/cms/category/deleteCategory/' + categoryId,
        method: "PUT"
    });
}

cms.getCategoryDetails = function (categoryId) {
    return $http({
        url: '/api/cms/category/getCategoryDetails/' + categoryId,
        method: "GET"
    });
}


cms.updateCategory = function (data) {
    return $http({
        url: '/api/cms/category/updateCategory',
        method: "POST",
        data: data
    });
}


return cms;
  }
}());
