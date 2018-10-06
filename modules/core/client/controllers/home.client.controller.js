(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController( $scope,$state) {
    var vm = this;

    $scope.formdata={};


    $scope.login=function(){

    	if( $scope.formdata.username=='admin' && $scope.formdata.password=='admin')
    	{
    		localStorage.setItem('adminlogin','true');
    		localStorage.setItem('username','admin');
    		  document.location="/adminhome";

    	}
      else if( $scope.formdata.username=='vendor' && $scope.formdata.password=='vendor')
      {
        localStorage.setItem('vendorlogin','true');
        localStorage.setItem('username','vendor');
       // $state.go('adminhome');
       
        document.location="/vendorhome";
         //location.reload();
      }
	  
	  else if( $scope.formdata.username=='customer' && $scope.formdata.password=='customer')
      {
        localStorage.setItem('customerlogin','true');
        localStorage.setItem('username','customer');
       // $state.go('adminhome');
       
        document.location="/customerhome";
         //location.reload();
      }
    }
  }
}());
