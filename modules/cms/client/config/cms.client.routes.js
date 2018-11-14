(function () {
  'use strict';

  angular
    .module('cms')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {

    var adminheader={
  templateUrl:'/modules/core/client/views/adminheader.html',
  controller:'HeaderController',
  controllerAs:'vm',
}
var adminfooter={
  templateUrl:'/modules/core/client/views/adminfooter.html'
}
    $stateProvider
      .state('cms', {
        abstract: true,
        url: '/cms',
        template: '<ui-view/>'
      })
       .state('category', {
        url: '/settings/cmscategory',
        views:{
          header:adminheader,

          content: { 
           templateUrl: '/modules/cms/client/views/admin/category/category.html',
          controller: 'CategoryController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })
       .state('addcategory', {
        url: '/cms/addcategory',
       // controllerAs: 'vm',
        views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/cms/client/views/admin/category/addcategory.html',
          controller: 'CategoryController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })
      
      .state('editcat', {
        url: '/cms/editcat/:id',
       // controllerAs: 'vm',
        views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/cms/client/views/admin/category/edit.html',
          controller: 'EditCategoryController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })
      /////////////////////////////////////////

      .state('addcmspost', {
        url: '/settings/addcmspost',
       // controllerAs: 'vm',
        views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/cms/client/views/admin/post/addpost1.html',
          controller: 'PostController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })


      .state('post', {
        url: '/settings/cmspost',
       // controllerAs: 'vm',
        views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/cms/client/views/admin/post/post1.html',
          controller: 'PostController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })
      
      .state('editpost', {
        url: '/cms/editpost/:id',
       // controllerAs: 'vm',
        views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/cms/client/views/admin/post/addpost1.html',
          controller: 'PostController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })
      /////////////////////////////////////////////////////////////////
.state('addpage', {
  url: '/cms/addpage',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/cms/client/views/admin/page/addpage.html',
    controller: 'PageController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('page', {
  url: '/cms/page',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/cms/client/views/admin/page/page.html',
    controller: 'PageController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('editpage', {
        url: '/cms/editpage/:id',
       // controllerAs: 'vm',
        views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/cms/client/views/admin/page/edit.html',
          controller: 'EditPageController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })

//////////////////////////////Plugins///////////////////////////////////
.state('plugins', {
  url: '/cms/plugins',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/cms/client/views/admin/plugins/plugins.html',
    controller: 'PluginsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('editplugin', {
        url: '/cms/editplugin/:id',
       // controllerAs: 'vm',
        views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/cms/client/views/admin/plugins/edit.html',
          controller: 'EditPluginsController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })

      
  }

  getCm.$inject = ['$stateParams', 'CmsService'];

  function getCm($stateParams, CmsService) {
    return CmsService.get({
      cmId: $stateParams.cmId
    }).$promise;
  }

  newCm.$inject = ['CmsService'];

  function newCm(CmsService) {
    return new CmsService();
  }
}());
