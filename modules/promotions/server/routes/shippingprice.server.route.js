'use strict';

/**
 * Module dependencies
 */
var promotionsPolicy = require('../policies/promotions.server.policy'),
    shippingPrice = require('../controllers/shippingprice.server.controller');

module.exports = function (app) {

     // //get  countries
     app.route('/api/promotion/getShippingCountryList')
     .get(shippingPrice.getShippingCountryList);
 
    // //add shipping price rule
    app.route('/api/promotion/addshippingPrice')
    .post(shippingPrice.addshippingPrice);

   // get shipping price rule list
   app.route('/api/promotion/getShippingPriceList')
    .get(shippingPrice.getShippingPriceList);
   // .put(shippingPrice.update)
    //.delete(shippingPrice.delete);

    //delete shipping price rule
    app.route('/api/promotion/deleteShippingPrice')
    .delete(shippingPrice.deleteShippingPrice);
//delete checked shipping price rule
    app.route('/api/promotion/delChecked')
    .delete(shippingPrice.delChecked);
    //get shipping price rule details
    app.route('/api/promotion/getShippingPriceDetails')
    .get(shippingPrice.getShippingPriceDetails);

    //update shipping price rule
    app.route('/api/promotion/updateShippingPriceRule')
    .put(shippingPrice.updateShippingPriceRule);
};