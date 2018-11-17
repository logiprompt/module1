// Products.extraField service used to communicate Products REST endpoints
(function () {
	'use strict';

	angular
		.module('products')
		.service('businesstypeaddService', businesstypeaddService);

	businesstypeaddService.$inject = ['$resource', '$http', 'Upload'];
	function businesstypeaddService($resource, $http, Upload) {


		var businesstypeaddService = {};

		/*
		 * Function : addOrderHold
		 * Description : add UserForget details
   	
		 */
		businesstypeaddService.addBusiness = function (data) {


			return Upload.upload({
				url: '/api/businessType',
				data: data
			})
				
			// return $http({
			//        url: '/api/businessType',
			//        method: "POST",
			//        data:data
			//    });
		}

		/*
			 * Function : getUsers
			 * Description : get all UserForget details
		    
			 */
		businesstypeaddService.getOrderHold = function () {

			return $http({
				url: '/api/orderCompletion',
				method: "GET"
			});
		}


		/*
		 * Function : deleteUser
		 * Description : Delete UserForget details by id
		 
		 */
		businesstypeaddService.delOrderCompletion = function (userId) {
			return $http({
				url: '/api/ordercompletionbyid',
				method: "DELETE",
				params: { 'userId': userId }
			});
		}

		/*
 * Function : delCheckedUserForget
 * Description : Delete details by ids
	
 */
		businesstypeaddService.delCheckedOrderCompletion = function (userId) {
			//console.log(userId);		  
			return $http({
				url: '/api/ordercompletion/delCheckedOrderCompletion',
				method: "DELETE",
				params: { 'userId': userId }
			});
		}


		/*
		 * Function : getUserForgetById
		 * Description : get one UserForget details by id
   	
		 */


		//  userforgot.getUserForgotById = function(userId){
		// 	 return $http({
		// 	        url: '/api/userforgotid',
		// 			method: "GET",
		// 			params:{userId:userId}
		// 	    });
		//  }


		businesstypeaddService.getOrderCompletionById = function (userId) {
			console.log(userId);
			return $http({
				url: '/api/ordercompletionbyid',
				method: "GET",
				params: { 'userId': userId }
			});
		}

		/*
		 * 
		 */
		businesstypeaddService.updateOrderCompletion = function (userId, data) {
			//console.log(userId);
			return $http({
				url: '/api/ordercompletionbyid',
				method: "PUT",
				data: data
			});
		}
		return businesstypeaddService;


	}


}());
