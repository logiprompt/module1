(function () {
  'use strict';

  angular
    .module('core')
    .controller('Statelist', Statelist);
    



    Statelist.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function Statelist ($scope, $http, $state, $stateParams, Upload) {
  $scope.formdata = {};
  $scope.formdata.status ='0';
  
  /////////////////////select/////////////////////////////
 $http({
        url: '/api/admin/selectCountry',
        method: "POST",       
    })
    .then(function(response) {
      $scope.list=response.data.data;
    
    console.log($scope.list);
           
    }, 
    function(response) { // optional
            // failed
    });
     $http({
        url: '/api/admin/selectState',
        method: "POST",       
    })
    .then(function(response) {
      $scope.statelist=response.data.data;
      console.log($scope.statelist);
    
    
           
    }, 
    function(response) { // optional
            // failed
    });

 ///////////////////////////////////////////////////////
//////////////////delete state///////////////////////////////
$scope.del=function(id){

 swal( {
  title: "Are you sure?",
  text: "You will not be able to recover this !",
  type: "warning",
  dangerMode: true,
  buttons: true,
}).then(
       function () {  var val={'id':id};
       console.log(val);
          $http({
               url: '/api/admin/delstate',
               method: "POST",
               data:val
           })
           .then(function(response) {
      console.log(response.data.data);
      if(response.data.data==1)
      {
        swal("success!", " deleted this state!", "success");
       $state.reload();
      }
      else if(response.data.data==2)
      {
        swal("error!", "Cannot delete this state!", "error");
         //$state.reload();
      }
                  
           }, 
           function(response) { // optional
                   // failed
           });
        },
       function () { return false; });

 
  }

/////////////////////////////////////////////////////////////
 
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


$scope.insState=function()
 {
  console.log($scope.validation());
   if($scope.validation()==0){
         $http({
           url: '/api/admin/insState',
           method: "POST",
           data:$scope.formdata
       })
       .then(function(response) {
        
        if(response.data.data==1)
        {
           swal("Sccess!", "Successfully added state!", "success");
         $state.reload();
        }
        else if(response.data.data==2)
        {
          swal("error!", "State already exist!", "error");
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
                   
                     if($scope.formdata.country==0 || angular.isUndefined($scope.formdata.country) ){
                      $scope.adderrorclass(".country");
                    
                      error=1;
                      }
                      if($scope.formdata.state=='' || angular.isUndefined($scope.formdata.state) ){
                      $scope.adderrorclass(".state");
                    
                      error=1; 
                      }
               if($scope.formdata.status==0 || angular.isUndefined($scope.formdata.status) ){
                     $scope.adderrorclass(".status");
                     
                     error=1;
                     }
 
                     return error;          
             }
///////////

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

    $scope.editpage[0].setAttribute("href", "/settings/stateedit/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('stateadd');
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
    buttons: {
      cancel: {
        text: "Cancel",
        value: null,
        visible: true,
        className: "",
        closeModal: true,
      },
      confirm: {
        text: "OK",
        value: true,
        visible: true,
        className: "",
        closeModal: true
      }}
  }).then((result) => {
  var ids={'id':$scope.chkValue};
  //console.log(ids);
  //var val={'id':id};
    //console.log(val);
       $http({
            url: '/api/admin/delcheckedstate',
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
