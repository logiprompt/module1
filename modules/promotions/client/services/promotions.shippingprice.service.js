(function () {
    'use strict';

    angular
        .module('promotions')
        .factory('shippingpriceService', shippingpriceService);

    shippingpriceService.$inject = ['$resource', '$http', 'Upload'];

    function shippingpriceService($resource, $http, Upload) {
        var shippingprice = {};

        shippingprice.addShippingPrice = function (data) {
            // return $http({
            //     url: '/api/promotion/addShippingPrice',
            //     method: "POST",
            //     data: data
            // });

            return Upload.upload({
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
        shippingprice.delChecked = function (itemId) {
            return $http({
                url: '/api/promotion/delChecked',
                method: "DELETE",
               // data:{'itemId':itemId},
                params:{'itemId':itemId}
            });
        }

        shippingprice.getShippingPriceDetails = function (itemId) {
          
          //  console.log(itemId);
            return $http({
                url: '/api/promotion/getShippingPriceDetails',
                method: "GET",
                params:{'itemId':itemId}
            });
        }

        shippingprice.updateShippingPriceRule = function (data) {
            console.log(data);
            return $http({
                url: '/api/promotion/updateShippingPriceRule',
                method: "PUT",
                data: data
            });
        }

        return shippingprice;
    }
}());