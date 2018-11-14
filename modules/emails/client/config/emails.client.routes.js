(function () {
  'use strict';

  angular
    .module('emails')
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
      .state('emails', {
        abstract: true,
        url: '/emails',
        template: '<ui-view/>'
      })


//////////////////////////email/////////b/////////////c////////////
//////////////////////////user//////////////////////////////////
.state('emailuserlist', {
  url: '/email/userreglist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/user/userreg/userregist.html',
    controller: 'EmailuserregController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('emailuserreg', {
  url: '/email/adduserreg',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/user/userreg/adduser.html',
    controller: 'EmailuserregController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailuseredit', {
  url: '/email/edituserreg/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/user/userreg/edit.html',
    controller: 'Useredit',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
///////////////////////////////////////////////////////////
//////////////////////////forgot//////////////////////////////////
.state('emailforgetpass', {
  url: '/email/forgetpasslist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/user/forget/forget.html',
    controller: 'EmailuserforgotController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('emailaddforgetpass', {
  url: '/email/addforgetpass',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/user/forget/addforget.html',
    controller: 'EmailuserforgotController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditforgetpass', {
  url: '/email/editforgetpass/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/user/forget/edit.html',
    controller: 'Emailuserforgotedit',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
//////////////////////////////order/////////////////////////////
//////////////////////////creation//////////////////////////////////
.state('emailordercreation', {
  url: '/email/ordercreation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/creation/ordercreation.html',
    controller: 'OrdercreationController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('emailaddcreation', {
  url: '/email/addcreation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/creation/addcreation.html',
    controller: 'OrdercreationController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditcreation', {
  url: '/email/editcreation/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/creation/edit.html',
    controller: 'Emailordercreationedit',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////paymentfailure//////////////////////////////////
.state('emailpaymentfailure', {
  url: '/email/paymentfailure',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/paymentfailure/paymentfailure.html',
    controller: 'PaymentFailureController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('emailaddpaymentfailure', {
  url: '/email/addpaymentfailure',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/paymentfailure/addpaymentfailure.html',
    controller: 'AddpaymentfailureController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditpaymentfailure', {
  url: '/email/editpaymentfailure/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/paymentfailure/edit.html',
    controller: 'EditPaymentFailureController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////nostock item//////////////////////////////////
.state('emailnostocklist', {
  url: '/email/nostocklist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/nostock/nostockitem.html',
    controller: 'OrdernostockListController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('emailaddnostock', {
  url: '/email/addnostock',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/nostock/addnostockitem.html',
    controller: 'OrdernostockController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditnostock', {
  url: '/email/editnostock/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/nostock/edit.html',
    controller: 'OrdernostockEdit',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////hold //////////////////////////////////
.state('emailhold', {
  url: '/email/hold',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/hold/hold.html',
    controller: 'OrderholdlistController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddhold', {
  url: '/email/orderhold',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/hold/addhold.html',
    controller: 'OrderholdController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailedithold', {
  url: '/email/editorderhold/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/hold/edit.html',
     controller: 'OrderholdeditController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////unhold//////////////////////////////////
.state('emailunhold', {
  url: '/email/unhold',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/unhold/unhold.html',
    controller: 'OrderunholdlistController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddunhold', {
  url: '/email/order/unholdcreation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/unhold/addunhold.html',
    controller: 'OrderUnholdController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditunhold', {
  url: '/email/order/editunhold/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/unhold/edit.html',
    controller: 'OrderUnholdeditController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////order comments//////////////////////////////////
.state('emailordercomments', {
  url: '/email/ordercomments',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/ordercomments/ordercomments.html',
    controller: 'OrdercommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddordercomments', {
  url: '/email/addordercomments',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/ordercomments/addordercomments.html',
    controller: 'AddOrdercommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditordercomments', {
  url: '/email/editordercomments/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/ordercomments/edit.html',
    controller: 'EditOrdercommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////Cancelation //////////////////////////////////
.state('emailcancelation', {
  url: '/email/cancelation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/cancelation/cancelation.html',
    controller: 'OrdercancelationlistController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddcancelation', {
  url: '/email/addcancelation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/cancelation/addcancelation.html',
    controller: 'OrdercancelationController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditcancelation', {
  url: '/email/editcancelation/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/cancelation/edit.html',
    controller: 'OrdercancelationeditController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})


//////////////////////////orderprocess //////////////////////////////////
.state('emailorderprocess', {
  url: '/email/orderprocess',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/orderprocess/orderprocess.html',
    controller: 'OrderprocessController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddorderprocess', {
  url: '/email/addorderprocess',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/orderprocess/addorderprocess.html',
    controller: 'AddOrderprocessController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditorderprocess', {
  url: '/email/editorderprocess/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/orderprocess/edit.html',
    controller: 'OrderprocessController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})


//////////////////////////ordercompletion //////////////////////////////////
.state('emailordercompletion', {
  url: '/email/ordercompletion',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/ordercompletion/ordercompletion.html',
    controller: 'OrdercompletionlistController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddordercompletion', {
  url: '/email/addordercompletion',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/ordercompletion/addordercompletion.html',
    controller: 'OrderCompletionaddController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditordercompletion', {
  url: '/email/editordercompletion/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/order/ordercompletion/edit.html',
    controller: 'OrdercompletioneditController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
////////////////////////////invoice////////////////////////////////////
//////////////////////////invoice creation //////////////////////////////////
.state('emailinvoicecreation', {
  url: '/email/invoicecreation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/invoice/invoicecreation/invoicecreation.html',
    controller: 'EmailinvoicecreationController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddinvoicecreation', {
  url: '/email/addinvoicecreation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/invoice/invoicecreation/addinvoicecreation.html',
    controller: 'EmailinvoicecreationController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditinvoicecreation', {
  url: '/email/editinvoicecreation/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/invoice/invoicecreation/edit.html',
    controller: 'EmailinvoicecreationeditController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////invoice comments //////////////////////////////////
.state('emailinvoicecomments', {
  url: '/email/invoicecomments',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/invoice/invoicecomments/invoicecomments.html',
    controller: 'EmailinvoicecommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddinvoicecomments', {
  url: '/email/addinvoicecomments',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/invoice/invoicecomments/addinvoicecomments.html',
    controller: 'EmailinvoicecommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditinvoicecomments', {
  url: '/email/editinvoicecomments/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/invoice/invoicecomments/edit.html',
    controller: 'EmailinvoicecommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})


//////////////////////////credit memo//////////////////////////////////////
////////////////////////// credit memo creation  //////////////////////////////////
.state('emailmemocreation', {
  url: '/email/memocreation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/creditmemo/memocreation/memocreation.html',
    controller: 'MemoCreationListController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddmemocreation', {
  url: '/email/addmemocreation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/creditmemo/memocreation/addmemocreation.html',
    controller: 'EmailmemocreationController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditmemocreation', {
  url: '/email/editmemocreation/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/creditmemo/memocreation/edit.html',
    controller: 'EmailMemoCreationEdit',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

////////////////////////// credit memo comments  //////////////////////////////////
.state('emailmemocomments', {
  url: '/email/memocomments',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/creditmemo/memocomments/memocomments.html',
    controller: 'EmailmemocommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddmemocomments', {
  url: '/email/addmemocomments',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/creditmemo/memocomments/addmemocomments.html',
    controller: 'EmailmemocommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditmemocomments', {
  url: '/email/editmemocomments/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/creditmemo/memocomments/edit.html',
    controller: 'EmailmemocommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

////////////////////////////////shipment////////////////////////////////
//////////////////////////shipment creation//////////////////////////////////
.state('emailshipmentcreation', {
  url: '/email/shipmentcreation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/shipments/shipmentcreation/shipmentcreation.html',
    controller: 'EmailshipmentcreationController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddshipmentcreation', {
  url: '/email/addshipmentcreation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/shipments/shipmentcreation/addshipmentcreation.html',
    controller: 'EmailshipmentcreationController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditshipmentcreation', {
  url: '/email/editshipmentcreation/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/shipments/shipmentcreation/edit.html',
    controller: 'EmailshipmentcreationController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////shipment comments//////////////////////////////////
.state('emailshipmentcomments', {
  url: '/email/shipmentcomments',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/shipments/shipmentcomments/shipmentcomments.html',
    controller: 'EmailshipmentcommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddshipmentcomments', {
  url: '/email/addshipmentcomments',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/shipments/shipmentcomments/addshipmentcomments.html',
    controller: 'EmailshipmentcommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditshipmentcomments', {
  url: '/email/editshipmentcomments/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/shipments/shipmentcomments/edit.html',
    controller: 'EmailshipmentcommentsController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////shipment updates//////////////////////////////////
.state('emailshipmentupdates', {
  url: '/email/shipmentupdates',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/shipments/shipmentupdates/shipmentupdates.html',
    controller: 'EmailshipmentupdatesController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddshipmentupdates', {
  url: '/email/addshipmentupdates',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/shipments/shipmentupdates/addshipmentupdates.html',
    controller: 'EmailshipmentupdatesController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditshipmentupdates', {
  url: '/email/editshipmentupdates/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/shipments/shipmentupdates/edit.html',
    controller: 'EmailshipmentupdatesController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

/////////////////////////////////promotion///////////////////////////////
//////////////////////////share with user//////////////////////////////////
.state('emailshareusers', {
  url: '/email/shareusers',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/promotion/shareusers/shareusers.html',
    controller: 'Emailshareusers',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddshareusers', {
  url: '/email/addshareusers',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/promotion/shareusers/addshareusers.html',
    controller: 'Emailshareusers',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditshareusers', {
  url: '/email/editshareusers/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/promotion/shareusers/edit.html',
    controller: 'Emailshareusers',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
////////////////////////////offlinevendors///////////////////////////////////////////
.state('manageofflinevendors', {
  url: '/offlinevendors/manageofflinevendors',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/manageofflinevendors.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('offlinevendorprofile', {
  url: '/offlinevendors/vendorprofile',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/add/vendorprofile.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('offlinechangepassword', {
  url: '/offlinevendors/changepassword',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/add/changepassword.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('offlineshopprofile', {
  url: '/offlinevendors/shopprofile',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/add/shopprofile.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('offlineshopcontact', {
  url: '/offlinevendors/shopcontact',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/add/shopcontact.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('offlineshoplocation', {
  url: '/offlinevendors/shoplocation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/add/shoplocation.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('offlineverification', {
  url: '/offlinevendors/verification',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/add/verification.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('offlinevendorpv', {
  url: '/offlinevendors/pv',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/add/pv.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('offlinesalesinvoice', {
  url: '/offlinevendors/sales/invoice',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/add/sales/salesinvoice.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('offlinesalesinvoiceedit', {
  url: '/offlinevendors/sales/invoice/edit/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/offlinevendors/add/sales/editsalesinvoice.html',
    controller: 'Manageofflinevendors',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////product///////////////////////////////
//////////////////////////  reviwew submission//////////////////////////////////
.state('emailreviewsubmission', {
  url: '/email/reviewsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/reviewsubmission/reviewsubmission.html',
    controller: 'EmailreviewsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddreviewsubmission', {
  url: '/email/addreviewsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/reviewsubmission/addreviewsubmission.html',
    controller: 'EmailreviewsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditreviewsubmission', {
  url: '/email/editreviewsubmission/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/reviewsubmission/edit.html',
    controller: 'EmailreviewsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////  rating submission//////////////////////////////////
.state('emailratingsubmission', {
  url: '/email/ratingsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/ratingsubmission/ratingsubmission.html',
    controller: 'EmailratingsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddratingsubmission', {
  url: '/email/addratingsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/ratingsubmission/addratingsubmission.html',
    controller: 'EmailratingsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditratingsubmission', {
  url: '/email/editratingsubmission/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/ratingsubmission/edit.html',
    controller: 'EmailratingsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

/////////////////////////  tag submission//////////////////////////////////
.state('emailtagsubmission', {
  url: '/email/tagsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/tagsubmission/tagsubmission.html',
    controller: 'EmailtagsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddtagsubmission', {
  url: '/email/addtagsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/tagsubmission/addtagsubmission.html',
    controller: 'EmailtagsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailedittagsubmission', {
  url: '/email/edittagsubmission/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/tagsubmission/edit.html',
    controller: 'EmailtagsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

/////////////////////////  review admin action//////////////////////////////////
.state('emailproductreviewaction', {
  url: '/email/productreviewaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/productreviewaction/reviewaction.html',
    controller: 'EmailpdtreviewactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddproductreviewaction', {
  url: '/email/addproductreviewaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/productreviewaction/addreviewaction.html',
    controller: 'EmailpdtreviewactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditproductreviewaction', {
  url: '/email/editproductreviewaction/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/productreviewaction/edit.html',
    controller: 'EmailpdtreviewactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

/////////////////////////  rating admin action//////////////////////////////////
.state('emailproductratingaction', {
  url: '/email/productratingaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/productratingaction/ratingaction.html',
    controller: 'EmailpdtratingactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddproductratingaction', {
  url: '/email/addproductratingaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/productratingaction/addratingaction.html',
    controller: 'EmailpdtratingactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditproductratingaction', {
  url: '/email/editproductratingaction/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/productratingaction/edit.html',
    controller: 'EmailpdtratingactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

/////////////////////////  tag admin action//////////////////////////////////
.state('emailproducttagaction', {
  url: '/email/producttagaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/producttagaction/tagaction.html',
    controller: 'EmailpdttagactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddproducttagaction', {
  url: '/email/addproducttagaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/producttagaction/addtagaction.html',
    controller: 'EmailpdttagactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditproducttagaction', {
  url: '/email/editproducttagaction/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/product/producttagaction/edit.html',
    controller: 'EmailpdttagactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
//////////////////////////////////cms/////////////////////////////////
//////////////////////////cms  reviwew submission//////////////////////////////////
.state('emailcmsreviewsubmission', {
  url: '/email/cmsreviewsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsreviewsubmission/reviewsubmission.html',
    controller: 'EmailcmsreviewsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddcmsreviewsubmission', {
  url: '/email/addcmsreviewsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsreviewsubmission/addreviewsubmission.html',
    controller: 'EmailcmsreviewsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditcmsreviewsubmission', {
  url: '/email/editcmsreviewsubmission/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsreviewsubmission/edit.html',
    controller: 'EmailcmsreviewsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

////////////////////////// cms rating submission//////////////////////////////////
.state('emailcmsratingsubmission', {
  url: '/email/cmsratingsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsratingsubmission/ratingsubmission.html',
    controller: 'EmailcmsratingsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddcmsratingsubmission', {
  url: '/email/addcmsratingsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsratingsubmission/addratingsubmission.html',
    controller: 'EmailcmsratingsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditcmsratingsubmission', {
  url: '/email/editcmsratingsubmission/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsratingsubmission/edit.html',
    controller: 'EmailcmsratingsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

///////////////////////// cms tag submission//////////////////////////////////
.state('emailcmstagsubmission', {
  url: '/email/cmstagsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmstagsubmission/tagsubmission.html',
    controller: 'EmailcmstagsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddcmstagsubmission', {
  url: '/email/addcmstagsubmission',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmstagsubmission/addtagsubmission.html',
    controller: 'EmailcmstagsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditcmstagsubmission', {
  url: '/email/editcmstagsubmission/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmstagsubmission/edit.html',
    controller: 'EmailcmstagsubmissionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

///////////////////////// cms review admin action//////////////////////////////////
.state('emailcmsreviewaction', {
  url: '/email/cmsreviewaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsreviewaction/reviewaction.html',
    controller: 'EmailcmsreviewactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddcmsreviewaction', {
  url: '/email/addcmsreviewaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsreviewaction/addreviewaction.html',
    controller: 'EmailcmsreviewactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditcmsreviewaction', {
  url: '/email/editcmsreviewaction/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsreviewaction/edit.html',
    controller: 'EmailcmsreviewactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

///////////////////////// cms rating admin action//////////////////////////////////
.state('emailcmsratingaction', {
  url: '/email/cmsratingaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsratingaction/ratingaction.html',
    controller: 'EmailcmsratingactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddcmsratingaction', {
  url: '/email/addcmsratingaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsratingaction/addratingaction.html',
    controller: 'EmailcmsratingactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditcmsratingaction', {
  url: '/email/editcmsratingaction/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmsratingaction/edit.html',
    controller: 'EmailcmsratingactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

///////////////////////// cms  tag admin action//////////////////////////////////
.state('emailcmstagaction', {
  url: '/email/cmstagaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmstagaction/tagaction.html',
    controller: 'EmailcmstagactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddcmstagaction', {
  url: '/email/addcmstagaction',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmstagaction/addtagaction.html',
    controller: 'EmailcmstagactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditcmstagaction', {
  url: '/email/editcmstagaction/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/cms/cmstagaction/edit.html',
    controller: 'EmailcmstagactionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////newsletter///////////////////
/////////////////////email confirmation/////////////////////
.state('emailconfirmation', {
  url: '/email/emailconfirmation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/newsletter/emailconfirmation/emailconfirmation.html',
    controller: 'EmailnewsletterconfirmController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddemailconfirmation', {
  url: '/email/addemailconfirmation',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/newsletter/emailconfirmation/addemailconfirmation.html',
    controller: 'EmailnewsletterconfirmController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditemailconfirmation', {
  url: '/email/editemailconfirmation/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/newsletter/emailconfirmation/edit.html',
    controller: 'EmailnewsletterconfirmController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
/////////////////////////subscription/////////////////////////////////
.state('emailsubscription', {
  url: '/email/subscription',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/newsletter/subscription/subscription.html',
    controller: 'EmailnewslettersubscriptionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddsubscription', {
  url: '/email/addsubscription',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/newsletter/subscription/addsubscription.html',
    controller: 'EmailnewslettersubscriptionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditsubscription', {
  url: '/email/editsubscription/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/newsletter/subscription/edit.html',
    controller: 'EmailnewslettersubscriptionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

/////////////////////////sucessfullsubscription/////////////////////////////////
.state('emailsuccessfullsubscription', {
  url: '/email/successfullsubscription',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/newsletter/successfullsubscription/subscription.html',
    controller: 'EmailsuccessfullsubscriptionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emailaddsuccessfullsubscription', {
  url: '/email/addsuccessfullsubscription',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/newsletter/successfullsubscription/addsubscription.html',
    controller: 'EmailsuccessfullsubscriptionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('emaileditsuccessfullsubscription', {
  url: '/email/editsuccessfullsubscription/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/emails/client/views/admin/newsletter/successfullsubscription/edit.html',
    controller: 'EmailsuccessfullsubscriptionController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
////////////////////////////////////////////////////////////////////









      // .state('emails.list', {
      //   url: '',
      //   templateUrl: 'modules/emails/client/views/list-emails.client.view.html',
      //   controller: 'EmailsListController',
      //   controllerAs: 'vm',
      //   data: {
      //     pageTitle: 'Emails List'
      //   }
      // })
      // .state('emails.create', {
      //   url: '/create',
      //   templateUrl: 'modules/emails/client/views/form-email.client.view.html',
      //   controller: 'EmailsController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     emailResolve: newEmail
      //   },
      //   data: {
      //     roles: ['user', 'admin'],
      //     pageTitle: 'Emails Create'
      //   }
      // })
      // .state('emails.edit', {
      //   url: '/:emailId/edit',
      //   templateUrl: 'modules/emails/client/views/form-email.client.view.html',
      //   controller: 'EmailsController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     emailResolve: getEmail
      //   },
      //   data: {
      //     roles: ['user', 'admin'],
      //     pageTitle: 'Edit Email {{ emailResolve.name }}'
      //   }
      // })
      // .state('emails.view', {
      //   url: '/:emailId',
      //   templateUrl: 'modules/emails/client/views/view-email.client.view.html',
      //   controller: 'EmailsController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     emailResolve: getEmail
      //   },
      //   data: {
      //     pageTitle: 'Email {{ emailResolve.name }}'
      //   }
      // })
      
      
      
      
      
      ;
  }

  getEmail.$inject = ['$stateParams', 'EmailsService'];

  function getEmail($stateParams, EmailsService) {
    return EmailsService.get({
      emailId: $stateParams.emailId
    }).$promise;
  }

  newEmail.$inject = ['EmailsService'];

  function newEmail(EmailsService) {
    return new EmailsService();
  }
}());
