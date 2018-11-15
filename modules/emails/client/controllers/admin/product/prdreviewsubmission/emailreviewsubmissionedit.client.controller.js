(function () {
  'use strict';

  angular
    .module('emails')
    .controller('EmailReviewSubmissionEdit', EmailReviewSubmissionEdit);



    EmailReviewSubmissionEdit.$inject = ['$scope','$http','$state','$stateParams', 'Upload','prdReviewSubService'];

  function EmailReviewSubmissionEdit($scope, $http, $state, $stateParams, Upload,prdReviewSubService) {

   //$scope.formdata = {};
   $scope.status = "0";
   $scope.username= localStorage.getItem('username');
   $scope.prdReviewSubService = prdReviewSubService;

 /////////////////////select/////////////////////////////
////////////////////////ip fetch//////////////////////////////

$http.get("https://ipinfo.io/").then(function (response) {
  $scope.ip = response.data.ip;
  
  });
 ///////////////////////////////////////////////////////
 $scope.currentLang= localStorage.getItem('currentLang');
 
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

//////////////////////////////////////////////////////////////////////////

$scope.delUserForgot = function(userId){
		   
		   
  swal({
          title: 'Are you sure?',
          text: "You want to delete this user!",
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if(result){
          $scope.prdReviewSubService.delUserForgot(userId).then(function(result){
          if(result.statusText = "OK"){
          swal(
                        'Deleted!',
                        'User has been deleted.',
                        'success'
                      )
          $state.go('emailordercreation');
           }else{
             
           }
        })
        }
        })
 
}


/////////////////////////////////////////////////////////////////////
 ///////////////////User Forgot By Id /////////////////////

 /*
	 * Function : getUserForgotById
	 * Description : get User Forgot details
	 * Owner : ck
*/

//console.log( $scope.prdReviewSubService);
$scope.currentLan=localStorage.getItem('currentLang').toString();
  $scope.defaultLang=localStorage.getItem('defaultLang').toString();

  $scope.getPrdReviewSubById = function(userId)
  {
    //console.log(0);
      $scope.prdReviewSubService.getPrdReviewSubById(userId).then(function(result)
      {
        //console.log(result);
        var details=result.data;
       if (result.statusText = "OK") {
         //console.log(result);
        
            $scope.status =details.status.toString();    
         if(angular.equals($scope.currentLan, $scope.defaultLang)){
         $scope.userdetails = result.data;
         $scope.name = $scope.userdetails.name;
         $scope.subject = $scope.userdetails.subject;
         $scope.content = $scope.userdetails.content;
         $scope.custom = $scope.userdetails.custom;
                }
       else{
        // console.log(details.oLang)
         $scope.userdetails = result.data;
         $scope.name =angular.isUndefined(details.oLang) ? details.name:details.oLang[ $scope.currentLan].name ;
         $scope.subject = angular.isUndefined(details.oLang)  ? details.subject:details.oLang[ $scope.currentLan].subject ;
         $scope.content =angular.isUndefined(details.oLang) ?details.content: details.oLang[ $scope.currentLan].content ;
         $scope.custom = angular.isUndefined(details.oLang)  ? details.custom:details.oLang[ $scope.currentLan].custom ; 

       }
       }
       else {

       }
      });
  }
  $scope.getPrdReviewSubById($stateParams.id);



  // $http({
  //   url: '/api/userforgot/'+$stateParams.id,
  //   method: "GET",
    
  // })
  // .then(function(result) {
  //   console.log(result);
  // $scope.langlist=result.data;
  //       // success
  //    //console.log( $scope.counlist)  
  //       //console.log(5464564564);
  // }, 
  // function(response) { // optional
  //       // failed
  // });




 //////////////////////////////////
  /*
	 *
   *  Function : update UserForgot
	 * Description : Update UserForgot details
	 * Owner : ck
   * 
	 */

      $scope.updateprdReviewSub = function(){
        
        //console.log(564564);
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
        $scope.prdReviewSubService.updateprdReviewSub($stateParams.id,data).then(function(result){
          if(result.statusText = "OK")
          {
            swal("Sccess!", "Successfully updated User", "success"); 
            $state.reload();
          }
        });
      }
      }

///////////////////////////////////////////////////////////////////////
     
 }
}());
