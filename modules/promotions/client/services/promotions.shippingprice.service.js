(function () {
    'use strict';

    angular
        .module('promotions')
        .factory('shippingpriceService', shippingpriceService);

    shippingpriceService.$inject = ['$http'];

    function shippingpriceService($http) {
        var shippingprice = {};

        shippingprice.addShippingPrice = function (data) {
            return $http({
                url: '/api/promotion/addShippingPrice',
                method: "POST",
                data: data
            });
        }

        shippingprice.getShippingPriceList = function (data) {
            return $http({
                url: '/api/promotion/getShippingPriceList',
                method: "GET"
            });
        }

        shippingprice.deleteShippingPrice = function (itemId) {
            return $http({
                url: '/api/promotion/deleteShippingPrice',
                method: "DELETE",
               // data:{'itemId':itemId},
                params:{'itemId':itemId}
            });
        }

        shippingprice.getShippingPriceDetails = function (ruleId) {
            return $http({
                url: '/api/promotions/getShippingPriceDetails/' + ruleId,
                method: "GET"
            });
        }

        shippingprice.updateShippingPriceRule = function (data) {
            return $http({
                url: '/api/promotions/updateShippingPriceRule',
                method: "PUT",
                data: data
            });
        }

        return shippingprice;
    }
}());