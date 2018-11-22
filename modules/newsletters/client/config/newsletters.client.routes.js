(function () {
  'use strict';

  angular
    .module('newsletters')
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
      .state('newsletters', {
        abstract: true,
        url: '/newsletters',
        template: '<ui-view/>'
      })
/////////////////////////////////////////////////////////////////////
.state('newsletterslist', {
  url: '/newsletters/newsletters',
  views:{
    header:adminheader,

    content: { 
     templateUrl: '/modules/newsletters/client/views/admin/newsletters/newsletters.html',
    controller: 'NewslettersController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('newslettersadd', {
  url: '/newsletters/newslettersadd',
  views:{
    header:adminheader,

    content: { 
     templateUrl: '/modules/newsletters/client/views/admin/newsletters/addnewsletters.html',
    controller: 'NewslettersController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('newslettersedit', {
  url: '/newsletters/newslettersedit/:id',
  views:{
    header:adminheader,

    content: { 
     templateUrl: '/modules/newsletters/client/views/admin/newsletters/edit.html',
    controller: 'NewslettereditController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('newsletterssubscribe', {
  url: '/newsletters/subscribe',
  views:{
    header:adminheader,

    content: { 
     templateUrl: '/modules/newsletters/client/views/admin/newssubscribers/newssubscribers.html',
    controller: 'NewslettersController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})


.state('newslettertemplate', {
  url: '/newsletters/template',
  views:{
    header:adminheader,

    content: { 
     templateUrl: '/modules/newsletters/client/views/admin/newstemplate/newstemplates.html',
    controller: 'NewstemplateController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('newsaddtemplate', {
  url: '/newsletters/addtemplate',
  views:{
    header:adminheader,

    content: { 
     templateUrl: '/modules/newsletters/client/views/admin/newstemplate/addtemplates.html',
    controller: 'NewstemplateController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('newsedittemplate', {
  url: '/newsletters/editnewstemp/:id',
  views:{
    header:adminheader,

    content: { 
     templateUrl: '/modules/newsletters/client/views/admin/newstemplate/edit.html',
    controller: 'NewstemplateController',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
 /////////////////////////////////////////////////////////////////////   
  }

  getCustomer.$inject = ['$stateParams', 'CustomersService'];

  function getCustomer($stateParams, CustomersService) {
    return CustomersService.get({
      customerId: $stateParams.customerId
    }).$promise;
  }

  newCustomer.$inject = ['CustomersService'];

  function newCustomer(CustomersService) {
    return new CustomersService();
  }
}());
