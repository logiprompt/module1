(function () {
    'use strict';

    angular
        .module('promotions')
        .factory('productcartService', productcartService);

    productcartService.$inject = ['$http'];

    function productcartService($http) {
        var productcart = {};

        productcart.addProductPrice = function (data) {
            return $http({
                url: '/api/promotions/addProductPrice',
                method: "POST",
                data: data
            });
        }

        productcart.getProductPriceList = function (data) {
            return $http({
                url: '/api/promotions/getProductPriceList',
                method: "GET"
            });
        }

        productcart.getProductPriceDetails = function (ruleId) {
            return $http({
                url: '/api/promotions/getProductPriceDetails/' + ruleId,
                method: "GET"
            });
        }

        productcart.deleteProductPrice = function (itemId) {
            return $http({
                url: '/api/promotions/deleteProductPrice/' + itemId,
                method: "DELETE"
            });
        }

        productcart.updateProductPrice = function (data) {
            return $http({
                url: '/api/promotions/updateProductPrice',
                method: "PUT",
                data: data
            });
        }

        return productcart;
    }
}());