(function () {
    'use strict';

    angular
        .module('core')
        .service('productcategoryService', productcategoryService);

    productcategoryService.$inject = ['$resource', '$http','Upload'];
    function productcategoryService($resource, $http,Upload) {


        var productcategory = {};

        /*
         * Function : addCategory
         * Description : add new category
         */

        productcategory.addCategory = function (data) {
            return Upload.upload({
                url: '/api/productcategory/addCategory',
                method: "POST",
                data: data
            });
        }

        /*
         * Function : addSubCategory
         * Description : add sub category
         */

        productcategory.addSubCategory = function (data) {
            console.log(111111);
            return $http({
                url: '/api/productcategory/addSubCategorys',
                method: "POST",
                data: data
            });
        }

        /*
         * Function : getCategoryItems
         * Description : get category Items
         */

        productcategory.getCategoryItems = function () {
            return $http({
                url: '/api/productcategory/getCategoryItems',
                method: "GET"
            });
        }

        productcategory.deleteCategory = function (categoryId) {
            return $http({
                url: '/api/productcategory/deleteCategory/' + categoryId,
                method: "PUT"
            });
        }

        productcategory.getCategoryDetails = function (categoryId) {
            return $http({
                url: '/api/productcategory/getCategoryDetails/' + categoryId,
                method: "GET"
            });
        }


        productcategory.updateCategory = function (data) {
            return $http({
                url: '/api/productcategory/updateCategory',
                method: "POST",
                data: data
            });
        }


        return productcategory;
    }


}());
