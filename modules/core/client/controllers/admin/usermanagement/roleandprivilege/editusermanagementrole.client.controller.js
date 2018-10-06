(function () {
  'use strict';

  angular
    .module('core')
    .controller('Editusermanagementrole', Editusermanagementrole);



    Editusermanagementrole.$inject = ['$scope','$http','$state','$stateParams','$httpParamSerializer', 'Upload'];

  function Editusermanagementrole ($scope, $http, $state, $stateParams,$httpParamSerializer, Upload) {

  $scope.formdata = {};

  $scope.formdata.username= localStorage.getItem('username');
  /////////fetch ip///////////////
  $http.get("https://ipinfo.io/").then(function (response) {
$scope.formdata.ip = response.data.ip;
});
 // $scope.formdata.rolestatus ='0';
 console.log($scope.formdata);
 
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
 

 /////////////////////////view role/////////////////////////////////////////////////////////////////
 var roleid={id: $stateParams.id};
// var data =$scope.roleid;
      
//var roles=$httpParamSerializer(data);
//console.log(roles);
 $http({
  url: '/api/admin/viewRoleprivilegebyid',
  method: "POST",
  data:roleid
})
.then(function(response) {
 
  
$scope.viewrole=response.data.data;

$scope.formdata.rolename=response.data.data.name;
$scope.formdata.rolestatus=response.data.data.rolestatus;


      // success
}, 
function(response) { // optional
      // failed
});
 /////////////////////////////////////////////////////////

//////////////////////update//////////////////////////
$scope.updateRoleandprivilege=function()
 {
   
  var data={'id':$stateParams.id,'rolename':$scope.formdata.rolename,'rolestatus':$scope.formdata.rolestatus,'username':$scope.formdata.username,'ip':$scope.formdata.ip}
   console.log(data);
  console.log($scope.validation());
   if($scope.validation()==0){
         $http({
           url: '/api/admin/updateRoleandprivilege',
           method: "POST",
           data:data
       })
       .then(function(response) {
         $state.reload();
               // success
       }, 
       function(response) { // optional
               // failed
       });
   }
 }
////////////////////////
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
                   
                    error=1;
                    }

              if($scope.formdata.rolestatus==0 || angular.isUndefined($scope.formdata.rolestatus)){
                    $scope.adderrorclass(".rolestatus");
                  
                    error=2;
                    }

                    return error;          
            }
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
 
}
setTimeout(getActionBtns, 1500);         


 }






}());
