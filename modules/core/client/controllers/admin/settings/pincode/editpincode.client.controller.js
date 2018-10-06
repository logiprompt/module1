(function () {
  'use strict';

  angular
    .module('core')
    .controller('Editpincode', Editpincode);



    Editpincode.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function Editpincode($scope, $http, $state, $stateParams, Upload) {

  $scope.formdata = {};
  //$scope.formdata.status ='0';
  //$scope.formdata.country ='0';
  $scope.formdata.username= localStorage.getItem('username');

  ////////////////////////ip fetch//////////////////////////////

  $http.get("https://ipinfo.io/").then(function (response) {
$scope.formdata.ip = response.data.ip;

});
console.log($scope.formdata);
console.log(0);


 /////////////////////select country/////////////////////////////
 $http({
        url: '/api/admin/selectCountry',
        method: "POST",       
    })
    .then(function(response) {
      $scope.countrylist=response.data.data;
    
   
           
    }, 
    function(response) { // optional
            // failed
    });
		/////////////////////select state/////////////////////////////
    $http({
      url: '/api/admin/selectState',
      method: "POST",       
  })
  .then(function(response) {
    $scope.statedata=response.data.data;
  
  console.log($scope.statedata);
         
  }, 
  function(response) { // optional
          // failed
  });
	/////////////////////select district/////////////////////////////
  $http({
    url: '/api/admin/selectDistrict',
    method: "POST",       
})
.then(function(response) {
  $scope.disdata=response.data.data;

console.log($scope.disdata);
       
}, 
function(response) { // optional
        // failed
});

/////////////////////////////////load language//////////////////////////////////////////
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
/////////////////////////////////load business countries//////////////////////////////////////////
$http({
  url: '/api/admin/selectbusinessCountry',
  method: "POST",
  
})
.then(function(response) {
$scope.buslist=response.data.data;

      // success
}, 
function(response) { // optional
      // failed
});
 
	/////////////////////////view pincode by id/////////////
var pinid={id: $stateParams.id};
$http({
 url: '/api/admin/viewPincodebyid',
 method: "POST",
 data:pinid
})
.then(function(response) {

$scope.viewpin=response.data.data;
console.log($scope.viewpin);
$scope.formdata.country=response.data.data.country;
$scope.formdata.state=response.data.data.state;
$scope.formdata.district=response.data.data.district;
$scope.formdata.pincode=response.data.data.pincode;
$scope.formdata.status=response.data.data.status;

//$scope.formdata.status=response.data.data.countrystatus;
     // success
}, 
function(response) { 
 // optional
     // failed
});
//////////////////load state////////////////////////////////////

 
$scope.changecountry=function(){
	var changeid={'id':$scope.formdata.country};

    $http({
          url: '/api/admin/changecountry',
          method: "POST",
          data:changeid
      })
      .then(function(response) {
	
        $scope.statedata=response.data.data;
             
      }, 
      function(response) { // optional
              // failed
      });

}
//////////////////load state////////////////////////////////////

 
$scope.changestate=function(){
	var changeid={'id':$scope.formdata.state};

    $http({
          url: '/api/admin/changestate',
          method: "POST",
          data:changeid
      })
      .then(function(response) {
		
        $scope.disdata=response.data.data;
             
      }, 
      function(response) { // optional
              // failed
      });

}
 
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
///////////////////update district//////////////////////////////////////

$scope.updatePincode=function()
{
 var data={'id':$stateParams.id,'country':$scope.formdata.country,
 'state':$scope.formdata.state,'district':$scope.formdata.district,'pincode':$scope.formdata.pincode,
 'status':$scope.formdata.status,'username':$scope.formdata.username,'ip':$scope.formdata.ip}
  //console.log(data);
  if($scope.validation()==0){
     $http({
          url: '/api/admin/updatePincode',
          method: "POST",
          data:data
      })
      .then(function(response) {
        //console.log(response);
     if(response.data.data==1)
       {
          swal("Success!", "Successfully Updated!", "success");
          $state.go('pincodelist');
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
                  if($scope.formdata.country==0 || angular.isUndefined($scope.formdata.country) ){
                    $scope.adderrorclass(".country");
                   
                    error=1;
                    }
          if($scope.formdata.state==0 || angular.isUndefined($scope.formdata.state) ){
                     $scope.adderrorclass(".state");
                   
                     error=2;
                     }
           if($scope.formdata.district==0 || angular.isUndefined($scope.formdata.district) ){
                     $scope.adderrorclass(".district");
                   
                     error=3;
                     }
                     if($scope.formdata.pincode=='' || angular.isUndefined($scope.formdata.pincode) ){
                      $scope.adderrorclass(".pincode");
                    
                      error=4;
                      }
                   
              if($scope.formdata.status==0 || angular.isUndefined($scope.formdata.status) ){
                    $scope.adderrorclass(".status");
                    
                    error=5;
                    }

                    return error;          
            }


////////////////////////delete district///////////////////////////////
$scope.del=function(id){

 
         
             var val={'id':id};
             //console.log(val);
                $http({
                     url: '/api/admin/delPncode',
                     method: "POST",
                     data:val
                 })
                 .then(function(response) {
           
                 if(response.data.data==1)
                 {
                 swal("Sccess!", "Successfully Deleted pincode!", "success");
                 $state.reload();
                 }
                        
                 }, 
                 function(response) { // optional
                         // failed
                 });
             
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
console.log(linkid)
console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/settings/pincodeedit/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('pincodeadd');
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
