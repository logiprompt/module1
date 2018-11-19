(function () {
  'use strict';

  angular
    .module('core')
    .controller('Mainstore', Mainstore);



    Mainstore.$inject = ['$scope','$http','$state','$stateParams', 'Upload', 'mainstoreService'];

  function Mainstore ($scope, $http, $state, $stateParams, Upload, mainstoreService) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
  $scope.country ='0';
   $scope.state ='0';
    $scope.selSunday ='0';
	 $scope.selMonday ='0';
	 $scope.selTuesday ='0';
	  $scope.selWednesday ='0';
	  $scope.selThursday ='0';
	   $scope.selFriday ='0';
	    $scope.selSaturday ='0';
     $scope.district ='0';
  $scope.mainstoreService=mainstoreService;
 
 $scope.currentLang= localStorage.getItem('currentLang');
  console.log($scope.currentLan)
  
  
  
   $scope.insMainstore = function(){
    
    if($scope.formdata.$valid && $scope.status!=0){
    var data = {
        "name":$scope.name,
        "contactperson":$scope.contactperson,
        "email":$scope.email,
        "telephone":$scope.telephone,
        "mobile" :$scope.mobile,
		"fax" :$scope.fax
        }
      
    console.log($scope.cmstagsubmissionService);
      $scope.mainstoreService.insMainstore(data).then(function(result){

        if(result.statusText = "OK"){
          swal("Success!", "Successfully added!", "success");  
          $state.go('settingsmainstore');
        }else{
          swal("error!", "Already exist!", "error");
        }
        
      })
    }
      
    }
	
	
	 $scope.getCountrys = function () {
    console.log(0);
    $scope.mainstoreService.getCountrys().then(function (result) {
      if (result.statusText = "OK") {
        $scope.countrylist = result.data;
        //console.log(1);
        console.log(result.data);
      } else {

      }
    });
  }
  $scope.getCountrys();
  
  //////////////////change state////////////////////////////////////

 
$scope.getStates=function(){
	var changeId=$scope.country;
console.log(changeId);
   $scope.mainstoreService.getStatesbyId(changeId).then(function (result) {
      if (result.statusText = "OK") {
        $scope.statelist = result.data;
        console.log(1);
        console.log(result.data);
      } else {

      }
    });

}

//////////////////change district////////////////////////////////////

 
$scope.getDistrict=function(){
	var stateId=$scope.state;
console.log(stateId);
   $scope.mainstoreService.getDistrictbyId(stateId).then(function (result) {
      if (result.statusText = "OK") {
        $scope.districtlist = result.data;
        console.log(1);
        console.log(result.data);
      } else {

      }
    });

}
	
	
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
$scope.sunEve=0;	
$scope.sunMrng=0;
$scope.sunday=function(){
	console.log($scope.selSunday);
	if($scope.selSunday==2){
	$scope.sunMrng=1;
	$scope.sunEve=0;	
	}
	else if($scope.selSunday==3){
	$scope.sunMrng=1;
	$scope.sunEve=1;	
	}
	else{
		$scope.sunMrng=0;
		$scope.sunEve=0;
		
		}
	
	}
$scope.monEve=0;	
$scope.monMrng=0;
$scope.monday=function(){
	console.log($scope.selMonday);
	if($scope.selMonday==2){
	$scope.monMrng=1;
	$scope.monEve=0;	
	}
	else if($scope.selMonday==3){
	$scope.monMrng=1;
	$scope.monEve=1;	
	}
	else{
		$scope.monMrng=0;
		$scope.monEve=0;
		
		}
	
	}
	
$scope.tueEve=0;	
$scope.tueMrng=0;
$scope.tuesday=function(){
	console.log($scope.selTuesday);
	if($scope.selTuesday==2){
	$scope.tueMrng=1;
	$scope.tueEve=0;	
	}
	else if($scope.selTuesday==3){
	$scope.tueMrng=1;
	$scope.tueEve=1;	
	}
	else{
		$scope.tueMrng=0;
		$scope.tueEve=0;
		
		}
	
	}
	
$scope.wedEve=0;	
$scope.wedMrng=0;
$scope.wednesday=function(){
	console.log($scope.selWednesday);
	if($scope.selWednesday==2){
	$scope.wedMrng=1;
	$scope.wedEve=0;	
	}
	else if($scope.selWednesday==3){
	$scope.wedMrng=1;
	$scope.wedEve=1;	
	}
	else{
		$scope.wedMrng=0;
		$scope.wedEve=0;
		
		}
	
	}
	
	$scope.thuEve=0;	
$scope.thuMrng=0;
$scope.thursday=function(){
	console.log($scope.selThursday);
	if($scope.selThursday==2){
	$scope.thuMrng=1;
	$scope.thuEve=0;	
	}
	else if($scope.selThursday==3){
	$scope.thuMrng=1;
	$scope.thuEve=1;	
	}
	else{
		$scope.thuMrng=0;
		$scope.thuEve=0;
		
		}
	
	}
	
	$scope.friEve=0;	
$scope.friMrng=0;
$scope.friday=function(){
	console.log($scope.selFriday);
	if($scope.selFriday==2){
	$scope.friMrng=1;
	$scope.friEve=0;	
	}
	else if($scope.selFriday==3){
	$scope.friMrng=1;
	$scope.friEve=1;	
	}
	else{
		$scope.friMrng=0;
		$scope.friEve=0;
		
		}
	
	}
	$scope.satEve=0;	
$scope.satMrng=0;
$scope.Saturday=function(){
	console.log($scope.selSaturday);
	if($scope.selSaturday==2){
	$scope.satMrng=1;
	$scope.satEve=0;	
	}
	else if($scope.selFriday==3){
	$scope.satMrng=1;
	$scope.satEve=1;	
	}
	else{
		$scope.satMrng=0;
		$scope.satEve=0;
		
		}
	
	}
      


 }






}());
