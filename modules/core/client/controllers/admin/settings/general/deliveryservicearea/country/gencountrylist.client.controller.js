(function () {
  'use strict';

  angular
    .module('core')
    .controller('GenCountryListController', GenCountryListController);

    GenCountryListController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','serviceAreaCountryService'];

  function GenCountryListController ($scope, $http, $state, $stateParams, Upload,serviceAreaCountryService) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
  $scope.serviceAreaCountryService = serviceAreaCountryService;
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
  // document.getElementById("imgfile").addEventListener("change", readFile, false); 
 }

$scope.iconw=function(){

        document.getElementById('imgfile').click();
        
             }

            // $(document).find('#myTable').DataTable();



 ///////////////////list /////////////////////
 /*
	 * Function : getordercreation
	 * Description : get ordercreation details
	 * Owner : jeeja
	 */

  $scope.getServiceAreas = function(){
    //console.log(0);
    $scope.serviceAreaCountryService.getServiceAreas().then(function(result){
     if(result.statusText = "OK"){
       $scope.servicearealist = result.data;
//console.log(1);
console.log(result.data);
      }else{
        
      }
   });
  }
  $scope.getServiceAreas();
 //////////////////////////////////

  /*
	 *
   *  Function : addordercreation
	 * Description : Add ordercreation details
	 * Owner : jeeja
   * 
	 */
  
  $scope.addNoStock = function()
  {    
   // console.log(555555555);
    if($scope.formdata.$valid)
    {
      var data={
                  "name":$scope.name,
                  "subject":$scope.subject,
                  "content":$scope.content,
                  "custom":$scope.custom,
                  "status" :$scope.status,
                  "oLang":{}
                }    
      $scope.nostockService.addNoStock(data).then(function(result)
      {
        if(result.statusText = "OK")
        {
				  swal("Success!", "Successfully added!", "success");  
				  $state.go('emailnostocklist');
        }
        else
        {
				  swal("error!", "Already exist!", "error");
			  }			  
		  })
		}
  }

///////////////////////////////////////////////////////////////////////

/*
	   * FUnction : delOrderCreation
	   * Description : delete OrderCreation By Id
	   * Owner :jeeja
	   */
    $scope.delNoStock = function(userId){
		   
		   
      swal({
              title: 'Are you sure?',
              text: "You want to delete this user!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if(result){
              $scope.nostockService.delNoStock(userId).then(function(result){
              if(result.statusText = "OK"){

              swal('Deleted!',
                   'User has been deleted.',
                   'success')

              $state.reload();
               }else{
                 
               }
            })
            }
            })
     
    }


////////////////////////////////////////////////////////////////////////////////






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
 // console.log(linkid)
 // console.log(checkedValue[0])
   if(checkedValue.length>1){
   $scope.editpage[0].removeAttribute("href");
   }
   else{
 
     $scope.editpage[0].setAttribute("href", "/settings/generalcountryedit/"+linkid);
   }
 
 }
 $scope.chk={};
 
 $scope.newpage=function(){
   $state.go('generalcountryadd');
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
 // console.log(checkedValue)
   for(var i=0;i<checkedValue.length;i++){
     $scope.chkValue.push(checkedValue[i].value);
   }
  
 }
 setTimeout(getActionBtns, 1500);         
 
 










///////////////////////////////////////////////////////////////////////
  }
}());
