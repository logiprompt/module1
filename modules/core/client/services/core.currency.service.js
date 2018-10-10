// Products.extraField service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
  .module('core')
  .service('currencyService', currencyService);

  currencyService.$inject = ['$resource','$http'];
  function currencyService($resource,$http) {
    
	  
	 var currency = {};
	  
	 /*
	  * Function : addcurrency
	  * Description : add extra field group details
	  * owner : prabin
	  */
	 currency.addcurrency = function(data){
		 
		return $http({
	           url: '/api/currency/create',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 /*
	  * Function : getcurrencys
	  * Description : get ALl currency details
	  * owner : prabin
	  */
	 currency.getcurrency = function(){
		  console.log(12);
		 return $http({
		        url: '/api/currency',
		        method: "GET"
		    });
		}
	 
	 /*
	  * Function : getcurrencys
	  * Description : Delete extra field group details by id
	  * owner : prabin
	  */
	 currency.deletecurrency = function(groupId){		  
		 return $http({
		        url: '/api/currency/'+groupId,
		        method: "DELETE"
		    });
		}
	 
	 /*
	  * Function : getcurrencyById
	  * Description : get one extra field group details by id
	  * owner : prabin
	  */
	 currency.getcurrencyById = function(groupId){
		 return $http({
		        url: '/api/currency/'+groupId,
		        method: "GET"
		    });
	 }
	 
	 /*
	  * 
	  */
	 currency.updatecurrency = function(groupId,data){
		 return $http({
		        url: '/api/currencys/'+groupId,
		        method: "PUT",
		        data:data
		    });
	 }
	 return currency;
	  
	 
  }
  

}());
