// Products service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
    .module('products')
    .factory('ProductsService', ProductsService);

  ProductsService.$inject = ['$resource','$http'];

  function ProductsService($resource,$http) {
    
	  
	  
	  var products = {};
	  
		 /*
		  * Function : addProduct
		  * Description : add new products
		  * owner : prabin
		  */
	  products.addProduct = function(data){
			  
			return $http({
		           url: '/api/products',
		           method: "POST",
		           data:data
		       });
		   }
	  
	  /*
	   * Delete Product by ID
	   */
	  
	  products.deleteProduct = function(id){
		  return $http({
	           url: '/api/products/'+id,
	           method: "DELETE"
	       });
	  }
	  
	  /*
		  * Function : listproducts
		  * Description : add new products
		  * owner : prabin
		  */
	  
	  products.listProduct = function(){
		  return $http({
	           url: '/api/products',
	           method: "GET"
	       });
	  }
	  
	  return products;
	  
  }
}());
