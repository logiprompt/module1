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
	  $scope.postformdata.post_status = "1";
	  $scope.postformdata.post_displayinmenu = "2";
	  
	  if($stateParams.id){
		  CmsService.getPostById($stateParams.id).then(function(result){
			  if(result.statusText = "OK"){
				  $scope.postformdata = result.data
				  console.log($scope.postformdata);
			  }
		  })
	  }
	  
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
	  
	  CmsService.getCategoryItems().then(function (result) {
	        $scope.categoryItems = result['data'];
	       console.log( $scope.categoryItems);
	      })
	  
	  $scope.addpost = function(){
		  if($stateParams.id){
			  $scope.postformdata.post_content = CKEDITOR.instances.editor1.getData().replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i,"$1");;
		  CmsService.updatePostById($stateParams.id,$scope.postformdata).then(function(result){
			  if(result.statusText = "OK"){
				   
	   				 swal( 'Updated!',
	   	                     'Post Updated sucessfully',
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
		  }else{
			  $scope.postformdata.post_content = CKEDITOR.instances.editor1.getData().replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i,"$1");;
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
	  }

	  
	  $scope.generateSlgURL = function(){
     	 var replaceSpacesText = $scope.postformdata.post_title;
     	$scope.postformdata.post_slug = replaceSpacesText.split(" ").join("_").toLowerCase();
     	 $scope.postformdata.post_urlkey = "post/"+$scope.postformdata.post_slug+"_"+Number(new Date())+".html"
      }

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
	 $state.go('addcmspost');
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
	 //$state.go('addlanguage');
	 var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
   console.log(checkedValue)
	 for(var i=0;i<checkedValue.length;i++){
	   $scope.chkValue.push(checkedValue[i].value);
	 }
	
   }
   setTimeout(getActionBtns, 1500);
   
	
	  
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
