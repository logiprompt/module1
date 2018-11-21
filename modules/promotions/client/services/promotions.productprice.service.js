(function () {
    'use strict';

    angular
        .module('promotions')
        .factory('productpriceService', productpriceService);

    productpriceService.$inject = ['$resource', '$http', 'Upload'];

    function productpriceService($resource,$http,Upload) 
    {
        var productprice = {};
        productprice.addProductPrice = function (data) 
        {
        	return Upload.upload({
                url: '/api/promotions/addProductPrices',
                method: "POST",
				data: data
			});
        }

        productprice.getProductPriceList = function (data) 
        {
            return $http({
                url: '/api/promotions/getProductPriceList',
                method: "GET"
            });
        }

        productprice.getProductPriceDetails = function (ruleId) 
        {
            return $http({
                url: '/api/promotions/getProductPriceDetails/' + ruleId,
                method: "GET"
            });
        }

        productprice.deleteProductPrice = function (itemId) 
        {
            return $http({
                url: '/api/promotions/deleteProductPrice/' + itemId,
                method: "DELETE"
            });
        }

        productprice.delChecked = function (itemId) {
            return $http({
                url: '/api/promotions/delCheckedProductPrice',
                method: "DELETE",
               // data:{'itemId':itemId},
                params:{'itemId':itemId}
            });
        }

        productprice.updateProductPrice = function (data) 
        { 
            console.log(98);
            return Upload.upload({
                url: '/api/promotions/updatePromotionsProductPrice',
                method: "PUT",
				data: data
			});

            // return $http({
            //     url: '/api/promotions/updateProductPrice',
            //     method: "PUT",
            //     data: data
            // });
            
        }

        return productprice;
    }
}());