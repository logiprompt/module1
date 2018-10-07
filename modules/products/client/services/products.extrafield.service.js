// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
    .module('products')
    .factory('extrafieldService', extrafieldService);

  extrafieldService.$inject = ['$resource'];

  function extrafieldService($resource) {
    
	  
	 var extraFieldGroup = { };
	  
	 
	 extraFieldGroup.addExtraFieldGroup = function(data){
		  
		  return data;
	  }
	 
	 return extraFieldGroup;
	  
	 
  }
}());
