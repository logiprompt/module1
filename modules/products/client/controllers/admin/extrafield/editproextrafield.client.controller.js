(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditProextrafieldController', EditProextrafieldController);

    EditProextrafieldController.$inject = ['$scope','$http','$state','$stateParams','ProductsService','extrafieldService'];

  function EditProextrafieldController ($scope, $http, $state,$stateParams,ProductsService,extrafieldService) {
  //var vm = this;
	  $scope.extrafieldService = extrafieldService;
	  $scope.formdata = {};

	  /*
	   * Function : getExtraFieldGroupById
	   * description : Get one extra field group by name
	   * Owner : Prabin
	   */
	  	$scope.getExtraFieldGroupById = function(groupId){
	  		$scope.extrafieldService.getExtraFieldGroupById(groupId).then(function(result){
			   if(result.statusText = "OK"){
				   $scope.extrafieldGroup = result.data;
				   $scope.groupName = $scope.extrafieldGroup.groupname;
				   $scope.status = $scope.extrafieldGroup.status.toString();
				   
				  }else{
					  
				  }
		   });
	  	}
	  	$scope.getExtraFieldGroupById($stateParams.id);
	 
	  	
	  	/*
		   * Function : deleteExtraFieldGroupById
		   * description : Get one extra field group by name
		   * Owner : Prabin
		   */
		  	$scope.deleteExtraFieleGroup = function(){
		  		 $scope.extrafieldService.deleteExtraFieldGroup($stateParams.id).then(function(result){
					   if(result.statusText = "OK"){
						   $state.go('extrafield');
						  }
				   });
		  	}
 
		  	/*
			 * Function : deleteExtraFieldGroupById
			 * description : Get one extra field group by name
			 * Owner : Prabin
			 */
			 $scope.updateExtraFieleGroup = function(){
				 if($scope.formdata.$valid){
		  	var data = {		  			 
		 				"groupname":$scope.groupName,
		 				"status" :$scope.status
		 			  }
		  	
		  	 $scope.extrafieldService.updateExtrafieldGroup($stateParams.id,data).then(function(result){
				   if(result.statusText = "OK"){
					   swal("Sccess!", "Successfully updated Extra Field Group!", "success"); 
					   $state.go('extrafield');
					  }
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
                  
                  if($scope.formdata.category=='' || angular.isUndefined($scope.formdata.category) ){
                    $scope.adderrorclass(".cat");
                    error=1;
                    
                    }
                  
                    return error;    
            }



 }
}());
