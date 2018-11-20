(function () {
  'use strict';

  angular
    .module('core')
    .controller('Countrylist', Countrylist);



    Countrylist.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function Countrylist ($scope, $http, $state, $stateParams, Upload) {

  $scope.formdata = {};
  $scope.formdata.status ='0';

  $scope.formdata.username= localStorage.getItem('username');
  $scope.currentLan=localStorage.getItem('currentLang').toString();
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

/////////////////////////////////list view//////////////////////////////////////////
$http({
  url: '/api/admin/selectCountry',
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


 $scope.insCountry=function()
 {
   //console.log(1);
   if($scope.validation()==0){
         $http({
           url: '/api/admin/insCountry',
           method: "POST",
           data:$scope.formdata
       })
       .then(function(response) {
        if(response.data.data==0)
        {
           swal("Sccess!", "Successfully added Country!", "success");
         $state.reload();
        }
        else if(response.data.data==1)
        {
          swal("error!", "Country already exist!", "error");
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
                   if($scope.formdata.countryname=='' || angular.isUndefined($scope.formdata.countryname) ){
                     $scope.adderrorclass(".cat");
                    
                     error=1;
                     }
                     if($scope.formdata.shortname=='' || angular.isUndefined($scope.formdata.shortname) ){
                      $scope.adderrorclass(".cat");
                    
                      error=1;
                      }
               if($scope.formdata.status==0 || angular.isUndefined($scope.formdata.status) ){
                     $scope.adderrorclass(".cat");
                     
                     error=1;
                     }
 
                     return error;          
             }
             //console.log(45);
             $scope.del=function(id){
 
  
          
              var val={'id':id};
              //console.log(val);
              swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  $http({
                    url: '/api/admin/delcountry',
                    method: "POST",
                    data:val
                })
                .then(function(response) {
                  if(response.data.data==0)
                  {
                  swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
           $state.reload();
                }
                else if(response.data.data==1)
                {
                  swal("error!", "Cannot delete is country!", "error");
                   //$state.reload();
                }
                       
                }, 
                function(response) { // optional
                        // failed
                });


                } else {
                  swal("Your file is safe!");
                }
              });
            //   swal({
            //     title: 'Are you sure?',
            //     text: "You won't be able to revert this!",
            //     type: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'Yes, delete it!'
            //   }).then((result) => {
            //      $http({
            //           url: '/api/admin/delcountry',
            //           method: "POST",
            //           data:val
            //       })
            //       .then(function(response) {
            //         if(response.data.data==0)
            //         {
            //         swal(
            //           'Deleted!',
            //           'Your file has been deleted.',
            //           'success'
            //         )
            //  $state.reload();
            //       }
            //       else if(response.data.data==1)
            //       {
            //         swal("error!", "Cannot delete is country!", "error");
            //          //$state.reload();
            //       }
                         
            //       }, 
            //       function(response) { // optional
            //               // failed
            //       });


              
            //   })
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
//console.log(linkid)
//console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/settings/countryedit/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('countryadd');
}
$scope.editpages=function(){
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
    if(checkedValue.length>0){
    //console.log($scope.editpage[0].getAttribute("href"));
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
    icon: 'warning',
    buttons: true,
    dangerMode:true,
  }).then((willDelete) => {
    if(willDelete){
  var ids={'id':$scope.chkValue};
  //console.log(ids);
  //var val={'id':id};
    //console.log(val);
       $http({
            url: '/api/admin/delcheckedcountry',
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
      } else{  swal("Your file is safe!");}
      })

 
}
setTimeout(getActionBtns, 1500);         


 }






}());
