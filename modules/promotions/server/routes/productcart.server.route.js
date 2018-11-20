'use strict';

/**
 * Module dependencies
 */
var promotionsPolicy = require('../policies/promotions.server.policy'),
    productCart = require('../controllers/productcart.server.controller');

module.exports = function (app) {
    //add product price rule
    app.route('/api/promotions/addProductPrice').post(productCart.addProductPrice);

    //update product price rule
    app.route('/api/promotions/updateProductPrice').put(productCart.updateProductPrice);

    //delete product price rule
    app.route('/api/promotions/deleteProductPrice/:itemId').delete(productCart.deleteProductPrice);

    //get product price rule list
    app.route('/api/promotions/getProductPriceList').get(productCart.getProductPriceList);

    //get product price rule
    app.route('/api/promotions/getProductPriceDetails/:ruleId').get(productCart.getProductPriceDetails);
    
}