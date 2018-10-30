(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditPageController', EditPageController);



    EditPageController.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function EditPageController ($scope, $http, $state,$stateParams,Upload) {
  //var vm = this;
 
  $scope.formdata = {};
///////////////////select 0ne/////////////////////////////////
if($stateParams.id){

        var val={'id':$stateParams.id};

 $http({
        url: '/api/admin/editpage',
        method: "POST",
        data:val
    })
    .then(function(response) {

     $scope.data= response.data.data;
  //console.log($scope.data);
      $scope.formdata.title=response.data.data.pagename;
       $scope.formdata.content=response.data.data.description;
       $scope.formdata.meta=response.data.data.metatag;
      //$scope.formdata.title=response.data.data.pagename;
      $scope.formdata.id=response.data.data._id;
      
    }, 
    function(response) { // optional
            // failed
    });

}


// CKEDITOR.replace( 'editor1', {
//         fullPage: true,
//         allowedContent: true,
//         extraPlugins: 'wysiwygarea'
// });

/////////////////////select/////////////////////////////
$http({
        url: '/api/admin/selectPage',
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
 $scope.updatePage=function(){

        //$scope.formdata.id=$stateParams.id;

        var editorText = CKEDITOR.instances.editor1.getData()
        var data={'pagename':$scope.formdata.title,'meta':$scope.formdata.meta,'description':editorText,'id':$stateParams.id}
          
        if($scope.validation()==0){
            Upload.upload({
               url: '/api/admin/updatepage',
               method: "POST",
               data: data,
               file:$scope.imgss
             }).then(function (response) {
                $state.go('page');
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
          
          if($scope.formdata.title=='' || angular.isUndefined($scope.formdata.title) ){
            $scope.adderrorclass(".title");
            error=1;
            
            }
            if($scope.formdata.meta=='' || angular.isUndefined($scope.formdata.meta) ){
              $scope.adderrorclass(".meta");
              error=1;
              
              }
              // if($scope.formdata.cat=='' || angular.isUndefined($scope.formdata.cat) ){
              //   $scope.adderrorclass(".cat");
              //   error=1;
                
              //   }
              return error;   
    
    
    
          }
  $scope.del=function(id){
          
        var val={'id':id};
           $http({
                url: '/api/admin/delpage',
                method: "POST",
                data:val
            })
            .then(function(response) {
       $state.go('page');
                   
            }, 
            function(response) { // optional
                    // failed
            });
        
        }


        $scope.iconw=function(){
         
                document.getElementById('imgfile').click();
                
                     }

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





 }
}());
