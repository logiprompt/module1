(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditPluginsController', EditPluginsController);



    EditPluginsController.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function EditPluginsController ($scope, $http, $state,$stateParams,Upload) {
  //var vm = this;
 
  $scope.formdata = {};
///////////////////select 0ne/////////////////////////////////


       var val={'id':$stateParams.id};

 $http({
        url: '/api/admin/editplugin',
        method: "POST",
        data:val
    })
    .then(function(response) {

     $scope.data= response.data.data;
 
      $scope.formdata.title=response.data.data.title;
      //$scope.formdata.title=response.data.data.pagename;
      $scope.formdata.id=response.data.data._id;
      
    }, 
    function(response) { // optional
            // failed
    });


$scope.iconw=function(){
        document.getElementById('imgfile').click();
        
             }

/////////////////////select/////////////////////////////
$http({
        url: '/api/admin/selectPlugin',
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
 $scope.updatePlugins=function(){

        var data={'title':$scope.formdata.title,'id':$stateParams.id}
         
        
            Upload.upload({
               url: '/api/admin/updateplugin',
               method: "POST",
               data: data,
               file:$scope.imgss
             }).then(function (response) {
                $state.reload();
             });






  
  }
 

  $scope.del=function(id){
          
        var val={'id':id};
           $http({
                url: '/api/admin/delplugin',
                method: "POST",
                data:val
            })
            .then(function(response) {
               $state.go('plugins');
             }, 
            function(response) 
            { 
                // optional
                // failed
            });
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
