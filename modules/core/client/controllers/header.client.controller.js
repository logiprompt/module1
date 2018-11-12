(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$http', '$state', 'Authentication', 'menuService','headermenuService'];

  function HeaderController($scope, $http, $state, Authentication, menuService,headermenuService ) {

    var vm = this;
    $scope.menuService = menuService;
    $scope.headermenuService = headermenuService;
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    $scope.$on('$stateChangeSuccess', stateChangeSuccess);
    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
    $scope.defaultLang = localStorage.setItem("defaultLang", "en");
    if (localStorage.getItem("currentLang") == null) {
      $scope.languages = localStorage.setItem("currentLang", "en");
    }
    else {
      $scope.languages = localStorage.getItem("currentLang").toString();
    }
    $scope.setLang = function () {
      var r = confirm("Do you really want to change the language?");
      if (r == true) {
        localStorage.setItem("currentLang", $scope.languages);
        location.reload();
      }
    }


    $http({
      url: '/api/language/getGenLang',
      method: "POST",

    })
      .then(function (response) {
        $scope.langlist = response.data;
        // success
        //console.log( $scope.counlist)  
        //console.log(5464564564);
      },
        function (response) { // optional
          // failed
        });



        $scope.getTopMenuList= function(){
          // console.log(userID);
           $scope.headermenuService.getTopMenuList().then(function(result){
            if(result.statusText = "OK"){
              $scope.topmenulist = result.data;
             
      
       console.log($scope.topmenulist); 
             }else{
               
             }
          });
         }
     
         $scope.getTopMenuList();

         $scope.getTopSubMenuList= function(){
          // console.log(userID);
           $scope.headermenuService.getTopSubMenuList().then(function(result){
            if(result.statusText = "OK"){
              $scope.submenulist = result.data;
      
       console.log($scope.submenulist);
             }else{
               
             }
          });
         }
     
         $scope.getTopSubMenuList();


  }
}());
