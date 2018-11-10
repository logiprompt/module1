(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope','$http' ,'$state', 'Authentication', 'menuService'];

  function HeaderController($scope, $http, $state, Authentication, menuService,) 
  {

    var vm = this;
    $scope.menuService=menuService;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    $scope.$on('$stateChangeSuccess', stateChangeSuccess);
    function stateChangeSuccess() 
    {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }



  // console.log(765765);
  // $scope.getGenLang = function()
  // {
  //   $scope.menuService.getGenLang().then(function(result)
  //   {
  //     if(result.statusText = "OK")
  //     {
  //       $scope.genLang = result.data;
  //       console.log(result.data);
  //     }
  //   });
  // }
  // $scope.getGenLang();
//   $scope.formdata.languages=0;
  $scope.languages="0";
  $scope.setLang=function(){
 var r= confirm("Press a button!");
if(r==true){
  localStorage.setItem("language",$scope.languages);
  }
  }
  $http({
    url: '/api/language/getGenLang',
    method: "POST",
    
  })
  .then(function(response) {
  $scope.langlist=response.data;
        // success
     //console.log( $scope.counlist)  
        //console.log(5464564564);
  }, 
  function(response) { // optional
        // failed
  });




  }
}());
