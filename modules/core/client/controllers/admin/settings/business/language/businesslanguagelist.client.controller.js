(function () {
  'use strict';

  angular
    .module('core')
    .controller('Businesslanguagelist', Businesslanguagelist);



    Businesslanguagelist.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function Businesslanguagelist ($scope, $http, $state, $stateParams, Upload) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
  $scope.formdata.bcountryname ='0';
  $scope.formdata.langstatus ='0';
  $scope.formdata.blanguagename ='0';
  $scope.formdata.supportrtl ='0';
  $scope.formdata.migrate=false;
  $scope.formdata.setupdb=false;
  $scope.formdata.username= localStorage.getItem('username');

  ////////////////////////ip fetch//////////////////////////////

  $http.get("https://ipinfo.io/").then(function (response) {
$scope.formdata.ip = response.data.ip;
});

console.log($scope.formdata);

/////////////////////////////////load countries//////////////////////////////////////////
$http({
  url: '/api/admin/selectCountry',
  method: "POST",
  
})
.then(function(response) {
$scope.counlist=response.data.data;
      // success
}, 
function(response) { // optional
      // failed
});
////////////////////////////////////////////////////////////////////////////////////
$http({
  url: '/api/admin/selectbusinesslang',
  method: "POST",
  
})
.then(function(response) {
$scope.businesslanglist=response.data.data;
      // success
}, 
function(response) { // optional
      // failed
});
///////////////////////////////////////////////////////////////
$http({
  url: '/api/admin/selectGenlanguage',
  method: "POST",
  
})
.then(function(response) {
$scope.langlist=response.data.data;
      // success
}, 
function(response) { // optional
      // failed
});
////////////////////////////////////////////////////////////////
 
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
   //ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result;
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


            
 $scope.insbusinesslang=function()
 {
   console.log($scope.validation());
  if($scope.validation()==0){
      
     var data=$scope.formdata;
 
    console.log(data);

          Upload.upload({
            url: '/api/admin/insbusinesslang',
            data: data,
            file:$scope.imgss
          }).then(function (response) { 

            console.log(response);
           //$state.reload();
        
           if(response.data.data==0)
    {
       swal("Success!", "Successfully added !", "success");
     $state.reload();
    }
    else if(response.data.data==1)
    {
      swal("error!", "Already exist!", "error");
       //$state.reload();
    }
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
       
       if($scope.formdata.bcountryname==0 || angular.isUndefined($scope.formdata.bcountryname) ){
         $scope.adderrorclass(".bcountryname");
         error=1;
         
         } 
         if($scope.formdata.blanguagename=='' || angular.isUndefined($scope.formdata.blanguagename) ){
           $scope.adderrorclass(".shortname");
           error=2;
           
           }
           if($scope.formdata.supportrtl=='' || angular.isUndefined($scope.formdata.supportrtl) ){
             $scope.adderrorclass(".supportrtl");
             error=3;
             
             }
             if($scope.formdata.langstatus==0|| angular.isUndefined($scope.formdata.langstatus) ){
              $scope.adderrorclass(".langstatus");
              error=4;
              
              }
              // if($scope.formdata.setupdb=='' || angular.isUndefined($scope.formdata.setupdb) ){
              //   $scope.adderrorclass(".setupdb");
              //   error=5;
                
              //   }
              //   if($scope.formdata.migrate=='' || angular.isUndefined($scope.formdata.migrate) ){
              //     $scope.adderrorclass(".migrate");
              //      error=6;
                  
              //     }
           return error;            
             }





/////////////////////////////////////////////////////////////////////////////////////

$scope.del=function(id){
 
  
          
  var val={'id':id};
  //console.log(val);
     $http({
          url: '/api/admin/delbusinesslang',
          method: "POST",
          data:val
      })
      .then(function(response) {
// $state.go('settingscountry');
$state.reload();        
      }, 
      function(response) { // optional
              // failed
      });
  
  }







 function getActionBtns(){


 $scope.addpage  = document.querySelectorAll(".add-action");
 $scope.addpage[0].addEventListener("click", $scope.newpage, false);

 $scope.editpage= document.querySelectorAll(".edit-action");
 $scope.editpage[0].addEventListener("click", $scope.editpages, false);

 var delpage= document.querySelectorAll(".delete-action");
 delpage[0].addEventListener("click", $scope.delpage, false);

  var bus= document.querySelectorAll(".business-action");
 bus[0].addEventListener("click", $scope.insbus, false);



 }

 $scope.insbus=function(){
  $("#myModal").modal();
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

    $scope.editpage[0].setAttribute("href", "/settings/businesslanguageedit/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('businesslanguageadd');
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
//console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }

  swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
  var ids={'id':$scope.chkValue};
  //console.log(ids);
  //var val={'id':id};
    //console.log(val);
       $http({
            url: '/api/admin/delcheckedbusinesslang',
            method: "POST",
            data:ids
        })
        .then(function(response) {
   
            //  if (result.value) {
          swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          $state.reload();
        // }  
        }, 
        function(response) { // optional
                // failed
        });
        
      })

 
}
setTimeout(getActionBtns, 1500);         


 }






}());
