(function () {
  'use strict';

  angular
    .module('core')
    .controller('Mainstore', Mainstore);



    Mainstore.$inject = ['$scope','$http','$state','$stateParams', 'Upload', 'mainstoreService'];

  function Mainstore ($scope, $http, $state, $stateParams, Upload, mainstoreService) {

  $scope.formdata = {};
  $scope.formdata.status ='0';
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




      


 }






}());
