(function () {
  'use strict';
  angular
    .module('products')
    .controller('ProProductController', ProProductController);
    ProProductController.$inject = ['$scope','$http','$state','$stateParams','productcategoryService','extrafieldService','ProductsService'];
  function ProProductController ($scope, $http, $state,$stateParams,productcategoryService,extrafieldService,ProductsService) {
  
   $scope.formdata = {};
   $scope.extrafieldService = extrafieldService;

	/*
	 * Pre define product static values
	 */
   if(!$stateParams.id){
	$scope.product_type = "1";
	$scope.product_featured = "0";
	$scope.product_status = "1";
	$scope.product_displayinmenu = "0"
	$scope.product_qtyoutofstockstatus_def = true;
	$scope.product_minqtyallowed_def = true;
	$scope.product_maxqtyallowed_def = true;
	$scope.product_notifylowqty_def = true;
	$scope.product_stockavailable = "1";
	$scope.product_taxablestatus = "0";
	$scope.product_taxgroup = "1";
	$scope.product_freeshipping = "0"
	$scope.product_images = [];
	$scope.edit_product = false;
   }else{
	   $scope.edit_product = true;
	   $scope.product_images = []; 
   }
   $scope.newimage = ''
	var productformData = {};
	
	
	$scope.ProductsService = ProductsService;

	/*
	 * Get Category List
	 */
	
	 $scope.productcategoryService = productcategoryService;
      $scope.productcategoryService.getCategoryItems().then(function (result) {
        $scope.categoryLists = result.data;
        console.log($scope.categoryLists);
      });
    /*
     * Get Extra field Group and fields
     */
      var extrafield = new Array();
      if(!$stateParams.id){
      $scope.extrafieldService.getExtraFieldGroup().then(function(result){
		   if(result.statusText = "OK"){
			   $scope.extrafieldGroups = result.data;			   
			   
			   angular.forEach($scope.extrafieldGroups, function(value, item){
				   $scope.extrafieldService.getExtraField(value._id).then(function(fieldsresult){
					   if(fieldsresult.statusText = "OK"){
						   var data = {
								   'group':value,
								   'field':fieldsresult.data
						   }
						   extrafield.push(data);
						   
						  }
				   })
				   $scope.extraFieldGroup = extrafield;
				   console.log($scope.extraFieldGroup);
				   
			   })
			   
		   }
			  });
      }
      
      
   /*
    * LIst 
    * Products
    */
      $scope.getAllProducts = function(){
      $scope.ProductsService.listProduct().then(function(result){
		   if(result.statusText = "OK"){
			   
				$scope.productsList =  result.data;
				console.log($scope.productsList);
		   }
	});
      }
      if(!$stateParams.id){
      $scope.getAllProducts();
      }
	
      /*
       * LIst Products by id
       */
         $scope.getProductsById = function(id){
         $scope.ProductsService.listProductById(id).then(function(result){
   		   if(result.statusText = "OK"){
  					console.log(result.data);
   				$scope.product_name = result.data.product_name;
   				$scope.product_sku = result.data.product_sku;
   				$scope.product_type = result.data.product_type;
   				$scope.product_shortdec = result.data.product_shortdec;
   				$scope.product_desc = result.data.product_desc;
   				$scope.product_weight = result.data.product_weight;
   			    $scope.product_fromdate = result.data.product_fromdate;
   				$scope.product_enddate = result.data.product_enddate;
   				$scope.product_featured = result.data.product_featured;
   				$scope.product_status = result.data.product_status;
   				$scope.product_category = result.data.product_category;
   				$scope.product_metadesc = result.data.product_metadesc;
   				$scope.product_metakey = result.data.product_metakey;
   				$scope.product_slug = result.data.product_slug;
   				$scope.product_urlkey = result.data.product_urlkey;
   				$scope.product_displayinmenu = result.data.product_displayinmenu;
   				$scope.product_price = result.data.product_price;
   				$scope.product_specialprice = result.data.product_specialprice;
   				$scope.product_splpricestartdate = result.data.product_splpricestartdate;
   				$scope.product_splpriceenddate = result.data.product_splpriceenddate;
   				$scope.product_groupqty = result.data.product_groupqty;
   				$scope.product_groupprice = result.data.product_groupprice;
   				$scope.product_qty = result.data.product_qty;
   				$scope.product_qtyoutofstockstatus = result.data.product_qtyoutofstockstatus;
   				$scope.product_qtyoutofstockstatus_def = result.data.product_qtyoutofstockstatus_def;
   				$scope.product_minqtyallowed = result.data.product_minqtyallowed;
   				$scope.product_minqtyallowed_def = result.data.product_minqtyallowed_def;
   				$scope.product_maxqtyallowed = result.data.product_maxqtyallowed;
   				$scope.product_maxqtyallowed_def = result.data.product_maxqtyallowed_def;
   				$scope.product_notifylowqty = result.data.product_notifylowqty;
   				$scope.product_notifylowqty_def = result.data.product_notifylowqty_def;
   				$scope.product_stockavailable = result.data.product_stockavailable;
   				$scope.extraFieldGroup = result.data.product_extrafield;
   				$scope.product_imageList = result.data.product_images ? result.data.product_images : [];
   				$scope.product_tags = result.data.product_tags;
   				$scope.product_taxablestatus = result.data.product_taxablestatus;
   				$scope.product_taxgroup = result.data.product_taxgroup;
   				$scope.product_cst = result.data.product_cst;
   				$scope.product_cst_def = result.data.product_cst_def;
   				$scope.product_abc = result.data.product_abc;
   				$scope.product_abc_def = result.data.product_abc_def;
   				$scope.product_freeshipping = result.data.product_freeshipping;
   				$scope.olang = result.data.olang;
   				
   		   }
         	});
         }
         if($stateParams.id){
             $scope.getProductsById($stateParams.id);
             }
      
         
         $scope.generateSlgURL = function(){
        	 var replaceSpacesText = $scope.product_name;
        	 $scope.product_slug = replaceSpacesText.split(" ").join("_").toLowerCase();
        	 $scope.product_urlkey = "product/"+$scope.product_slug+"_"+Number(new Date())+".html"
         }
      /*
       * Delete product by ID
       */
      $scope.deleteProduct = function(id){
    	  
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
           		$scope.ProductsService.deleteProduct(id).then(function(result){
     			   if(result.statusText = "OK"){
     				 swal(
     	                     'Deleted!',
     	                     'Product has been deleted.',
     	                     'success'
     	                   )
     				   $scope.getAllProducts();
     				  }else{
     					  
     				  }
     		   })
            }
            })
      }
      
	/*
	 * Add product
	 */
      $scope.product_imageList = [];
      var formfileData = new FormData();
      $scope.uploadFiles = function(file, errFiles) { 
    	  console.log(file);
    	  console.log($scope.product_images);
    	  formfileData.append('file',file);
    	  $scope.image = file;
    	 // formfileData.append(file)
    	  console.log($scope.product_images);
      }
      $scope.save = function(){
    	  $scope.product_images.push($scope.newimage);
    	/* $scope.img = {'product_title':'',
    			 'product_alt':'',
    			 'ngfBlobUrl':'',
    			 'ngfHeight':'',
    			 'ngfWidth':''    			 
    			 };
    	 $scope.img.product_title = $scope.product_imagetitle;
    	 $scope.img.product_alt = $scope.product_imagealt;
    	 $scope.img.ngfBlobUrl = $scope.image.$ngfBlobUrl;
    	 $scope.img.ngfHeight =$scope.image.$ngfHeight;
    	 $scope.img.ngfWidth = $scope.image.$ngfHeight;
    	 
    	  $scope.product_imageList.push($scope.img);
    	  $scope.product_imagetitle = "";
    	  $scope.product_imagealt = "";
    	  $scope.image = "";*/
    	 
      }
	$scope.saveProduct = function(){
		if($scope.productForm.$valid){
		productformData.product_name = $scope.product_name;
		productformData.product_sku = $scope.product_sku;
		productformData.product_type = $scope.product_type;
		productformData.product_shortdec = $scope.product_shortdec;
		productformData.product_desc = $scope.product_desc;
		productformData.product_weight = $scope.product_weight;
		productformData.product_fromdate = $scope.product_fromdate;
		productformData.product_enddate = $scope.product_enddate;
		productformData.product_featured = $scope.product_featured;
		productformData.product_status = $scope.product_status;
		productformData.product_category = $scope.product_category;
		productformData.product_metadesc = $scope.product_metadesc;
		productformData.product_metakey = $scope.product_metakey;
		productformData.product_slug = $scope.product_slug;
		productformData.product_urlkey = $scope.product_urlkey;
		productformData.product_displayinmenu = $scope.product_displayinmenu;
		productformData.product_price = $scope.product_price;
		productformData.product_specialprice =	$scope.product_specialprice;
		productformData.product_splpricestartdate = $scope.product_splpricestartdate;
		productformData.product_splpriceenddate = $scope.product_splpriceenddate;
		productformData.product_groupqty = $scope.product_groupqty;
		productformData.product_groupprice = $scope.product_groupprice;
		productformData.product_qty = $scope.product_qty;
		productformData.product_qtyoutofstockstatus = $scope.product_qtyoutofstockstatus;
		productformData.product_qtyoutofstockstatus_def=$scope.product_qtyoutofstockstatus_def;
		productformData.product_minqtyallowed = $scope.product_minqtyallowed;
		productformData.product_minqtyallowed_def = $scope.product_minqtyallowed_def;
		productformData.product_maxqtyallowed = $scope.product_maxqtyallowed;
		productformData.product_maxqtyallowed_def = $scope.product_maxqtyallowed_def;
		productformData.product_notifylowqty = $scope.product_notifylowqty;
		productformData.product_notifylowqty_def = $scope.product_notifylowqty_def;
		productformData.product_stockavailable = $scope.product_stockavailable;
		productformData.product_extrafield = $scope.extraFieldGroup;
		productformData.product_images = formfileData;//$scope.product_imageList;
		productformData.product_tags = $scope.product_tags;
		productformData.product_taxablestatus = $scope.product_taxablestatus;
		productformData.product_taxgroup = $scope.product_taxgroup;
		productformData.product_cst = $scope.product_cst;
		productformData.product_cst_def = $scope.product_cst_def;
		productformData.product_abc = $scope.product_abc;
		productformData.product_abc_def = $scope.product_abc_def;
		productformData.product_freeshipping = $scope.product_freeshipping;
		productformData.olang = {};
		
		if($stateParams.id){			
			$scope.ProductsService.updateProductById($stateParams.id,productformData).then(function(result){
				   if(result.statusText = "OK"){
					   
	    				 swal( 'Updated!',
	    	                     'Updated product.',
	    	                     'success'
	    	                   );
	    	                   
	    	            $state.go('proproduct');
				   }
			});
		}else{
		$scope.ProductsService.addProduct(productformData).then(function(result){
			   if(result.statusText = "OK"){
				   
    				 swal( 'Added!',
    	                     'New product added.',
    	                     'success'
    	                   );
    	                   
    	            $state.go('proproduct');
			   }
		});
		}
	console.log(productformData);
		}
	}

	
	
	
	
   $scope.showreview=function(){
    
document.getElementById("treview").style.display = "none";

document.getElementById("detailreview").style.display = "block";

}
 $scope.viewrev=function(){
    
document.getElementById("detailreview").style.display = "none";

document.getElementById("treview").style.display = "block";

}



  
/////////////////////defaultLang//////////
 
 
 /////////////////////select/////////////////////////////

        $scope.rmerrorclass=function(){
                angular.element(document.querySelectorAll('.validationErr')).removeClass('validationErr');
                angular.element(document.querySelectorAll('.tabvalidationErr')).removeClass('tabvalidationErr');
                }
                $scope.adderrorclass=function(cls){
                angular.element(document.querySelector(cls)).addClass('validationErr');
                }
                $scope.taberrorclass=function(cls){
                  angular.element(document.querySelector(cls)).addClass('tabvalidationErr');
                  }

                $scope.validation=function(){
                var error=0;
                $scope.rmerrorclass();
                  if($scope.formdata.category=='' || angular.isUndefined($scope.formdata.category) ){
                    $scope.adderrorclass(".cat");
                    $scope.taberrorclass(".tcat");
                    error=1;
                    }

                    return error;          
            }

///////////////////////////////////////////////////////////////////////
$scope.addCategory=function(){


   $http({
        url: '/api/admin/addCategory',
        method: "POST",
        data:$scope.formdata
    })
    .then(function(response) {
    
            // success
    }, 
    function(response) { // optional
            // failed
     });
   }
    $scope.validation2=function(){
                var error=0;
                $scope.rmerrorclass();
                  if($scope.formdata.categorylang=='' || angular.isUndefined($scope.formdata.categorylang) ){
                    $scope.adderrorclass(".categorylang");
                    error=1;
                    }
                     if($scope.formdata.catlang=='0' || angular.isUndefined($scope.formdata.catlang) ){
                    $scope.adderrorclass(".catlang");
                    error=1;
                    }
                    return error;          
            }
  $scope.openLangModel=function(id){
    
    $scope.formdata.id=id;
  }
 $scope.insCategoryLang=function(){
        if($scope.validation2()==0){
          $('#myModal').modal('hide');
        $http({
          url: '/api/admin/insCategoryLang',
          method: "POST",
          data:$scope.formdata
      })
      .then(function(response) {
        $state.reload();
              // success
      }, 
      function(response) { // optional
              // failed
      });
  }
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
console.log(linkid)
console.log(checkedValue[0])
  if(checkedValue.length>1){
  $scope.editpage[0].removeAttribute("href");
  }
  else{

    $scope.editpage[0].setAttribute("href", "/product/proeditproduct/"+linkid);
  }

}
$scope.chk={};

$scope.newpage=function(){
  $state.go('proaddproduct');
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
 
  //$state.go('addlanguage');
  var checkedValue = document.querySelectorAll('.rowtxtchk:checked');
console.log(checkedValue)
  for(var i=0;i<checkedValue.length;i++){
    $scope.chkValue.push(checkedValue[i].value);
  }
 
}
setTimeout(getActionBtns, 2000);
 }
}());
