'use strict';

/**
 * Module dependencies
 */
var promotionsPolicy = require('../policies/promotions.server.policy'),
    shippingPrice = require('../controllers/shippingprice.server.controller');

module.exports = function (app) {
    // //add shipping price rule
    // app.route('/api/promotions/addshippingPrice').post(shippingPrice.addshippingPrice);

    //get shipping price rule list
    //app.route('/api/promotions/getShippingPriceList').get(shippingPrice.getShippingPriceList);

    //delete shipping price rule
    //app.route('/api/promotions/deleteShippingPrice/:itemId').delete(shippingPrice.deleteShippingPrice);

    //get shipping price rule details
    //app.route('/api/promotions/getShippingPriceDetails/:ruleId').get(shippingPrice.getShippingPriceDetails);

    //update shipping price rule
    //app.route('/api/promotions/updateShippingPriceRule').put(shippingPrice.updateShippingPriceRule);
};