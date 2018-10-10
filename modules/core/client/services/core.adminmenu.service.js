// Products.extraField service used to communicate Products REST endpoints
(function () {
	'use strict';

	angular
		.module('core')
		.service('adminMenuService', adminMenuService);

	adminMenuService.$inject = ['$resource', '$http'];
	function adminMenuService($resource, $http) {


		var menu = {};

		/*
		 * Function : addmenu
		 * Description : add extra field group details
		 * owner : prabin
		 */
		menu.addMenu = function (data) {
			console.log(11);
			return $http({
				url: '/api/admin-menu/create',
				method: "POST",
				data: data
			});
		}

		/*
		 * Function : getmenus
		 * Description : get ALl menu details
		 */
		menu.getMenuList = function () {
			console.log(5678);
			
			return $http({
				url: '/api/admin-menu/getMenuList',
				method: "POST"
			});
		}

		/*
		 * Function : getmenus
		 * Description : Delete extra field group details by id
		 * owner : prabin
		 */
		menu.deletemenu = function (groupId) {
			return $http({
				url: '/api/menu/' + groupId,
				method: "DELETE"
			});
		}

		/*
		 * Function : getmenuById
		 * Description : get one extra field group details by id
		 * owner : prabin
		 */
		menu.getmenuById = function (groupId) {
			return $http({
				url: '/api/menu/' + groupId,
				method: "GET"
			});
		}

		/*
		 * 
		 */
		menu.updatemenu = function (groupId, data) {
			return $http({
				url: '/api/menus/' + groupId,
				method: "PUT",
				data: data
			});
		}
		return menu;


	}


}());
