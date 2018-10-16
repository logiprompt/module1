(function () {
  'use strict';

  angular
    .module('emails')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Emails',
      state: 'emails',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'emails', {
      title: 'List Emails',
      state: 'emails.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'emails', {
      title: 'Create Email',
      state: 'emails.create',
      roles: ['user']
    });
  }
}());
