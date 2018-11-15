(function () {
  'use strict';

  angular
    .module('emails')
    .controller('emailnewslettersubscriptioneditController', emailnewslettersubscriptioneditController);



    emailnewslettersubscriptioneditController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','subscriptionService'];

  function emailnewslettersubscriptioneditController ($scope, $http, $state, $stateParams, Upload,subscriptionService) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
  $scope.subscriptionService = subscriptionService;
 /////////////////////select/////////////////////////////

///////////////////////////////////////////////////////


$scope.currentLan=localStorage.getItem('currentLang').toString();



       
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
////////////list invoice////////////////////////////////////////////////
$scope.getsubscription = function(){
  console.log(0);
  $scope.subscriptionService.getsubscription().then(function(result){
   if(result.statusText = "OK"){
     $scope.invoicelist = result.data;
console.log(1);
console.log(result.data);
    }else{
      
    }
 });
}
$scope.getsubscription();
////////////////add invoice creation/////////////////////////////////////
$scope.addSubscription = function(){

 
  if($scope.formdata.$valid && $scope.status!=0){
  var data = {
      "name":$scope.name,
      "subject":$scope.subject,
      "content":$scope.content,
      "custom":$scope.custom,
      "status" :$scope.status
      }
    
  
    $scope.subscriptionService.addSubscription(data).then(function(result){
      if(result.statusText = "OK"){
        swal("Success!", "Successfully Created Subscription Template!", "success");  
        $state.go('emailsubscription');
      }else{
        swal("error!", "Subscription Template already exist!", "error");
      }
      
    })
  }
    
  }

  //////////////////////////delete invoice//////////////////////////////
  $scope.delInvoice = function (userId) {


    swal({
      title: 'Are you sure?',
      text: "You want to delete this Invoice!",
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result) {
        $scope.subscriptionService.delInvoice(userId).then(function (result) {
          if (result.statusText = "OK") {
            swal(
              'Deleted!',
              'Invoice has been deleted.',
              'success'
            )
            $state.reload();
          } else {

          }
        })
      }
    })

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




 
setTimeout(getActionBtns, 1500);         


 }






}());
