(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditEmailshipmentcreationController', EditEmailshipmentcreationController);



    EditEmailshipmentcreationController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','shipmentcreationService'];

  function EditEmailshipmentcreationController ($scope, $http, $state, $stateParams, Upload, shipmentcreationService) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
  $scope.shipmentcreationService=shipmentcreationService;
  
   $scope.currentLan=localStorage.getItem('currentLang').toString();
  console.log($scope.currentLan)
  ///////////////////shipmentcreation By Id /////////////////////

    /*
      * Function : get shipmentcreation ById
      * Description : get shipmentcreation details
      * Owner : anju
   */
  $scope.currentLan=localStorage.getItem('currentLang').toString();
  $scope.defaultLang=localStorage.getItem('defaultLang').toString();

    $scope.getShipmentCreationById = function (userId) {
      console.log(0);
      $scope.shipmentcreationService.getShipmentCreationById(userId).then(function (result) {
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
    $scope.getShipmentCreationById($stateParams.id);



///////////////////////////////////////////////////////////////

    /*
     *
     *  Function : update shipmentcreation
     * Description : Update shipmentcreation details
     * Owner : anju
     * 
     */

    $scope.updateShipmentCreation = function () {
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


        $scope.shipmentcreationService.updateShipmentCreation($stateParams.id, data).then(function (result) {
          console.log(result);
          if (result.statusText = "OK") {
            swal("Sccess!", "Successfully updated ", "success");
           $state.go('emailshipmentcreation');
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



 }


}());
