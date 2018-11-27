(function () {
  'use strict';

  angular
    .module('core')
    .controller('ShareUsersaddController', ShareUsersaddController);



    ShareUsersaddController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','shareusersService'];

  function ShareUsersaddController ($scope, $http, $state, $stateParams, Upload,shareusersService) {

  $scope.formdata = {};
  $scope.status ='0';
  $scope.shareusersService = shareusersService;
 /////////////////////select/////////////////////////////



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




 /*
	 * Function : addShareUsers
	 * Description : Add addShareUsers
	
	 */
 
  $scope.addShareUsers = function(){
    
		if($scope.formdata.$valid){
		var data = {
        "name":$scope.name,
        "subject":$scope.subject,
        "content":$scope.content,
        "custom":$scope.custom,
				"status" :$scope.status
        }
      
		console.log(data);
		  $scope.shareusersService.addShareUsers(data).then(function(result){

			  if(result.statusText = "OK"){
				  swal("Success!", "Successfully added!", "success");  
				  $state.go('emailshareusers');
			  }else{
				  swal("error!", "Already exist!", "error");
			  }
			  
		  })
		}
			
	  }
///////////////////////////////////////////////////////////////////////


/*
	   * FUnction : delOrderHold
	   * Description : delete OrderHold By Id
	 
	   */
    $scope.delShareUsers = function(userId){
		   
		   
      swal({
              title: 'Are you sure?',
              text: "You want to delete this user!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if(result){
              $scope.shareusersService.delShareUsers(userId).then(function(result){
              if(result.statusText = "OK"){

              swal('Deleted!',
                   'User has been deleted.',
                   'success')

              $state.reload();
               }else{
                 
               }
            })
            }
            })
     
    }
///////////////////////////////////////////////////////////////////////


 }






}());
