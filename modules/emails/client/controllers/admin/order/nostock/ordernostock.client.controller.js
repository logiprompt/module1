(function () {
  'use strict';

  angular
    .module('core')
    .controller('OrdernostockController', OrdernostockController);



    OrdernostockController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','nostockService'];

  function OrdernostockController ($scope, $http, $state, $stateParams, Upload,nostockService) {

  $scope.formdata = {};
  $scope.status ='0';
  $scope.nostockService = nostockService;
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
  // document.getElementById("imgfile").addEventListener("change", readFile, false); 
 }

$scope.iconw=function(){

        document.getElementById('imgfile').click();
        
             }

            // $(document).find('#myTable').DataTable();



 ///////////////////list /////////////////////
 /*
	 * Function : getordercreation
	 * Description : get ordercreation details
	 * Owner : jeeja
	 */

  $scope.getNoStock = function(){
    //console.log(0);
    $scope.nostockService.getNoStock().then(function(result){
     if(result.statusText = "OK"){
       $scope.userlist = result.data;
//console.log(1);
//console.log(result.data);
      }else{
        
      }
   });
  }
  $scope.getNoStock();
 //////////////////////////////////

  /*
	 *
   *  Function : addordercreation
	 * Description : Add ordercreation details
	 * Owner : jeeja
   * 
	 */
  
  $scope.addNoStock = function()
  {    
   // console.log(555555555);
    if($scope.formdata.$valid)
    {
      var data={
                  "name":$scope.name,
                  "subject":$scope.subject,
                  "content":$scope.content,
                  "custom":$scope.custom,
                  "status" :$scope.status,
                  "oLang":{}
                }    
      $scope.nostockService.addNoStock(data).then(function(result)
      {
        if(result.statusText = "OK")
        {
				  swal("Success!", "Successfully added!", "success");  
				  $state.go('emailnostocklist');
        }
        else
        {
				  swal("error!", "Already exist!", "error");
			  }			  
		  })
		}
  }

///////////////////////////////////////////////////////////////////////

/*
	   * FUnction : delOrderCreation
	   * Description : delete OrderCreation By Id
	   * Owner :jeeja
	   */
    $scope.delNoStock = function(userId){
		   
		   
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
              $scope.nostockService.delNoStock(userId).then(function(result){
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
