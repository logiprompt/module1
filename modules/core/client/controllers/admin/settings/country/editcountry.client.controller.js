(function () {
  'use strict';

  angular
    .module('core')
    .controller('Editcountry', Editcountry);



    Editcountry.$inject = ['$scope','$http','$state','$stateParams','$httpParamSerializer', 'Upload'];

  function Editcountry ($scope, $http, $state, $stateParams,$httpParamSerializer, Upload) {

  $scope.formdata = {};

  $scope.formdata.username= localStorage.getItem('username');
  /////////fetch ip///////////////
  $http.get("https://ipinfo.io/").then(function (response) {
$scope.formdata.ip = response.data.ip;
});
//console.log($scope.formdata);
  //$scope.formdata.rolestatus ='0';
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
/////////////////////////edit role/////////////////////////////////////////////////////////////////
var countryid={id: $stateParams.id};
 $http({
  url: '/api/admin/viewCountrybyid',
  method: "POST",
  data:countryid
})
.then(function(response) {
$scope.view=response.data.data;
//console.log($scope.view);
$scope.formdata.countryname=response.data.data.country;
$scope.formdata.shortname=response.data.data.shortcode;
$scope.formdata.status=response.data.data.countrystatus;
      // success
}, 
function(response) { 
  // optional 
  // failed
});
 /////////////////////////////////////////////////////////
 $scope.updateCountry=function()
 {
  var data={'id':$stateParams.id,'country':$scope.formdata.countryname,'shortcode':$scope.formdata.shortname,'status':$scope.formdata.status,'username':$scope.formdata.username,'ip':$scope.formdata.ip}
   //console.log(data);
   if($scope.validation()==0){
      $http({
           url: '/api/admin/updateCountry',
           method: "POST",
           data:data
       })
       .then(function(response) {
         console.log(response);
         if(response.data.data==0)
         {
            swal("Sccess!", "Successfully Country updated!", "success");
          $state.reload();
         }
         else if(response.data.data==1)
         {
           swal("error!", "Country already exist!", "error");
            //$state.reload();
         }
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
                   if($scope.formdata.countryname=='' || angular.isUndefined($scope.formdata.countryname) ){
                     $scope.adderrorclass(".cat");
                    
                     error=1;
                     }
                     if($scope.formdata.shortname=='' || angular.isUndefined($scope.formdata.shortname) ){
                      $scope.adderrorclass(".cat");
                    
                      error=2;
                      }
               if($scope.formdata.status==0){
                     $scope.adderrorclass(".cat");
                     
                     error=3;
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
