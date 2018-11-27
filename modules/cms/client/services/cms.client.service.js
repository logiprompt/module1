// Cms service used to communicate Cms REST endpoints
(function () {
  'use strict';

  angular
    .module('cms')
    .factory('CmsService', CmsService);

  CmsService.$inject = ['$resource','$http','Upload'];
  function CmsService($resource,$http,Upload) {
  var cms = {};
  
	 /*
	  * Function : addPost
	  * Description : add new post
	  * owner : ck
	  */
cms.addPost = function(data){		  
        return Upload.upload({
            url: '/api/cms/post',
            method: "POST",
            data: data
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


cms.delCheckedCmspost = function (postId) {
    return $http({
        url: '/api/cms/post/delCheckedCmspost',
        method: "DELETE",
        params:{'postId':postId}
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

    return Upload.upload({
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
    return Upload.upload({
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

cms.delCheckedCmscategory = function (categoryId) {
    return $http({
        url: '/api/cms/category/delCheckedCmscategory',
        method: "PUT",
        params:{'categoryId':categoryId}
    });
}

cms.getCategoryDetails = function (categoryId) {
    return $http({
        url: '/api/cms/category/getCategoryDetails/' + categoryId,
        method: "GET"
    });
}


cms.updateCategory = function (data) {
    return Upload.upload({
        url: '/api/cms/category/updateCategory',
        method: "POST",
        data: data
    });
}


/*
 * Function : addPage
 * Description : add new page
 */

cms.addPage = function (data) {
    return $http({
        url: '/api/cms/page/addPage',
        method: "POST",
        data: data
    });
}


/*
 * Function : getPageItems
 * Description : get page Items
 */

cms.getPageItems = function () {
    return $http({
        url: '/api/cms/page/getPageItems',
        method: "GET"
    });
}

cms.deletePage = function (pageId) {
    return $http({
        url: '/api/cms/page/deletePage/' + pageId,
        method: "DELETE"
    });
}

cms.getPageDetails = function (pageId) {
    return $http({
        url: '/api/cms/page/getPageDetails/' + pageId,
        method: "GET"
    });
}


cms.updatePage = function (pageId,data) {
    return $http({
        url: '/api/cms/page/updatePage/'+pageId,
        method: "PUT",
        data: data
    });
}

return cms;
  }
}());
