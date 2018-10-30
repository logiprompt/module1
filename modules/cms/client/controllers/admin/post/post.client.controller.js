(function () {
  'use strict';

  angular
    .module('core')
    .controller('PostController', PostController);



    PostController.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function PostController ($scope, $http, $state, $stateParams, Upload) {

  $scope.formdata = {};
  $scope.check=1;
 /////////////////////select/////////////////////////////
 $http({
  url: '/api/admin/allPost',
  method: "POST",
  
})
.then(function(response) {
$scope.listpost=response.data.data;
     


}, 
function(response) { // optional
      // failed
});

 $http({
        url: '/api/admin/selectCategory',
        method: "POST",
        
    })
    .then(function(response) {
      $scope.list=response.data.data;
        
      
      // success
    }, 
    function(response) { // optional
            // failed
    });


    
    
 ///////////////////////insert////////////////////////////
 
 

  $scope.deletez=function(id){
       
        var val={'id':id}; 
      
      $http({
                url: '/api/admin/delmypost25',
                method: "POST",
                data:val
            })
            .then(function(response) {
         
            $state.reload();
            }, 
            function(response) { // optional
                    // failed
            });
        
        }
///////////////////////////////////////////////////////
$scope.insPost=function(){
 if($scope.validation()==0){
        var editorText = '';

        var data={'post':$scope.formdata.post,'meta':$scope.formdata.meta,'cat':$scope.formdata.cat,'description':editorText}
            
       
    
       
             Upload.upload({
               url: '/api/admin/insPost',
               data: data,
               file:$scope.imgss
             }).then(function (response) {
              $state.reload();
             
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
      
      if($scope.formdata.post=='' || angular.isUndefined($scope.formdata.post) ){
        $scope.adderrorclass(".post");
        error=1;
        
        } 
        if($scope.formdata.meta=='' || angular.isUndefined($scope.formdata.meta) ){
          $scope.adderrorclass(".meta");
          error=1;
          
          }
          if($scope.formdata.cat=='' || angular.isUndefined($scope.formdata.cat) ){
            $scope.adderrorclass(".cat");
            error=1;
            
            }
          return error;   



      }




/////////////////////////////////////////////////////////////////////////

$scope.choices = [{id: 'choice1'}];
//$scope.choices.length	
  // console.log($scope.choices.length);
 $scope.addNewChoice = function() {
       var newItemNo = $scope.choices.length+1;
       $scope.choices.push({'id':'choice'+newItemNo});
       //console.log($scope.choices.length);
 };
       
 $scope.removeChoice = function(val) {
         if($scope.choices.length>1){
       $scope.choices.splice(val,1);
         }
       //console.log($scope.choices.length);
 };

  $scope.postvideos = [{id: 'choice1'}];
//$scope.choices.length 
  // console.log($scope.choices.length);
 $scope.addNewVdo = function() {
       var newItemNo = $scope.postvideos.length+1;
       $scope.postvideos.push({'id':'choice'+newItemNo});
       //console.log($scope.choices.length);
 };
       
 $scope.removeVdo = function(val) {
         if($scope.postvideos.length>1){
       $scope.postvideos.splice(val,1);
         }
       //console.log($scope.choices.length);
 };


 function readFile(ev) {
 
  if (this.files && this.files[0]) {
  var FR= new FileReader();
  FR.onload = function(e) {
 var selimg=   ev.target.getAttribute('data-value');
 console.log(selimg);
  document.getElementsByClassName(selimg)[0].src= e.target.result;
  
  };       
  FR.readAsDataURL( this.files[0] );
  }
 }
 setTimeout(function(){

  document.getElementById("imgfile").addEventListener("change", readFile, false); 
 }, 1500);
 //if(document.getElementById("imgfile")!=null){
   
 ///}

// $scope.iconw=function(){
//         document.getElementById('imgfile').click();
//              }




 function getActionBtns(){


 $scope.addpage  = document.querySelectorAll(".add-action");
 $scope.addpage[0].addEventListener("click", $scope.newpage, false);

 $scope.editpage= document.querySelectorAll(".edit-action");
 $scope.editpage[0].addEventListener("click", $scope.editpages, false);

 var delpage= document.querySelectorAll(".delete-action");
 delpage[0].addEventListener("click", $scope.delpage, false);



 }
$scope.chkall=function(){
$scope.editpage[0].removeAttribute("href");
 
}
$scope.addchkval=function(linkid){
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');

  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/cms/editpost/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('addpost');
}
$scope.editpages=function(){
  console.log($scope.editpage[0].getAttribute("href"));
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
if($scope.editpage[0].getAttribute("href")){
document.location=$scope.editpage[0].getAttribute("href");
}
 }
 
}
$scope.chkValue=[];

$scope.producttype='1';



   $scope.showreview=function(){
    
document.getElementById("treview").style.display = "none";

document.getElementById("detailreview").style.display = "block";

}
 $scope.viewrev=function(){
    
document.getElementById("detailreview").style.display = "none";

document.getElementById("treview").style.display = "block";

}
$scope.delpage=function(){
  $scope.chkValue=[];
  console.log(22222222)
  //$state.go('addlanguage');
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
 
}
setTimeout(getActionBtns, 1500);

 }
}());
