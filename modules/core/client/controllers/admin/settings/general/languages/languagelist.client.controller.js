(function () {
  'use strict';

  angular
    .module('core')
    .controller('Languagelist', Languagelist);



    Languagelist.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function Languagelist ($scope, $http, $state, $stateParams, Upload) {

  $scope.formdata = {};
 $scope.formdata.genstatus ='0';
 // $scope.formdata.country ='0';
 // $scope.formdata.state ='0';
   $scope.formdata.username= localStorage.getItem('username');

  ////////////////////////ip fetch//////////////////////////////

  $http.get("https://ipinfo.io/").then(function (response) {
$scope.formdata.ip = response.data.ip;

});

//////////////////insert Language////////////////////////////////////

 $scope.insLanguage=function()
 {
   

   if($scope.validation()==0){
         $http({
           url: '/api/admin/insLanguage',
           method: "POST",
           data:$scope.formdata
       })
       .then(function(response) {
		    console.log(response.data);
         
          if(response.data.data==1)
        {
           swal("Sccess!", "Successfully added Language!", "success");
         $state.reload();
        }
        else if(response.data.data==2)
        {
          swal("error!", "Language already exist!", "error");
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
                   if($scope.formdata.genlang=='' || angular.isUndefined($scope.formdata.genlang) ){
                     $scope.adderrorclass(".lan");
                    
                     error=1;
                     }
					 if($scope.formdata.genextension=='' || angular.isUndefined($scope.formdata.genextension) ){
                      $scope.adderrorclass(".exten");
                    
                      error=1;
                      }
					  
                    
               if($scope.formdata.genstatus==0 || angular.isUndefined($scope.formdata.genstatus) ){
                     $scope.adderrorclass(".status");
                     
                     error=1;
                     }
 
                     return error;          
             }


 ////////////////////////delete Language///////////////////////////////
 $scope.del=function(id){
 
  
          
              var val={'id':id};
              //console.log(val);
                 $http({
                      url: '/api/admin/delGenlang',
                      method: "POST",
                      data:val
                  })
                  .then(function(response) {
					  
                  if(response.data.data==1)
                  {
                  swal("Sccess!", "Successfully Deleted Language!", "success");
                  $state.reload();
                  }
                         
                  }, 
                  function(response) { // optional
                          // failed
                  });
              
              }
 
 
 /////////////////////////////////list view//////////////////////////////////////////
$http({
  url: '/api/admin/selectGenlanguage',
  method: "POST",
  
})
.then(function(response) {
$scope.list=response.data.data;
      // success
}, 
function(response) { // optional
      // failed
});
/////////////////////////////////////////////////////////////////////////

 
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

    $scope.editpage[0].setAttribute("href", "/settings/languageedit/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('languageadd');
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
            url: '/api/admin/delcheckedgenlang',
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
