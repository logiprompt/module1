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
		$scope.seltime ='0';
		$scope.selWorking ='0';
     $scope.district ='0';
  $scope.mainstoreService=mainstoreService;
 
 $scope.currentLang= localStorage.getItem('currentLang');
  console.log($scope.currentLan)
  
  
  
   $scope.insertMainstore = function(){
    console.log($scope.sunfrom);
    if($scope.formdata.$valid && $scope.status!=0){
    var data = {
        "name":$scope.name,
        "contactperson":$scope.contactperson,
        "email":$scope.email,
        "telephone":$scope.telephone,
        "mobile" :$scope.mobile,
		"fax" :$scope.fax,
		"country" :$scope.country,
		"state" :$scope.state,
		"district" :$scope.district,
		"postalcode" :$scope.postal,
		"address" :$scope.txtAddr,
		"lattitude" :$scope.txtlat,
		"longitude" :$scope.txtlong,
		"timezone" :$scope.seltime,
		"workingday" :$scope.selWorking,
		"weekend" :$scope.chkBox,
		"timing":
		{
		"sunday":		
		{"shift":$scope.selSunday,"mrng":{"frm":$scope.sunfrom,"to":$scope.sunto},"eve":{"frm":$scope.sunevefrom,"to":$scope.suneveto}
		},	
		"monday":
		
		{"shift":$scope.selMonday,"mrng":{"frm":$scope.monfrom,"to":$scope.monto},"eve":{"frm":$scope.monevefrom,"to":$scope.moneveto}
		}
		,
		"tuesday":		
		{"shift":$scope.selTuesday,"mrng":{"frm":$scope.tuefrom,"to":$scope.tueto},"eve":{"frm":$scope.tueevefrom,"to":$scope.tueeveto}
		},
		"wednesday":		
		{"shift":$scope.selWednesday,"mrng":{"frm":$scope.wedfrom,"to":$scope.wedto},"eve":{"frm":$scope.wedevefrom,"to":$scope.wedeveto}
		},
		"thursday":		
		{"shift":$scope.selThursday,"mrng":{"frm":$scope.thufrom,"to":$scope.thuto},"eve":{"frm":$scope.thuevefrom,"to":$scope.thueveto}
		},
		"friday":		
		{"shift":$scope.selFriday,"mrng":{"frm":$scope.frifrom,"to":$scope.frito},"eve":{"frm":$scope.frievefrom,"to":$scope.frieveto}
		},
		"saturday":		
		{"shift":$scope.selSaturday,"mrng":{"frm":$scope.satfrom,"to":$scope.satto},"eve":{"frm":$scope.satevefrom,"to":$scope.sateveto}
		},
		}
		
	}
    console.log($scope.mainstoreService);
      $scope.mainstoreService.insertMainstore(data).then(function(result){

        if(result.statusText = "OK"){
          swal("Success!", "Successfully added!", "success");  
          //$state.go('settingsmainstore');
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

  $scope.currentLan=localStorage.getItem('currentLang').toString();
  $scope.defaultLang=localStorage.getItem('defaultLang').toString();

    $scope.getMainstoreDetails = function () {
      console.log(0);
      $scope.mainstoreService.getMainstoreDetails().then(function (result) {
         console.log(result);
         var details=result.data;
        if (result.statusText = "OK") {
        console.log(details);
         $scope.userdetails = result.data;
		  $scope.email = $scope.userdetails.email;
          $scope.telephone = $scope.userdetails.telephone;
		  $scope.mobile = $scope.userdetails.mobile;
		  $scope.fax = $scope.userdetails.fax;
		  $scope.postal = $scope.userdetails.postalcode;
          $scope.country= $scope.userdetails.country;
		   $scope.state= $scope.userdetails.state;
		   $scope.district= $scope.userdetails.district;
		   $scope.txtlat = $scope.userdetails.lattitude;
		  $scope.txtlong = $scope.userdetails.longitude;
		   $scope.seltime = $scope.userdetails.timezone;
		   $scope.selWorking = $scope.userdetails.workingday;
		    $scope.selSunday = $scope.userdetails.timing.sunday.shift;
			$scope.selMonday = $scope.userdetails.timing.monday.shift;
			$scope.selTuesday = $scope.userdetails.timing.tuesday.shift;
			$scope.selWednesday = $scope.userdetails.timing.wednesday.shift;
			$scope.selThursday = $scope.userdetails.timing.thursday.shift;
			$scope.selFriday = $scope.userdetails.timing.friday.shift;
			$scope.selSaturday = $scope.userdetails.timing.saturday.shift;
			
			$scope.sunfrom = $scope.userdetails.timing.saturday.mrng.frm;
			$scope.sunto = $scope.userdetails.timing.saturday.mrng.to;
			$scope.sunevefrom = $scope.userdetails.timing.saturday.eve.frm;
			$scope.suneveto = $scope.userdetails.timing.saturday.eve.to;
			
			$scope.tuefrom = $scope.userdetails.timing.tuesday.mrng.frm;
			$scope.tueto = $scope.userdetails.timing.tuesday.mrng.to;
			$scope.tueevefrom = $scope.userdetails.timing.tuesday.eve.frm;
			$scope.tueeveto = $scope.userdetails.timing.tuesday.eve.to;
			
		  console.log($scope.userdetails.timing.tuesday.mrng.frm);
          if(angular.equals($scope.currentLan, $scope.defaultLang)){
		 
          $scope.name = $scope.userdetails.name;
          $scope.contactperson = $scope.userdetails.contactperson;
		  $scope.txtAddr = $scope.userdetails.address;
		  
		 
		  
		  
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
    $scope.getMainstoreDetails();


	
	
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
$scope.saturday=function(){
	console.log($scope.selSaturday);
	if($scope.selSaturday==2){
	$scope.satMrng=1;
	$scope.satEve=0;	
	}
	else if($scope.selSaturday==3){
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
