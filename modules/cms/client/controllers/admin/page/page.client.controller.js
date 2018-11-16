(function () {
  'use strict';

  angular
    .module('core')
    .controller('PageController', PageController);



    PageController.$inject = ['$scope','$http','$state','$stateParams', 'Upload','CmsService','$location'];

  function PageController ($scope, $http, $state,$stateParams,Upload,CmsService,$location) {

  $scope.formdata = {};
  $scope.CmsService = CmsService;
  $scope.formdata.page_status = "1";
  $scope.formdata.page_displayinmenu = "2";
  
 
  
  $scope.generateSlgURL = function(){
	   	 var replaceSpacesText = $scope.formdata.page_title;
	   	 $scope.formdata.page_slug = replaceSpacesText.split(" ").join("_").toLowerCase();
	   	 $scope.formdata.page_urlkey = "page/"+$scope.formdata.page_slug+"_"+Number(new Date())+".html"
	    }
  
  
  /*
   * Function : getPageItems
   * description : Get all category items for the list
   */
$scope.getPageItems = function () {
$scope.CmsService.getPageItems().then(function (result) {
  $scope.pageItems = result['data'];
})
}
$scope.getPageItems();


$scope.getPageDetails = function(id){
	CmsService.getPageDetails(id).then(function(result){
		  if(result.statusText = "OK"){
			  $scope.formdata = result.data
			  console.log($scope.formdata);
		  }
	  })
}
if($stateParams.id){
	  $scope.getPageDetails($stateParams.id);
}

$scope.deletePage = function (pageId) {

    swal({
        title: 'Are you sure?',
        text: "You want to delete this Product!",
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
     	 if(result){
     		$scope.CmsService.deletePage(pageId).then(function (result) {
	  console.log( result);
	  $scope.getPageItems();
	  if(result.statusText = "OK"){
		  swal( 'Deleted!',
                   'Post Deleted sucessfully',
                   'success'
                 );
		 // $scope.listPost();
	  }
}) }
     	 });
    
    
  }


$scope.addNewPage = function () {
	$scope.formdata.page_content = CKEDITOR.instances.editor1.getData().replace(/^.*?<body[^>]*>(.*?)<\/body>.*?$/i,"$1");
	if($scope.pageform.$valid){
	if($stateParams.id){
		  
	  CmsService.updatePage($stateParams.id,$scope.formdata).then(function(result){
		 // 
		  if(result.statusText = "OK"){
			  
 				 swal( 'Updated!',
 	                     'Page Updated sucessfully',
 	                     'success'
 	                   )
 				//$state.go('post');
 	                  $location.path('/cms/page');
 				  }else{
 					swal( 'error!',
	      	                   'Error while creating new post ! Please try again later.',
	      	                   'error'
	      	                )
 				  }
		  })
	  }else{
    $scope.CmsService.addPage($scope.formdata).then(function (result) {
    	 if(result.statusText = "OK"){
				 swal( 'Created!',
	                     'New Page created sucessfully',
	                     'success'
	                   )
				//$state.go('post');

	          		 $location.path('/cms/page');
				  }else{
					swal( 'error!',
      	                   'Error while creating new post ! Please try again later.',
      	                   'error'
      	                )
				  }
      
    })
	  }
}
	
  }
 /////////////////////select/////////////////////////////

 ///////////////////////insert////////////////////////////
 $scope.addPage=function(){
   var editorText = '';
 var data={'pagename':$scope.formdata.title,'meta':$scope.formdata.meta,'description':editorText}
 if($scope.validation()==0){
      Upload.upload({
        url: '/api/admin/addpage',
        method: "POST",
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
            
             $state.reload();
                   
            }, 
            function(response) { // optional
                    // failed
            });
        
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
       
///////////////////////////////////////////////////////////////////////
$scope.addCategory=function(){
//console.log($scope.formdata); 

   $http({
        url: '/api/admin/addCategory',
        method: "POST",
        data:$scope.formdata
    })
    .then(function(response) {
      //console.log(response);
            // success
            $state.reload();
    }, 
    function(response) { // optional
            // failed
    });

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

    $scope.editpage[0].setAttribute("href", "/cms/editpage/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('addpage');
}
$scope.editpages=function(){
  
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
if($scope.editpage[0].getAttribute("href")){
document.location=$scope.editpage[0].getAttribute("href");
}
 }
 
}
$scope.chkValue=[];


$scope.delpage=function(){
  $scope.chkValue=[];
 
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');

  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
 
}
//getActionBtns();
setTimeout(getActionBtns, 1500);
 }
}());
