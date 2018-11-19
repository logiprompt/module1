(function () {
  'use strict';

  angular
    .module('core')
    .controller('EmailuserregController', EmailuserregController);



    EmailuserregController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','userregService'];

  function EmailuserregController ($scope, $http, $state, $stateParams, Upload,userregService) {

  $scope.formdata = {};
  $scope.status ='0';
  $scope.userregService = userregService;
 /////////////////////select/////////////////////////////

 
 $scope.currentLan=localStorage.getItem('currentLang').toString();
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
	 * Function : getCurrency
	 * Description : get Currency details
	 * Owner : jeeja
	 */

  $scope.getUser = function(){
    $scope.userregService.getUser().then(function(result){
     if(result.statusText = "OK"){
       $scope.userlist = result.data;
      }else{
        
      }
   });
  }
  $scope.getUser();
 //////////////////////////////////

 /*
	 * Function : addcurrency
	 * Description : Add Currency details
	 * Owner : jeeja
	 */
  $scope.addUser = function(){
		if($scope.formdata.$valid && $scope.status!=0){
		var data = {
        "name":$scope.name,
        "subject":$scope.subject,
        "content":$scope.content,
        "custom":$scope.custom,
				"status" :$scope.status
        }
      
		
		  $scope.userregService.addUser(data).then(function(result){
			  if(result.statusText = "OK"){
				  swal("Success!", "Successfully added user!", "success");  
				  $state.go('emailuserlist');
			  }else{
				  swal("error!", "User already exist!", "error");
			  }
			  
		  })
		}
			
	  }
///////////////////////////////////////////////////////////////////////


/*
	   * FUnction : delUser
	   * Description : delete user id
	   *
	   * 
	   */
    $scope.delUser = function(userId){
		   
		   
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
              $scope.userregService.delUser(userId).then(function(result){
              if(result.statusText = "OK"){
              swal(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                          )
                $scope.getUser();
               }else{
                 
               }
            })
            }
            })
     
    }
///////////////////////////////////////////////////////////////////////




 function getActionBtns(){


 $scope.addpage  = document.querySelectorAll(".add-action");
 $scope.addpage[0].addEventListener("click", $scope.newpage, false);

 $scope.editpage= document.querySelectorAll(".edit-action");
 $scope.editpage[0].addEventListener("click", $scope.editpages, false);

 var delpage= document.querySelectorAll(".delete-action");
 delpage[0].addEventListener("click", $scope.delpage, false);



 }
$scope.chkall=function(){
$scope.editpage[0].removeAttribute("href");
 
}
$scope.addchkval=function(linkid){
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/email/edituserreg/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('emailuserreg');
}
$scope.editpages=function(){
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
if($scope.editpage[0].getAttribute("href")){
document.location=$scope.editpage[0].getAttribute("href");
}
 }
 
}
$scope.chkValue=[];


$scope.delpage=function(){
  $scope.chkValue=[];
 
  //$state.go('addlanguage');
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }

  var userId=$scope.chkValue;
console.log(userId);
  swal({
    title: 'Are you sure?',
    text: "You want to delete checked items!",
    type: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if(result){
    $scope.userregService.delCheckedUser(userId).then(function(result){
    if(result.statusText = "OK"){
    swal(
                  'Deleted!',
                  'User has been deleted.',
                  'success'
                )
      $scope.getUser();
     }else{
       
     }
  })
  }
  })

 
}
setTimeout(getActionBtns, 1500);         


 }






}());
