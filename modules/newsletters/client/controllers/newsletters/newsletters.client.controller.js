(function () {
  'use strict';

  angular
    .module('newsletters')
    .controller('NewslettersController', NewslettersController);



    NewslettersController.$inject = ['$scope','$http','$state','$stateParams','$location','Upload','NewslettersService','NewsletterTemplateService'];

  function NewslettersController ($scope, $http, $state,$stateParams,$location,Upload,NewslettersService,NewsletterTemplateService) {
  
    
  

 
///////////////////////////////////////////////////////

$scope.formdata = {};
$scope.formdata.status = '0';
$scope.NewslettersService = NewslettersService;
$scope.NewsletterTemplateService = NewsletterTemplateService;
   

$scope.currentLan=localStorage.getItem('currentLang').toString();
    /*newsletter template starts*/
   
    $scope.defaultLang = localStorage.getItem('defaultLang').toString();
$scope.getNewslettertemp = function () {
  $scope.NewsletterTemplateService.getAllNewsLetterTemplates().then(function (result) {
    if (result.statusText = "OK") {
      $scope.templist = result.data;
    } else {

    }
  });
}
$scope.getNewslettertemp();

   $scope.temp='0';   
   $scope.getnews = function () {
    $scope.NewslettersService.getnews().then(function (result) {
      if (result.statusText = "OK") {
        $scope.list = result.data;
      } else {

      }
    });
  }
  $scope.getnews();
   ////////////////////////////////////////////////////

  $scope.addNewsLetter = function () {
  alert(687686);
    var desc = CKEDITOR.instances['contentdesc'].document.getBody().getHtml();
    console.log(desc);
      console.log($scope.formdata.contentdesc.$valid);
      console.log($scope.formdata);
    if ($scope.formdata.$valid && $scope.status!="0") {

      alert(5678965766);

      var data = {
                    "temp": $scope.temp,
                    "title": $scope.title,
                    "subject": $scope.subject,
                    "sender": $scope.sender,
                    "senderemail": $scope.senderemail,
                    "contentdesc":desc,
                    "imgfile": $scope.imgss,
                    "imgfile1": $scope.imgss2,
                    "status": $scope.status,
                    "oLang": {}
                  }

console.log(data);
      $scope.NewslettersService.addNewsLetter(data).then(function (result) {

        if (result.statusText = "OK") {
          swal("Success!", "Successfully added !", "success");
         // $state.go('emailforgetpass');
        } else {
          swal("error!", " already exist!", "error");
        }

      })
    }

  }
   ///////////////////////////////////////////////////
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

//  function readFile(ev) {

//   if (this.files && this.files[0]) {
//   var FR= new FileReader();
//   FR.onload = function(e) {
//     document.getElementById("imgfiles").src= e.target.result;
//    ev.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1]=e.target.result;
//     //document.getElementById("b64").innerHTML = e.target.result;
//   };       
//   FR.readAsDataURL( this.files[0] );
//   }
//  }
//  if(document.getElementById("imgfile")!=null){
//    document.getElementById("imgfile").addEventListener("change", readFile, false); 
//  }

// $scope.iconw=function(){

//         document.getElementById('imgfile').click();
        
//              }

            // $(document).find('#myTable').DataTable();




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
console.log(linkid)
console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/newsletters/newslettersedit/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('newslettersadd');
}
$scope.editpages=function(){
    var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
  if(checkedValue.length>0){
  console.log($scope.editpage[0].getAttribute("href"));
if($scope.editpage[0].getAttribute("href")){
document.location=$scope.editpage[0].getAttribute("href");
}
 }
 
}
$scope.chkValue=[];


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


 }






}());
