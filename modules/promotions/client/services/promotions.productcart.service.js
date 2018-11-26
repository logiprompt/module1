(function () {
    'use strict';

    angular
        .module('promotions')
        .factory('productcartService', productcartService);

    productcartService.$inject = ['$resource', '$http', 'Upload'];

    function productcartService($resource, $http, Upload) {
        var productcart = {};

        productcart.getCartCountryList = function (data) {
            return $http({
                url: '/api/promotions/getCartCountryList',
                method: "GET"
            });
        }


        productcart.addProductCart = function (data) {
            return Upload.upload({
                url: '/api/promotions/addProductCart',
                method: "POST",
				data: data
			});
            // return $http({
            //     url: '/api/promotions/addProductCart',
            //     method: "POST",
            //     data: data
            // });
        }

        productcart.getProductCartList = function (data) {
            return $http({
                url: '/api/promotions/getProductCartList',
                method: "GET"
            });
        }

        productcart.getProductCartDetails = function (itemId) {
            return $http({
                url: '/api/promotions/getProductCartDetails',
                method: "GET",
                params:{'itemId':itemId}
            });
        }

        productcart.deleteProductCart = function (itemId) {
            return $http({
                url: '/api/promotions/deleteProductCart',
                method: "DELETE",
                params:{'itemId':itemId}
            });
        }

        productcart.delChecked = function (itemId) {
            return $http({
                url: '/api/promotions/delChecked',
                method: "DELETE",
               // data:{'itemId':itemId},
                params:{'itemId':itemId}
            });
        }
        productcart.updateProductCartRule = function (data) {
            return $http({
                url: '/api/promotions/updateProductCartRule',
                method: "PUT",
                data: data
            });
        }

        return productcart;
    }
}());