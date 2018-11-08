(function () {
  'use strict';

  angular
    .module('cms')
    .controller('PostController', PostController);



    PostController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','CmsService'];

  function PostController ($scope, $http, $state, $stateParams, Upload,CmsService) {
	  $scope.postformdata = {};
	  $scope.choices = ["0"];
	  $scope.postvideos = ["0"];
	  $scope.postformdata.post_displayinmenu = 1;
	  
	  $scope.addNewChoice = function(index){
		  $scope.choices.push(index);
	  }
	  $scope.removeChoice = function(index){
		  $scope.choices.pop(index,1);
	  }
	  
	  $scope.addNewVdo = function(index){
		  $scope.postvideos.push(index);
	  }
	  $scope.removeVdo = function(index){
		  $scope.postvideos.pop(index,1);
	  }
	  
	  $scope.addpost = function(){
		 $scope.postformdata.post_content = CKEDITOR.instances.editor1.getData().replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i,"$1");;

		  console.log( $scope.postformdata);
		  
		  CmsService.addPost($scope.postformdata).then(function(result){
			  if(result.statusText = "OK"){
				   
   				 swal( 'Created!',
   	                     'New post created sucessfully',
   	                     'success'
   	                   )
   				$state.go('post');
   				  }else{
   					swal( 'error!',
	      	                   'Error while creating new post ! Please try again later.',
	      	                   'error'
	      	                )
   				  }
		  })
	  }
	  
	  
	  $scope.generateSlgURL = function(){
     	 var replaceSpacesText = $scope.postformdata.post_title;
     	 $scope.postformdata.post_slug = replaceSpacesText.split(" ").join("_").toLowerCase();
     	 $scope.postformdata.post_urlkey = "cms/post/"+$scope.postformdata.post_slug+"_"+Number(new Date())+".html"
      }
	  
	  $scope.listPost = function(){
		  CmsService.listPost().then(function(result){
			  console.log( result);
			  $scope.postLists = result.data;
		  });
	  }
	  $scope.listPost();
	  
	  
	  $scope.delete_post = function(id){
	  CmsService.delete_post(id).then(function(result){
		  console.log( result);
		  if(result.statusText = "OK"){
			  swal( 'Deleted!',
	                     'Post Deleted sucessfully',
	                     'success'
	                   );
			  $scope.listPost();
		  }
	  });
	  }
	  

 }
}());
