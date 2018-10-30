(function () {
  'use strict';

  angular
    .module('cms')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'CMS',
    //   state: 'cms',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'cms', {
    //   title: 'Category',
    //   state: 'category'
    // });

    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'cms', {
    //   title: 'Page',
    //   state: 'page',
    
    // });
    //  menuService.addSubMenuItem('topbar', 'cms', {
    //   title: 'Post',
    //   state: 'post',
     
    // });
    //   menuService.addSubMenuItem('topbar', 'cms', {
    //   title: 'Plugins',
    //   state: 'plugins',
     
    // });
  }
}());
