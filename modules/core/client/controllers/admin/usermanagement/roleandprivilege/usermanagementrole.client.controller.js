(function () {
  'use strict';

  angular
    .module('core')
    .controller('Usermanagementrole', Usermanagementrole);



    Usermanagementrole.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function Usermanagementrole ($scope, $http, $state, $stateParams, Upload) {

  $scope.formdata = {};
  $scope.formdata.rolestatus ='0';
  $scope.formdata.username= localStorage.getItem('username');

  ////////////////////////ip fetch//////////////////////////////

  $http.get("https://ipinfo.io/").then(function (response) {
$scope.formdata.ip = response.data.ip;
});

//console.log($scope.formdata);

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
 ///////////////////////////////////////////////////////////////////////////
 /////////////////////////view list/////////////////////////////////////////////////////////////////
 $http({
  url: '/api/admin/selectRoleprivileges',
  method: "POST",
  
})
.then(function(response) {
$scope.list=response.data.data;
      // success
}, 
function(response) { // optional
      // failed
});
/////////////////////delete///////////////////
$scope.del=function(id){
 
  
          
  var val={'id':id};
  //console.log(val);
  swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    
     $http({
          url: '/api/admin/delRoleprivileges',
          method: "POST",
          data:val
      })
      .then(function(response) {
 $state.reload();
             
      }, 
      function(response) { // optional
              // failed
      });
      if (result.value) {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    }) 

  
  }
/////////////////////////////////////
 /////////////////////////////////////////////////////////
$scope.insRoleandprivilege=function()
{
  //console.log(1);
  if($scope.validation()==0){
        $http({
          url: '/api/admin/insRoleandprivilege',
          method: "POST",
          data:$scope.formdata
      })
      .then(function(response) {
        if(response.data.data==0)
        {
           swal("Sccess!", "Successfully added Role and privilage!", "success");
         $state.reload();
        }
        else if(response.data.data==1)
        {
          swal("error!", "Role and privilage already exist!", "error");
           //$state.reload();
        }
        //$state.reload();
              // success
      }, 
      function(response) { // optional
              // failed
      });
  }
}
 $scope.rmerrorclass=function(){
    angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
    }
    $scope.adderrorclass=function(cls){
    angular.element(document.querySelector(cls)).addClass('validationErr');
    }
$scope.validation=function(){
                var error=0;
                $scope.rmerrorclass();
                  if($scope.formdata.rolename=='' || angular.isUndefined($scope.formdata.rolename) ){
                    $scope.adderrorclass(".rolename");
                    //$scope.taberrorclass(".tcat");
                    error=1;
                    }

              if($scope.formdata.rolestatus==0 || angular.isUndefined($scope.formdata.rolestatus) ){
                    $scope.adderrorclass(".rolestatus");
                   // $scope.taberrorclass(".tcat");
                    error=1;
                    }

                    return error;          
            }

//////////////////////////image//////////////////

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

/////////////////////////////////////////////////////////////


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
console.log(linkid)
console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/usermanagement/editroleprivilege/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('usermanagementaddroleprivilege');
}

$scope.editpages=function(){
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
  console.log($scope.editpage[0].getAttribute("href"));
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
console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
var ids={'id':$scope.chkValue};
console.log(ids);
//var val={'id':id};
  //console.log(val);

  swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    

     $http({
          url: '/api/admin/delchecked',
          method: "POST",
          data:ids
      })
      .then(function(response) {
 $state.reload();
             
      }, 
      function(response) { // optional
              // failed
      });

      if (result.value) {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    }) 
 
}
setTimeout(getActionBtns, 1500);         


 }






}());
