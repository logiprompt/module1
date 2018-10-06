(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditProductController', EditProductController);



    EditProductController.$inject = ['$scope','$http','$state','$stateParams','Upload'];

  function EditProductController ($scope, $http, $state,$stateParams,Upload) {
  //var vm = this;
//   CKEDITOR.replace( 'editor1', {
//     fullPage: true,
//     allowedContent: true,
//     extraPlugins: 'wysiwygarea'
// });
  
  $scope.formdata = {};
///////////////////select 0ne/////////////////////////////////


        var val={'id':$stateParams.id};
       
 $http({
        url: '/api/admin/editpost',
        method: "POST",
        data:val
    })
    .then(function(response) {
      $scope.view=response.data.data;
      
      $scope.formdata.id=response.data.data._id;
      $scope.formdata.post=response.data.data.post;
      $scope.formdata.content=response.data.data.description;
     //$scope.formdata.id=response.data.data.postimg;
      $scope.formdata.cats=response.data.data.category.split(",");
    
      $scope.formdata.meta=response.data.data.metatag;


    }, 
    function(response) { // optional
            // failed
    });




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
     document.getElementById("imgfile").addEventListener("change", readFile, false); 
   }
  
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
