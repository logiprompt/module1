(function () {
  'use strict';

  angular
    .module('core')
    .controller('OrderUnholdeditController', OrderUnholdeditController);



    OrderUnholdeditController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','orderunholdService'];

  function OrderUnholdeditController ($scope, $http, $state, $stateParams, Upload,orderunholdService) {

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
	 * Function : getorderhold
	 * Description : get orderhold details
	 
	 */

  $scope.getOrderUnhold = function(){
    //console.log(0);
    $scope.orderunholdService.getOrderUnhold().then(function(result){
     if(result.statusText = "OK"){
       $scope.holdlist = result.data;
//console.log(1);
//console.log(result.data);
      }else{
        
      }
   });
  }
  $scope.getOrderUnhold();
 //////////////////////////////////

///////////////////////////////////////////////////////////////////////


/*
	   * FUnction : delOrderHold
	   * Description : delete OrderHold By Id
	 
	   */
    $scope.delOrdeUnhold = function(userId){
		   
		   
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
              $scope.orderunholdService.delOrdeUnhold(userId).then(function(result){
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



    $scope.currentLan=localStorage.getItem('currentLang').toString();
    $scope.defaultLang=localStorage.getItem('defaultLang').toString();
    
///////////////////////////////////////////////////////////////////////
$scope.getOrderUnholdById = function(userId)
{
  //console.log(0);
    $scope.orderunholdService.getOrderUnholdById(userId).then(function(result)
    {
      var details=result.data;
	  $scope.userdetails1=result.data;
      if (result.statusText = "OK") {
      
       
           $scope.status =details.status.toString();    
        if(angular.equals($scope.currentLan, $scope.defaultLang)){
        $scope.userdetails = result.data;
        $scope.name = $scope.userdetails.name;
        $scope.subject = $scope.userdetails.subject;
        $scope.content = $scope.userdetails.content;
        $scope.custom = $scope.userdetails.custom;
      }
      else{
                   
        $scope.userdetails = result.data;
        $scope.name =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].name : details.name;
        $scope.subject = $scope.currentLan in details.oLang  ?details.oLang[ $scope.currentLan].subject :  details.subject;
        $scope.content =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].content:details.content ;
        $scope.custom =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].custom :details.custom;

       

      }
      }
        else
        {
          
        }
    });
}
$scope.getOrderUnholdById($stateParams.id);



 //////////////////////////////////
  /*
   *
   *  Function : update UserForgot
   * Description : Update UserForgot details
   * Owner : jeeja
   * 
   */

  $scope.updateOrderUnhold = function(){
   //  console.log($scope.formdata);
     if($scope.formdata.$valid && $scope.status!=0){
   

      if (localStorage.getItem("currentLang") == 'en') {
        var data = {
          "name": $scope.name,
          "subject": $scope.subject,
          "content": $scope.content,
          "custom": $scope.custom,
          "status": $scope.status,
          "userId": $stateParams.id,
          "isDefaultLang" : true,

        }
      }
      else {
        var data = {
          "name": $scope.name,
          "subject": $scope.subject,
          "content": $scope.content,
          "custom": $scope.custom,
          "userId": $stateParams.id,
          "isDefaultLang" : false,
          "defaultLang":localStorage.getItem("defaultLang"),
          "userSelectedLang":localStorage.getItem("currentLang")
        };
      }
    
     $scope.orderunholdService.updateOrderUnhold($stateParams.id,data).then(function(result){
       if(result.statusText = "OK"){
         swal("Success!", "Successfully updated", "success"); 
         //$state.reload();
         $state.go('emailunhold');
        }
     });
   }
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
//console.log(linkid)
//console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/email/order/editunhold/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('emailaddunhold');
}
$scope.editpages=function(){
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
 // console.log($scope.editpage[0].getAttribute("href"));
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
//console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }






  var userId=$scope.chkValue;
//console.log(userId);
  swal({
    title: 'Are you sure?',
    text: "You want to delete checked items!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if(result){
    $scope.orderholdService.delCheckedOrderUnhold(userId).then(function(result){
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
setTimeout(getActionBtns, 1500);         
$scope.stateChanged=function(){
	
var details= $scope.userdetails1;
 //console.log(details);
 
if($scope.chk1){ 
if($scope.chk1){
  $scope.name = $scope.userdetails1.name;
}
else{
  $scope.name =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].name : details.name;

}
}
if($scope.chk2){
if($scope.chk2){
  $scope.subject = $scope.userdetails1.subject;
}
else{
  $scope.subject = $scope.currentLan in details.oLang  ?details.oLang[ $scope.currentLan].subject :  details.subject;

}
}
if($scope.chk3){
if($scope.chk3){
  $scope.content = $scope.userdetails1.content;
}
else{
  $scope.content =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].content:details.content ;
}
}



if($scope.chk5){
if($scope.chk5){
      $scope.custom = $scope.userdetails.custom;

}
else{
  $scope.custom =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].custom :details.custom;

}
}
if($scope.chk8){
  $scope.status =details.status.toString(); 

}
else{
//$scope.status =$scope.currentLan in details.oLang ? details.oLang[ $scope.currentLan].status :details.status;

}

}

 }






}());
