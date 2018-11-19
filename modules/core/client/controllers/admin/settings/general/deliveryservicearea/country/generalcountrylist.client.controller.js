(function () {
  'use strict';

  angular
    .module('core')
    .controller('Generalcountrylist', Generalcountrylist);



    Generalcountrylist.$inject = ['$scope','$http','$state','$stateParams', 'Upload','serviceAreaCountryService'];

  function Generalcountrylist ($scope, $http, $state, $stateParams, Upload,serviceAreaCountryService) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
  $scope.serviceAreaCountryService = serviceAreaCountryService;
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

 //////////////////////////////////////////////////////////////////////
 /*
	   * FUnction : delOrderCreation
	   * Description : delete OrderCreation By Id
	   * Owner :ck
	   */

$scope.getserviceAreaCountry = function(){
  //console.log(0);
   $scope.serviceAreaCountryService.getserviceAreaCountry().then(function(result){
    console.log(result.data);
   if(result.statusText = "OK"){
     $scope.servicecountrylist = result.data;
//console.log(1);
//console.log(result.data);
    }else{
      
    }
 });
}
$scope.getserviceAreaCountry();
///////////////////////////////////////////////////////////////////////////


    /*
	   * FUnction : delOrderCreation
	   * Description : delete OrderCreation By Id
	   * Owner :ck
	   */


$scope.addgencountrylist = function()
{   
  $scope.chkValue=[];
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
var countries= $scope.chkValue;
  console.log(countries);

var clength=countries.length;
//console.log(clength);

  if(clength!=0)
  {
   // console.log(98080);

    var data={
                "countries":countries,
                "clength":clength
              }    
    $scope.serviceAreaCountryService.addgencountrylist(data).then(function(result)
    {
      if(result.statusText = "OK")
      {
        swal("Success!", "Successfully added!", "success");  
       // $state.go('emailnostocklist');
       $state.reload();
      }
      else
      {
        swal("error!", "Already exist!", "error");
      }			  
    })
  }
}

///////////////////////////////////////////////////////////////////////

 }






}());
