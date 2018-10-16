(function () {
  'use strict';

  angular
    .module('newsletters')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Newsletters',
      state: 'newsletters',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'newsletters', {
      title: 'Newsletter template',
      state: 'newslettertemplate'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'newsletters', {
      title: 'Newsletters',
      state: 'newsletterslist',
      roles: ['user']
    });
    menuService.addSubMenuItem('topbar', 'newsletters', {
      title: 'Newsletter subscribers',
      state: 'newsletterssubscribe',
      roles: ['user']
    });
  }
}());
