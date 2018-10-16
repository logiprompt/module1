(function () {
  'use strict';

  angular
    .module('core')
    .controller('Emailuserforgotedit', Emailuserforgotedit);



    Emailuserforgotedit.$inject = ['$scope','$http','$state','$stateParams', 'Upload','userforgotService'];

  function Emailuserforgotedit ($scope, $http, $state, $stateParams, Upload,userforgotService) {

  $scope.formdata = {};
   $scope.status = "0";
   $scope.username= localStorage.getItem('username');
   $scope.userforgotService = userforgotService;

 /////////////////////select/////////////////////////////
////////////////////////ip fetch//////////////////////////////

$http.get("https://ipinfo.io/").then(function (response) {
  $scope.ip = response.data.ip;
  
  });
 ///////////////////////////////////////////////////////

 
$scope.setasDefault=function(id){

    $http({
          url: '/api/admin/setasDefault1',
          method: "POST",
          data:{'id':id}
      })
      .then(function(response) {
        $state.reload();
              // success
      }, 
      function(response) { // optional
              // failed
      });

}

/////////////////////////////////////////////////////////////////////////

$scope.choices = [{id: 'choice1'}];
//$scope.choices.length	
 
 $scope.addNewChoice = function() {
       var newItemNo = $scope.choices.length+1;
       $scope.choices.push({'id':'choice'+newItemNo});
     
 };
       
 $scope.removeChoice = function(val) {
         if($scope.choices.length>1){
       $scope.choices.splice(val,1);
         }
      
 };
 ///////////////////list /////////////////////
 /*
	 * Function : getUserForgotById
	 * Description : get User Forgot details
	 * Owner : jeeja
	 */

  $scope.getUserForgotById = function(userId){
    console.log(0);
    $scope.userforgotService.getUserForgotById(userId).then(function(result){
     if(result.statusText = "OK"){
       console.log(1);
console.log(result);
       $scope.userdetails = result.data;
$scope.name = $scope.userdetails.name;
$scope.subject = $scope.userdetails.subject;
$scope.content = $scope.userdetails.content;
$scope.custom = $scope.userdetails.custom;
$scope.status = $scope.userdetails.status;


      }else{
        
      }
   });
  }
  $scope.getUserForgotById($stateParams.id);
 //////////////////////////////////
  /*
	 *
   *  Function : update UserForgot
	 * Description : Update UserForgot details
	 * Owner : jeeja
   * 
	 */

      $scope.updateUserForgot = function(){
        if($scope.formdata.$valid){
       var data = {		  			 
            "name":$scope.name,
            "subject":$scope.subject,
            "content":$scope.content,
            "custom":$scope.custom,
            "status" :$scope.status
            }
       
        $scope.userforgotService.updateUserForgot($stateParams.id,data).then(function(result){
          if(result.statusText = "OK"){
            swal("Sccess!", "Successfully updated User", "success"); 
            $state.reload();
           }
        });
      }
      }

///////////////////////////////////////////////////////////////////////
     
 }
}());
