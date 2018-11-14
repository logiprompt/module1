(function () {
  'use strict';

  angular
    .module('core')
    .controller('OrderUnholdController', OrderUnholdController);



    OrderUnholdController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','orderunholdService'];

  function OrderUnholdController ($scope, $http, $state, $stateParams, Upload,orderunholdService) {

  $scope.formdata = {};
  $scope.status ='0';
  $scope.orderunholdService = orderunholdService;
 /////////////////////select/////////////////////////////

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

 function readFile(ev) {

  if (this.files && this.files[0]) {
  var FR= new FileReader();
  FR.onload = function(e) {
    document.getElementById("imgfiles").src= e.target.result;
   ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result;
    //document.getElementById("b64").innerHTML = e.target.result;
  };       
  FR.readAsDataURL( this.files[0] );
  }
 }
 if(document.getElementById("imgfile")!=null){
   document.getElementById("imgfile").addEventListener("change", readFile, false); 
 }

$scope.iconw=function(){

        document.getElementById('imgfile').click();
        
             }

            // $(document).find('#myTable').DataTable();

 ///////////////////list /////////////////////
 /*
	 * Function : getOrderUnhold
	 * Description : get OrderUnhold details
	 
	 */

//   $scope.getOrderUnhold = function(){
//     //console.log(0);
//     $scope.OrderUnholdService.getOrderUnhold().then(function(result){
//      if(result.statusText = "OK"){
//        $scope.userlist = result.data;
// //console.log(1);
// console.log(result.data);
//       }else{
        
//       }
//    });
//   }
//   $scope.getOrderUnhold();
 //////////////////////////////////

 /*
	 * Function : addordercreation
	 * Description : Add ordercreation details
	
	 */
 
  $scope.addOrderUnhold = function(){
    
		if($scope.formdata.$valid){
		var data = {
        "name":$scope.name,
        "subject":$scope.subject,
        "content":$scope.content,
        "custom":$scope.custom,
				"status" :$scope.status
        }
      
		console.log(data);
		  $scope.orderunholdService.addOrderUnhold(data).then(function(result){

			  if(result.statusText = "OK"){
				  swal("Success!", "Successfully added!", "success");  
				  $state.go('emailunhold');
			  }else{
				  swal("error!", "Already exist!", "error");
			  }
			  
		  })
		}
			
	  }
///////////////////////////////////////////////////////////////////////


/*
	   * FUnction : delOrderUnhold
	   * Description : delete OrderUnhold By Id
	 
	   */
    $scope.delOrderUnhold = function(userId){
		   
		   
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
              $scope.orderunholdService.delOrderUnhold(userId).then(function(result){
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
