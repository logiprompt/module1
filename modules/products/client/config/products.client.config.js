(function () {
  'use strict';

  angular
    .module('products')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
   //  menuService.addMenuItem('topbar', {
   //    title: 'Products',
   //    state: 'products',
   //    type: 'dropdown',
     
   //  });
    menuService.addMenuItem('topbar', {
      title: 'Sales',
       state: 'sales',
      type: 'dropdown',
     
    });
   //  // Add the dropdown list item
   //  menuService.addSubMenuItem('topbar', 'products', {
   //    title: 'Category',
   //    state: 'procategory'
   //  });

   //  // Add the dropdown create item
   //  menuService.addSubMenuItem('topbar', 'products', {
   //    title: 'Extra Fields',
   //    state: 'extrafield',
     
   //  });
   //   menuService.addSubMenuItem('topbar', 'products', {
   //    title: 'Product',
   //    state: 'proproduct',
     
   //  });
   //  menuService.addSubMenuItem('topbar', 'products', {
   //    title: 'Tax Groups',
   //    state: 'taxgroups',
   //    type: 'dropdown',
   //  });
   //   menuService.addSubMenuItem('topbar', 'products', {
   //    title: 'Tax payments',
   //    state: 'taxpayments',
     
   //  });
	  // menuService.addSubMenuItem('topbar', 'products', {
   //    title: 'Shipping payments',
   //    state: 'shippingpayments',
     
   //  });
   //  //sales submenu
      menuService.addSubMenuItem('topbar', 'sales', {
       title: 'Orders',
       state: 'salesorder',
     
     });
     menuService.addSubMenuItem('topbar', 'sales', {
       title: 'Invoices',
       state: 'invoices',
     
     });
      menuService.addSubMenuItem('topbar', 'sales', {
       title: 'Shipments',
       state: 'ordershipments',
     
     });
      menuService.addSubMenuItem('topbar', 'sales', {
       title: 'Credit memos',
       state: 'ordercreditmemos',
     
     });
  }
}());
