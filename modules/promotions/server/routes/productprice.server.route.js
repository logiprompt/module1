'use strict';

/**
 * Module dependencies
 */
var promotionsPolicy = require('../policies/promotions.server.policy'),
    productPrice = require('../controllers/productprice.server.controller');

module.exports = function (app) {
    //add product price rule
    app.route('/api/promotions/addProductPrices').post(productPrice.addProductPrice);

    //update product price rule
    app.route('/api/promotions/updatePromotionsProductPrice').put(productPrice.updateProductPrice);

    //delete product price rule
    app.route('/api/promotions/deleteProductPrice/:itemId').delete(productPrice.deleteProductPrice);

    //delete checked product price rule
    app.route('/api/promotions/delCheckedProductPrice').delete(productPrice.delChecked);

    //get product price rule list
    app.route('/api/promotions/getProductPriceList').get(productPrice.getProductPriceList);

    //get product price rule
    app.route('/api/promotions/getProductPriceDetails/:ruleId').get(productPrice.getProductPriceDetails);
    
}