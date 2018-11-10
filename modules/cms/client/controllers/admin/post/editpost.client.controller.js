(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditPostController', EditPostController);



    EditPostController.$inject = ['$scope','$http','$state','$stateParams','Upload'];

  function EditPostController ($scope, $http, $state,$stateParams,Upload) {
  //var vm = this;
//   CKEDITOR.replace( 'editor1', {
//     fullPage: true,
//     allowedContent: true,
//     extraPlugins: 'wysiwygarea'
// });
  
  $scope.formdata = {};
  $scope.check=1;
///////////////////select 0ne/////////////////////////////////


//         var val={'id':$stateParams.id};
       
//  $http({
//         url: '/api/admin/editpost',
//         method: "POST",
//         data:val
//     })
//     .then(function(response) {
//       $scope.view=response.data.data;
      
//       $scope.formdata.id=response.data.data._id;
//       $scope.formdata.post=response.data.data.post;
//       $scope.formdata.content=response.data.data.description;
//      //$scope.formdata.id=response.data.data.postimg;
//       $scope.formdata.cats=response.data.data.category.split(",");
    
//       $scope.formdata.meta=response.data.data.metatag;


//     }, 
//     function(response) { // optional
//             // failed
//     });



    $scope.producttype='1';



    $scope.showreview=function(){
     
 document.getElementById("treview").style.display = "none";
 
 document.getElementById("detailreview").style.display = "block";
 
 }
  $scope.viewrev=function(){
     
 document.getElementById("detailreview").style.display = "none";
 
 document.getElementById("treview").style.display = "block";
 
 }

/////////////////////select/////////////////////////////

    ///////////////delte////////////
    $scope.deletez=function(id){
       
      var val={'id':id}; 
    
    $http({
              url: '/api/admin/delmypost25',
              method: "POST",
              data:val
          })
          .then(function(response) {
       
          $state.go('post');
          }, 
          function(response) { // optional
                  // failed
          });
      
      }
 ///////////////////////up////////////////////////////
 $scope.upPost=function(){
  
  var editorText = CKEDITOR.instances.editor1.getData()

  var data={'id':$stateParams.id,'post':$scope.formdata.post,'meta':$scope.formdata.meta,'cat':$scope.formdata.cat,'description':editorText}

 
      if($scope.validation()==0){
 
       Upload.upload({
         url: '/api/admin/upPostz',
         data: data,
         file:$scope.imgss
       }).then(function (response) {
      $state.go('post');
      
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
    console.log(678678);
    if (this.files && this.files[0]) {
    var FR= new FileReader();
    FR.onload = function(e) {
      //document.getElementById("imgfiles").src= e.target.result;
  //console.log(ev.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]);
     // this.parent().parent().parent();
    // ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result;
      //document.getElementById("b64").innerHTML = e.target.result;
    };       
    FR.readAsDataURL( this.files[0] );
    }
   }
   setTimeout(function(){
  
    document.getElementById("imgfile").addEventListener("change", readFile, false); 
   }, 1500);
  
 $scope.iconw=function(){
  document.getElementById('imgfile').click();
  
       }

  $scope.del=function(id){
          
        var val={'id':id};
           $http({
                url: '/api/admin/delcate',
                method: "POST",
                data:val
            })
            .then(function(response) {
       $state.go('category');
                   
            }, 
            function(response) { // optional
                    // failed
            });
        
        }






 }
}());
