(function () {
  'use strict';

  angular
    .module('emails')
    .controller('Emailordercreationedit', Emailordercreationedit);



    Emailordercreationedit.$inject = ['$scope','$http','$state','$stateParams', 'Upload','ordercreationService'];

  function Emailordercreationedit ($scope, $http, $state, $stateParams, Upload,ordercreationService) {

   //$scope.formdata = {};
   $scope.status = "0";
   $scope.username= localStorage.getItem('username');
   $scope.ordercreationService = ordercreationService;

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

//////////////////////////////////////////////////////////////////////////

$scope.delUserForgot = function(userId){
		   
		   
  swal({
          title: 'Are you sure?',
          text: "You want to delete this user!",
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if(result){
          $scope.userforgotService.delUserForgot(userId).then(function(result){
          if(result.statusText = "OK"){
          swal(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                      )
          $state.go('emailordercreation');
           }else{
             
           }
        })
        }
        })
 
}


/////////////////////////////////////////////////////////////////////
 ///////////////////User Forgot By Id /////////////////////

 /*
	 * Function : getUserForgotById
	 * Description : get User Forgot details
	 * Owner : jeeja
*/

//console.log( $scope.userforgotService);
  $scope.getOrderCreationById = function(userId)
  {
    //console.log(0);
      $scope.ordercreationService.getOrderCreationById(userId).then(function(result)
      {
          //console.log(userId);
          if(result.statusText = "OK")
          {
            //console.log(result);
            $scope.userdetails = result.data;
            $scope.name = $scope.userdetails.name;
            $scope.subject = $scope.userdetails.subject;
            $scope.content = $scope.userdetails.content;
            $scope.custom = $scope.userdetails.custom;
            $scope.status = $scope.userdetails.status.toString();

          }
          else
          {
            
          }
      });
  }
  $scope.getOrderCreationById($stateParams.id);



  // $http({
  //   url: '/api/userforgot/'+$stateParams.id,
  //   method: "GET",
    
  // })
  // .then(function(result) {
  //   console.log(result);
  // $scope.langlist=result.data;
  //       // success
  //    //console.log( $scope.counlist)  
  //       //console.log(5464564564);
  // }, 
  // function(response) { // optional
  //       // failed
  // });




 //////////////////////////////////
  /*
	 *
   *  Function : update UserForgot
	 * Description : Update UserForgot details
	 * Owner : jeeja
   * 
	 */

      $scope.updateOrderCreation = function(){
       // console.log($scope.formdata);
        if($scope.formdata.$valid && $scope.status!=0){
       var data = {		  			 
            "name":$scope.name,
            "subject":$scope.subject,
            "content":$scope.content,
            "custom":$scope.custom,
            "status" :$scope.status,
            "userId":$stateParams.id
            }
       
        $scope.ordercreationService.updateOrderCreation($stateParams.id,data).then(function(result){
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
