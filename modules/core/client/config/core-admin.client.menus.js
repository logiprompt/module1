(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'User management',
      state: 'usermanagementadminuserlist',
      type: 'dropdown',
     // roles: ['admin']
     });

     menuService.addSubMenuItem('topbar', 'usermanagementadminuserlist', {
      title: 'Admin users',
      state: 'usermanagementadminuserlist'
    });
    menuService.addSubMenuItem('topbar', 'usermanagementadminuserlist', {
      title: 'Role & Privileges',
      state: 'usermanagementrole'
    });
  }
}());
