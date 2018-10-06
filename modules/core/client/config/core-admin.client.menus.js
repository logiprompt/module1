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
	
	menuService.addMenuItem('topbar', {
      title: 'Settings',
      state: 'settingscountry',
      type: 'dropdown',
     // roles: ['admin']
     });
	  menuService.addSubMenuItem('topbar', 'settingscountry', {
      title: 'Location',
      state: 'countryadd',
	  type: 'dropdown',
	  class: 'has-arrow'
    });
	 menuService.addSubMenuItemToSubMenus('topbar','countryadd', {
      title: 'Country',
      state: 'countryadd',
	  type: 'dropdown',
    });
	/* menuService.addSubMenuItemToSubMenus('topbar','countryadd', {
      title: 'State',
      state: 'settingsstate',
	  type: 'dropdown',
    });*/
  }
}());
