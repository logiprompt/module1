'use strict';

/**
 * Module dependencies
 */
var promotionsPolicy = require('../policies/promotions.server.policy'),
    productCart = require('../controllers/productcart.server.controller');

module.exports = function (app) {

    //get countries
    app.route('/api/promotions/getCartCountryList').get(productCart.getCartCountryList);

    //add product price rule
    app.route('/api/promotions/addProductCart').post(productCart.addProductCart);

    //update product price rule
    app.route('/api/promotions/updateProductCartRule').put(productCart.updateProductCartRule);

    //delete product price rule
    app.route('/api/promotions/deleteProductCart').delete(productCart.deleteProductCart);
    //delete checked
    app.route('/api/promotions/delChecked')
    .delete(productCart.delChecked);

    //get product price rule list
    app.route('/api/promotions/getProductCartList').get(productCart.getProductCartList);

    //get product price rule
    app.route('/api/promotions/getProductCartDetails').get(productCart.getProductCartDetails);
    
}