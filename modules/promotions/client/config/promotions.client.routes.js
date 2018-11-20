(function () {
  'use strict';

  angular
    .module('promotions')
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
     /////////////////////////////////////////

     .state('promocoupons', {
      url: '/promotions/coupons',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/coupons/coupons.html',
        controller: 'PromocouponController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
    .state('promoaddcoupons', {
      url: '/promotions/addcoupons',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/coupons/addcoupons.html',
        controller: 'PromocouponController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })

    .state('promoeditcoupons', {
      url: '/promotions/editcoupons/:id',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/coupons/edit.html',
        controller: 'PromocouponController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
    ///////////////////////shipping//////////////////////
    .state('promoaddshipping', {
      url: '/promotions/addshipping',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/shipping/addshipping.html',
        controller: 'PromoshipController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
    .state('promoeditshipping', {
      url: '/promotions/editshipping/:id',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/shipping/edit.html',
        controller: 'PromoshipController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
    
    .state('promoshipping', {
      url: '/promotions/shipping',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/shipping/shipping.html',
        controller: 'PromoshipController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
    ////////////////////////end shipping////////////////////
    /////////////////////////z///////////////////////////////////
    .state('promoaddcart', {
      url: '/promotions/addcartprice',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/cart/addcartprice.html',
        controller: 'PromocartController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
    .state('promoeditcart', {
      url: '/promotions/editcartprice/:id',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/cart/edit.html',
        controller: 'PromocartController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
    
    .state('promocartlist', {
      url: '/promotions/cartprice',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/cart/cartprice.html',
        controller: 'PromocartController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
    .state('promoaddproduct', {
      url: '/promotions/addproductprice',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/product/addproductprice.html',
        controller: 'PromoproductController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
    .state('promoeditproduct', {
      url: '/promotions/editproductprice/:id',
     // controllerAs: 'vm',
      views:{
        header:adminheader,
        content: { 
         templateUrl: '/modules/promotions/client/views/admin/promotions/product/edit.html',
        controller: 'PromoproductController',
        controllerAs: 'vm',
        },
         footer:adminfooter
      } 
    })
/////////////////////////////////////////////////
     .state('productpromotions', {
     url: '/promotions/productrules',
 //controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/promotions/client/views/admin/promotions/product/product.html',
    controller: 'PromoproductController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
});



  }

  getPromotion.$inject = ['$stateParams', 'PromotionsService'];

  function getPromotion($stateParams, PromotionsService) {
    return PromotionsService.get({
      promotionId: $stateParams.promotionId
    }).$promise;
  }

  newPromotion.$inject = ['PromotionsService'];

  function newPromotion(PromotionsService) {
    return new PromotionsService();
  }
}());
