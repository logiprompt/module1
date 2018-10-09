(function () {
  'use strict';

  angular
    .module('products')
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
      .state('products', {
       // abstract: true,
        url: '/products',
        template: '<ui-view/>'
      })
      .state('procategory', {
        url: '/product/category',
       
         views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/products/client/views/admin/category/category.html',
            controller: 'ProCategoryController',
            controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })
         .state('proaddcategory', {
        url: '/product/addcategory',
       // controllerAs: 'vm',
        views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/products/client/views/admin/category/addcategory.html',
          controller: 'ProCategoryController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })
           .state('editprocat', {
        url: '/product/editcat/:id',
       // controllerAs: 'vm',
        views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/products/client/views/admin/category/edit.html',
          controller: 'EditProCategoryController',
          controllerAs: 'vm',
          },
           footer:adminfooter
        } 
      })
////////////////////////////////////////////////////////////////////////////////////////
.state('proaddproduct', {
  url: '/product/proaddproduct',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/product/addproduct.html',
    controller: 'ProProductController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('proeditproduct', {
  url: '/product/proeditproduct/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/product/edit.html',
    controller: 'EditProductController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

////////////////////////////////////////////////////////////////////////////////////////////////////






.state('edittaxgroups', {
  url: '/product/edittaxgroups/:id',
 //controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/taxgroup/edit.html',
    controller: 'EditProtaxgroupsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('taxgroups', {
  url: '/product/taxgroups',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/taxgroup/taxgroup.html',
      controller: 'ProtaxgroupController',
      controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

   .state('proaddtaxgroups', {
  url: '/product/addtaxgroups',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/taxgroup/addtaxgroup.html',
    controller: 'ProtaxgroupController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})


.state('protaxgroupadd', {
  url: '/product/protaxgroupadd',
 
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/taxgroup/addtaxgroups.html',
      controller: 'ProtaxgroupController',
      controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})






/////////////////////////////////////////////////////////////////////////////////////////////////
.state('progroupadd', {
  url: '/product/progroupadd',
 
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/extrafield/addgroup.html',
      controller: 'ProgroupController',
      controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('extrafield', {
  url: '/product/extrafield',
 
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/extrafield/extrafield.html',
      controller: 'ProextrafieldController',
      controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
   .state('proaddextrafield', {
  url: '/product/addextrafield/:groupid',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/extrafield/addextrafield.html',
    controller: 'ProextrafieldController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
     .state('editproextrafield', {
  url: '/product/editextrafield/:id',
 //controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/extrafield/edit.html',
    controller: 'EditProextrafieldController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

  .state('proproduct', {
  url: '/product/product',
 //controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/product/product.html',
    controller: 'ProProductController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
 .state('shippingpayments', {
  url: '/product/shippingpayments',
 //controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/shippingpayments/shippingpayments.html',
    controller: 'ProProductController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
 .state('taxpayments', {
  url: '/product/taxpayments',
 //controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/taxgroup/taxpayments.html',
    controller: 'ProProductController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
////invoices
.state('invoices', {
  url: '/sales/invoices',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/invoice/invoices.html',
    controller: 'InvoicesController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//sales
    .state('salesorder', {
  url: '/sales/order',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/order/order.html',
    controller: 'SalesOrderController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//   .state('addsales', {
//   url: '/sales/addsales',
//    views:{
//     header:adminheader,
//     content: { 
//      templateUrl: '/modules/products/client/views/admin/order/addsales.html',
//     controller: 'SalesOrderController',
//     controllerAs: 'vm',
//     },
//      footer:adminfooter
//   } 
// })
//    .state('addsalesinvoice', {
//   url: '/sales/addinvoice',
//    views:{
//     header:adminheader,
//     content: { 
//      templateUrl: '/modules/products/client/views/admin/order/addsalesinvoice.html',
//     controller: 'AddSalesInvoiceController',
//     controllerAs: 'vm',
//     },
//      footer:adminfooter
//   } 
// })
    .state('orderdetails', {
  url: '/sales/orderdetails/:id',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/order/orderdetails.html',
    controller: 'OrderDetailsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
    
    .state('orderhold', {
  url: '/sales/orderhold',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/order/orderhold.html',
    controller: 'OrderDetailsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('orderunhold', {
  url: '/sales/orderunhold',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/order/orderunhold.html',
    controller: 'OrderDetailsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

      .state('orderinvoice', {
  url: '/sales/orderinvoice',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/order/orderinvoice.html',
    controller: 'OrderDetailsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('ordershipments', {
  url: '/sales/order/shipments',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/order/shipments.html',
    controller: 'OrderDetailsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('ordercreditmemos', {
  url: '/sales/order/creditmemos',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/order/creditmemos.html',
    controller: 'OrderDetailsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

    .state('orderafterinvoiced', {
  url: '/sales/orderafterinvoiced',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/order/orderafterinvoiced.html',
    controller: 'OrderDetailsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
///////////////reports
 .state('reportorder', {
  url: '/report/orderreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/orderreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
  .state('taxreport', {
  url: '/report/taxreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/taxreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
   .state('invoicereport', {
  url: '/report/invoicereport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/invoicereport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('reportshipping', {
  url: '/report/shippingreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/shippingreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('refundreport', {
  url: '/report/refundreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/refundreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('procartreport', {
  url: '/report/procartreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/productcartreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('abandonedreport', {
  url: '/report/abandonedreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/abandonedreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('productorderedreport', {
  url: '/report/productorderedreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/productorderedreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('mostviewedreport', {
  url: '/report/mostviewedreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/mostviewedreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('lowstockreport', {
  url: '/report/lowstockreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/lowstockreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('newaccountreport', {
  url: '/report/newaccountreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/newaccountreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('customerordersreport', {
  url: '/report/customerordersreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/customerordersreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('wishlistcountryreport', {
  url: '/report/wishlistcountryreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/wishlistcountryreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('wishlistuserreport', {
  url: '/report/wishlistuserreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/wishlistuserreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
    footer:adminfooter
  } 
})

.state('wishlistuserdetreport', {
  url: '/report/wishlistuserdetreport/:id',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/wishlistuserdetreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('customerreviewsreport', {
  url: '/report/customerreviewsreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/customerreviewsreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
    footer:adminfooter
  } 
})
.state('productreviewsreport', {
  url: '/report/productreviewsreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/productreviewsreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
    footer:adminfooter
  } 
})
.state('blogreviewsreport', {
  url: '/report/blogreviewsreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/blogreviewsreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
    footer:adminfooter
  } 
})
.state('blogratingsreport', {
  url: '/report/blogratingsreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/blogratingsreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
    footer:adminfooter
  } 
})
.state('customerratingsreport', {
  url: '/report/customerratingsreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/customerratingsreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
    footer:adminfooter
  } 
})
.state('productratingsreport', {
  url: '/report/productratingsreport',
   views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/products/client/views/admin/report/productratingsreport.html',
    controller: 'OrderReportController',
    controllerAs: 'vm',
    },
    footer:adminfooter
  } 
})

.state('businesstypelist', {
  url: '/product/businesstypelist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     //templateUrl: '/modules/core/client/views/admin/settings/product/businesstypelist.html',
     templateUrl: '/modules/products/client/views/admin/businesstype/businesstypelist.html',
    controller: 'Businesstypelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

 

.state('addproductbusiness', {
  url: '/product/addproductbusiness',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
    templateUrl: '/modules/products/client/views/admin/businesstype/addbusinesstype.html',
    controller: 'Businesstypelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})




  /////////////////end reports    
   ;
  }

  getProduct.$inject = ['$stateParams', 'ProductsService'];

  function getProduct($stateParams, ProductsService) {
    return ProductsService.get({
      productId: $stateParams.productId
    }).$promise;
  }

  newProduct.$inject = ['ProductsService'];

  function newProduct(ProductsService) {
    return new ProductsService();
  }
}());
