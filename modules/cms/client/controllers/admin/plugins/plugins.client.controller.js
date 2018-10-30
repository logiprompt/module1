(function () {
  'use strict';

  angular
    .module('core')
    .controller('PluginsController', PluginsController);



    PluginsController.$inject = ['$scope','$http','$state','$stateParams', 'Upload'];

  function PluginsController ($scope, $http, $state,$stateParams,Upload) {

  $scope.formdata = {};
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
     $scope.iconw=function(){
document.getElementById('imgfile').click();

     }
    


 ///////////////////////insert////////////////////////////
 $scope.addPlugin=function(){
 var data={'title':$scope.formdata.title,}
    


      Upload.upload({
        url: '/api/admin/addplugin',
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
            
             $state.reload();
                   
            }, 
            function(response) { // optional
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
       
///////////////////////////////////////////////////////////////////////

 }
}());
