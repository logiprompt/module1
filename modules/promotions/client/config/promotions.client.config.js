(function () {
  'use strict';

  angular
    .module('promotions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Promotions',
      state: 'promotions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'promotions', {
      title: 'Product price rules',
      state: 'productpromotions'
    });
	
	   menuService.addSubMenuItemToSubMenu('topbar', 'productpromotions', {
      title: 'Product price rules',
      state: 'productpromotions'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'promotions', {
      title: 'Shipping price rules',
      state: 'promoshipping',
      roles: ['user']
    });
//add drop down catrprice
menuService.addSubMenuItem('topbar', 'promotions', {
  title: 'Cart price rule',
  state: 'promocartlist',
  roles: ['user']
});


    //add drop down coupons
    menuService.addSubMenuItem('topbar', 'promotions', {
      title: 'Coupons',
      state: 'promocoupons',
      roles: ['user']
    });
  }
}());
