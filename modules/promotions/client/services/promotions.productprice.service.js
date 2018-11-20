(function () {
    'use strict';

    angular
        .module('promotions')
        .factory('productpriceService', productpriceService);

    productpriceService.$inject = ['$http'];

    function productpriceService($http) {
        var productprice = {};

        productprice.addProductPrice = function (data) {
            return $http({
                url: '/api/promotions/addProductPrices',
                method: "POST",
                data: data
            });
        }

        productprice.getProductPriceList = function (data) {
            return $http({
                url: '/api/promotions/getProductPriceList',
                method: "GET"
            });
        }

        productprice.getProductPriceDetails = function (ruleId) {
            return $http({
                url: '/api/promotions/getProductPriceDetails/' + ruleId,
                method: "GET"
            });
        }

        productprice.deleteProductPrice = function (itemId) {
            return $http({
                url: '/api/promotions/deleteProductPrice/' + itemId,
                method: "DELETE"
            });
        }

        productprice.updateProductPrice = function (data) {
            return $http({
                url: '/api/promotions/updateProductPrice',
                method: "PUT",
                data: data
            });
        }

        return productprice;
    }
}());