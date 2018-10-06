(function () {
  'use strict';

  angular
    .module('core')
    .controller('Editlanguage', Editlanguage);



    Editlanguage.$inject = ['$scope','$http','$state','$stateParams','$httpParamSerializer', 'Upload'];

  function Editlanguage ($scope, $http, $state, $stateParams,$httpParamSerializer, Upload) {

  $scope.formdata = {};
  $scope.formdata.editstatus ='0';
 // $scope.formdata.editcountry ='0';
  //$scope.formdata.editstate ='0';
 $scope.formdata.username= localStorage.getItem('username');
  /////////fetch ip///////////////
  $http.get("https://ipinfo.io/").then(function (response) {
$scope.formdata.ip = response.data.ip;
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
 ///////////////////////////////////////////////////////////////////////////


/////////////////////////Edit language/////////////////////////////////////////////////////////////////
var languageid={id: $stateParams.id};
 $http({
  url: '/api/admin/viewGenlangbyid',
  method: "POST",
  data:languageid
})
.then(function(response) {
 
$scope.viewgenlang=response.data.data;
console.log($scope.viewgenlang);
$scope.formdata.editlanguage=response.data.data.language;
$scope.formdata.editextension=response.data.data.extension;
$scope.formdata.editstatus=response.data.data.status;

//$scope.formdata.status=response.data.data.countrystatus;
      // success
}, 
function(response) { 
  // optional
      // failed
});

 ///////////////////update language//////////////////////////////////////

 $scope.updGenlang=function()
 {
  var data={'id':$stateParams.id,'language':$scope.formdata.editlanguage,'extension':$scope.formdata.editextension,'status':$scope.formdata.editstatus,'username':$scope.formdata.username,'ip':$scope.formdata.ip}
   console.log(data);
   if($scope.validation()==0){
      $http({
           url: '/api/admin/updGenlang',
           method: "POST",
           data:data
       })
       .then(function(response) {
         //console.log(response);
		  if(response.data.data==1)
        {
           swal("Sccess!", "Successfully Updated Language!", "success");
           $state.reload();
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
                    if($scope.formdata.editlanguage=='' || angular.isUndefined($scope.formdata.editlanguage) ){
                     $scope.adderrorclass(".lan");
                    
                     error=1;
                     }
					 if($scope.formdata.editextension=='' || angular.isUndefined($scope.formdata.editextension) ){
                      $scope.adderrorclass(".exten");
                    
                      error=1;
                      }
					  
                    
               if($scope.formdata.editstatus==0 || angular.isUndefined($scope.formdata.editstatus) ){
                     $scope.adderrorclass(".status");
                     
                     error=1;
                     }
                     return error;          
             }
///////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////

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
