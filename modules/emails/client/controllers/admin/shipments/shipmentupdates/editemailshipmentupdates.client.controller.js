(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditEmailshipmentupdatesController', EditEmailshipmentupdatesController);



    EditEmailshipmentupdatesController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','shipmentupdatesService'];

  function EditEmailshipmentupdatesController ($scope, $http, $state, $stateParams, Upload, shipmentupdatesService) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
  $scope.shipmentupdatesService=shipmentupdatesService;
  
   $scope.currentLan=localStorage.getItem('currentLang').toString();
  console.log($scope.currentLan)
  ///////////////////shipmentcomments By Id /////////////////////

    /*
      * Function : get shipmentcomments ById
      * Description : get shipmentcomments details
      * Owner : anju
   */
  $scope.currentLan=localStorage.getItem('currentLang').toString();
  $scope.defaultLang=localStorage.getItem('defaultLang').toString();

    $scope.getShipmentUpdatesById = function (userId) {
      console.log(0);
      $scope.shipmentupdatesService.getShipmentUpdatesById(userId).then(function (result) {
        console.log(userId);
         console.log(result);
         var details=result.data;
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
        else {

        }
      });
    }
    $scope.getShipmentUpdatesById($stateParams.id);



///////////////////////////////////////////////////////////////

    /*
     *
     *  Function : update ShipmentUpdates
     * Description : Update ShipmentUpdates details
     * Owner : anju
     * 
     */

    $scope.updateShipmentUpdates = function () {
      var formData = $scope.formdata;
      if ($scope.formdata.$valid && $scope.status != 0) {


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


        $scope.shipmentupdatesService.updateShipmentUpdates($stateParams.id, data).then(function (result) {
          console.log(result);
          if (result.statusText = "OK") {
            swal("Sccess!", "Successfully updated ", "success");
            $state.go('emailshipmentupdates');
          }
        });
      }
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

    $scope.editpage[0].setAttribute("href", "/email/editshipmentcreation/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('emailaddordercomments');
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
