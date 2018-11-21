(function () {
    'use strict';

    angular
        .module('promotions')
        .factory('productcouponsService', productcouponsService);

    productcouponsService.$inject = ['$http'];

    function productcouponsService($http) {
        var productcoupons = {};

        productcoupons.addProductPrice = function (data) {
            return $http({
                url: '/api/promotions/addProductPrice',
                method: "POST",
                data: data
            });
        }

        productcoupons.getProductPriceList = function (data) {
            return $http({
                url: '/api/promotions/getProductPriceList',
                method: "GET"
            });
        }

        productcoupons.getProductPriceDetails = function (ruleId) {
            return $http({
                url: '/api/promotions/getProductPriceDetails/' + ruleId,
                method: "GET"
            });
        }

        productcoupons.deleteProductPrice = function (itemId) {
            return $http({
                url: '/api/promotions/deleteProductPrice/' + itemId,
                method: "DELETE"
            });
        }

        productcoupons.updateProductPrice = function (data) {
            return $http({
                url: '/api/promotions/updateProductPrice',
                method: "PUT",
                data: data
            });
        }

        return productcoupons;
    }
}());