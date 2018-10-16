(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });
var adminheader={
  templateUrl:'/modules/core/client/views/adminheader.html',
  controller:'HeaderController',
  controllerAs:'vm',
}
var adminfooter={
  templateUrl:'/modules/core/client/views/adminfooter.html'
}

    $stateProvider
      .state('home', {
        url: '/home',
        //templateUrl: '/modules/core/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm',

        views:{
        
          content: { 
           templateUrl: '/modules/core/client/views/home.client.view.html',
          },
          
        } 
      })


        .state('login', {
        url: '/',
        templateUrl: '/modules/core/client/views/home.client.login.html',
       
        views:{
        
          content: { 
           templateUrl: '/modules/core/client/views/home.client.login.html',
           controller: 'HomeController',
        controllerAs: 'vm'},
          
        } 
      })

         .state('adminhome', {
        url: '/adminhome',
       // templateUrl: '/modules/core/client/views/home.client.admin.html',
        controller: 'HomeController',
        controllerAs: 'vm',
         views:{
          header:adminheader,
          content: { 
           templateUrl: '/modules/core/client/views/admin/dashboard.html',
          },
           footer:adminfooter
        } 
      })
      ///////////////////////////////
      
     

////////////////////////////user management/////////////////////////
/////////////////////////sucessfullsubscription/////////////////////////////////
.state('usermanagementadminuserlist', {
  url: '/usermanagement/adminuserlist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/usermanagement/adminuser/adminuser.html',
    controller: 'Usermanagementadminuser',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('usermanagementaddadminuserlist', {
  url: '/usermanagement/addadminuserlist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/usermanagement/adminuser/addadminuser.html',
    controller: 'Usermanagementadminuser',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('usermanagementeditadminuserlist', {
  url: '/usermanagement/editadminuserlist/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/usermanagement/adminuser/edit.html',
    controller: 'Usermanagementadminuser',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})




.state('usermanagementmngadminuserlist', {
  url: '/usermanagement/mngadminuserlist/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/usermanagement/adminuser/adminusermng.html',
    controller: 'Usermanagementadminusers',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})






/////////////////////////role and privillage/////////////////////////////////
.state('usermanagementrole', {
  url: '/usermanagement/roleandprivilage',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/usermanagement/roleandprivilege/roleprivilege.html',
    controller: 'Usermanagementrole',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('usermanagementaddroleprivilege', {
  url: '/usermanagement/addroleprivilege',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/usermanagement/roleandprivilege/addrolprivilege.html',
    controller: 'Usermanagementrole',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('usermanagementeditroleprivilege', {
  url: '/usermanagement/editroleprivilege/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/usermanagement/roleandprivilege/editrolprivilege.html',
    controller: 'Editusermanagementrole',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
///////////////////////////////////////end/////////////////////////////////////////////
/////////////////////////////////////settings start/////////////////////////////////////////

.state('settingscountry', {
  url: '/settings/countrylist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/country/countrylist.html',
    controller: 'Countrylist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('countryadd', {
  url: '/settings/countryadd',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/country/countryadd.html',
    controller: 'Countrylist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('countryedit', {
  url: '/settings/countryedit/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/country/countryedit.html',
    controller: 'Editcountry',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
/////////////////////////////////////state start/////////////////////////////////////////

.state('settingsstate', {
  url: '/settings/statelist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/state/statelist.html',
    controller: 'Statelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('stateadd', {
  url: '/settings/stateadd',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/state/stateadd.html',
    controller: 'Statelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('stateedit', {
  url: '/settings/stateedit/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/state/stateedit.html',
    controller: 'Stateedit',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
/////////////////////////////////////district start/////////////////////////////////////////

.state('settingsdistrictlist', {
  url: '/settings/districtlist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/district/districtlist.html',
    controller: 'Districtlist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('districtadd', {
  url: '/settings/districtadd',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/district/districtadd.html',
    controller: 'Districtlist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('districtedit', {
  url: '/settings/districtedit/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/district/districtedit.html',
    controller: 'Editdistrict',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
//////////////////////pincode//////////////////////////
.state('pincodelist', {
  url: '/settings/pincodelist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/pincode/pincodelist.html',
    controller: 'Pincodelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('pincodeadd', {
  url: '/settings/pincodeadd',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/pincode/pincodeadd.html',
    controller: 'Pincodelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
.state('pincodeedit', {
  url: '/settings/pincodeedit/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/location/pincode/pincodeedit.html',
    controller: 'Editpincode',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
/////////////end pincode//////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////language start/////////////////////////////////////////

.state('settingslanglist', {
  url: '/settings/languagelist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/general/languages/languagelist.html',
    controller: 'Languagelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('languageadd', {
  url: '/settings/languageadd',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/general/languages/languageadd.html',
    controller: 'Languagelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('languageedit', {
  url: '/settings/languageedit/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/general/languages/languageedit.html',
    controller: 'Editlanguage',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
////////////////////////currency///////////////////////////////
.state('generalcurrencylist', {
  url: '/settings/generalcurrencylist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/general/currency/currencylist.html',
    controller: 'Currencylist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})



.state('generalcurrencyadd', {
  url: '/settings/generalcurrencyadd',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/general/currency/currencyadd.html',
    controller: 'Currencylist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})


.state('generalcurrencyedit', {
  url: '/settings/generalcurrencyedit/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/general/currency/currencyedit.html',
    controller: 'Currencyedit',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

//////////////////////////////////////currency end/////////////


///////////////////////////////////////settings end///////////////////////////////////////////
//////////////////////////////////business country///////////////////////////////////////////////


.state('businesscountrylist', {
  url: '/settings/businesscountrylist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/business/country/businesscountrylist.html',
    controller: 'Businesscountrylist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('businesscountryadd', {
  url: '/settings/businesscountryadd',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/business/country/businesscountryadd.html',
    controller: 'Businesscountrylist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})



.state('businesscountryedit', {
  url: '/settings/businesscountryedit/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
      templateUrl: '/modules/core/client/views/admin/settings/business/country/businesscountryedit.html',
    controller: 'Editbusinesscountry',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////business language///////////////////////////////////////////



.state('businesslanguagelist', {
  url: '/settings/businesslanguagelist',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/business/language/businesslanguagelist.html',
    controller: 'Businesslanguagelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})

.state('businesslanguageadd', {
  url: '/settings/businesslanguageadd',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/business/language/businesslanguageadd.html',
    controller: 'Businesslanguagelist',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})



.state('businesslanguageedit', {
  url: '/settings/businesslanguageedit/:id',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
      templateUrl: '/modules/core/client/views/admin/settings/business/language/businesslanguageedit.html',
    controller: 'Editbusinesslanguage',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})




/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////menu/////////////////////////////////////////////////////////

.state('settingsmenuadd', {
  url: '/settings/settingsmenuadd',
 // controllerAs: 'vm',
  views:{
    header:adminheader,
    content: { 
     templateUrl: '/modules/core/client/views/admin/settings/menu/addsettingsmenu.html',
    controller: 'Settingsmenu',
    controllerAs: 'vm',
    },
     footer:adminfooter
  } 
})
//////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true
        }
      });
  }
}());
