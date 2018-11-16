// Products.extraField service used to communicate Products REST endpoints
(function () {
	'use strict';
	angular
		.module('emails')
		.service('mailConfirmationService', mailConfirmationService);
	mailConfirmationService.$inject = ['$resource', '$http'];
	function mailConfirmationService($resource, $http) {
		var mailConfirmation = {};

		/*
		 * Function : addmailConfirmation
		 * Description : add mailConfirmation details
		 * owner : ck
		 */

		mailConfirmation.addMailConfirmation = function (data) {
			//console.log(data);	 
			return $http({
				url: '/api/mailconfirmation',
				method: "POST",
				data: data
			});
		}

		/*
	   * Function : getmailConfirmation
	   * Description : get all mailConfirmation details
	   * owner : ck
	   */


		mailConfirmation.getMailConfirmation = function () {
			return $http({
				url: '/api/mailconfirmation',
				method: "GET"
			});
		}
		/*
		 * Function : deletemailConfirmation
		 * Description : Delete mailConfirmation details by id
		 * owner : ck
		 */
		mailConfirmation.delmailconfirm = function (userId) {
			return $http({
				url: '/api/mailconfirmationbyid',
				method: "DELETE",
				params: { 'userId': userId }
			});
		}

		/*
		 * Function : delCheckedmailConfirmation
		 * Description : Delete details by ids
		 * owner : ck
		 */

		mailConfirmation.delCheckedMailConfirmation = function (userId) {
			//console.log(userId);		  
			return $http({
				url: '/api/mailconfirmation/delCheckedMailConfirmation',
				method: "DELETE",
				params: { 'userId': userId }
			});
		}

		mailConfirmation.getMailConfirmationById = function (userId) {
			// console.log(userId);
			return $http({
				url: '/api/mailconfirmationbyid',
				method: "GET",
				params: { 'userId': userId }
			});
		}

		/*
		 * 
		 */

		mailConfirmation.updateMailConfirmation = function (userId, data) {
			//console.log(data);
			return $http({
				url: '/api/mailconfirmationbyid',
				method: "PUT",
				data: data
			});
		}

		return mailConfirmation;

	}
}());
