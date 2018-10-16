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
	  * Description : add currency details
	  * owner : jeeja
	  */
	 currency.addcurrency = function(data){
		 
		return $http({
	           url: '/api/currency/create',
	           method: "POST",
	           data:data
	       });
	   }
	 
	 

 /*
	  * Function : getExtraFieldGroups
	  * Description : get All currency details
	  * owner : jeeja
	  */
	 currency.getCurrency = function(){
		  
		return $http({
			   url: '/api/currency/getCurrency',
			   method: "POST"
		   });
	   }
	

	 /*
	  * Function : delCurrency
	  * Description : Delete currency details by id
	  * owner : jeeja
	  */
	 currency.delCurrency = function(currencyId){		  
		 return $http({
		        url: '/api/currency/'+currencyId,
		        method: "DELETE"
		    });
		}
	 

		 /*
	  * Function : delCheckedCurrency
	  * Description : Delete currency details by ids
	  * owner : jeeja
	  */
	 currency.delCheckedCurrency = function(currencyId){
		 console.log(12);		  
		return $http({
			   url: '/api/currency/delCheckedCurrency/'+currencyId,
			   method: "DELETE"
		   });
	   }
	
	 /*
	  * Function : getcurrencyById
	  * Description : get one currency details by id
	  * owner : jeeja
	  */
	 currency.getCurrencyById = function(currencyId){
		return $http({
			   url: '/api/currency/'+currencyId,
			   method: "POST"
		   });
	}
	
	 
	 /*
	  * 
	  */
	 currency.updateCurrency = function(currencyId,data){
		 return $http({
		        url: '/api/currency/'+currencyId,
		        method: "PUT",
		        data:data
		    });
	 }
	 return currency;
	  
	 
  }
  

}());
