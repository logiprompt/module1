(function () {
  'use strict';

  angular
    .module('core')
    .controller('EmailnewslettersubscriptioneditController', EmailnewslettersubscriptioneditController);


    EmailnewslettersubscriptioneditController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','subscriptionService'];

  function EmailnewslettersubscriptioneditController ($scope, $http, $state, $stateParams, Upload,subscriptionService) {

  $scope.formdata = {};
   $scope.status = "0";
   $scope.username= localStorage.getItem('username');
   $scope.subscriptionService = subscriptionService;


 /////////////////////select/////////////////////////////
////////////////////////ip fetch//////////////////////////////

$http.get("https://ipinfo.io/").then(function (response) {
  $scope.ip = response.data.ip;
  
  });
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

 ///////////////////list /////////////////////
 
 /*
	 * Function : getInvoiceById
	 * Description : get User details
	 *
	 */
  $scope.currentLan=localStorage.getItem('currentLang').toString();
  $scope.defaultLang=localStorage.getItem('defaultLang').toString();
  $scope.getSubscriptionById = function(userId){
    console.log(0);
    $scope.subscriptionService.getSubscriptionById(userId).then(function(result){
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
   });
  }
  $scope.getSubscriptionById($stateParams.id);
 //////////////////////////////////
  /*
	 *
   *  Function : update invoicecreation
	 * Description : Update Currency details
	 * 
   * 
   * 
	 */

      $scope.updateSubscription = function(){
        console.log(110);
        if($scope.formdata.$valid && $scope.status!=0){
          if (localStorage.getItem("currentLang") == 'en') 
          {
            var data = 
            {
              "name": $scope.name,
              "subject": $scope.subject,
              "content": $scope.content,
              "custom": $scope.custom,
              "status": $scope.status,
              "userId": $stateParams.id,
              "isDefaultLang" : true
            }
          }
          else 
          {
            var data = 
            {
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
       //console.log(data);
       $scope.subscriptionService.updateSubscription($stateParams.id,data).then(function(result){
          if(result.statusText = "OK"){
            swal("Success!", "Successfully updated Subscription", "success"); 
            $state.go('emailsubscription');
           }
        });
      }
      }

///////////////////////////////////////////////////////////////////////






    }

}());
