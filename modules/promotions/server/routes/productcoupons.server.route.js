'use strict';

/**
 * Module dependencies
 */
var promotionsPolicy = require('../policies/promotions.server.policy'),
    productCoupons = require('../controllers/productcoupons.server.controller');

module.exports = function (app) {
    //add product price rule
    app.route('/api/promotions/addProductPrice').post(productCoupons.addProductPrice);

    //update product price rule
    app.route('/api/promotions/updateProductPrice').put(productCoupons.updateProductPrice);

    //delete product price rule
    app.route('/api/promotions/deleteProductPrice/:itemId').delete(productCoupons.deleteProductPrice);

    //get product price rule list
    app.route('/api/promotions/getProductPriceList').get(productCoupons.getProductPriceList);

    //get product price rule
    app.route('/api/promotions/getProductPriceDetails/:ruleId').get(productCoupons.getProductPriceDetails);
    
}