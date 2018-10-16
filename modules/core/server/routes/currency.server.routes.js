'use strict';

/**
 * Module dependencies
 */
//var extrafieldPolicy = require('../policies/extrafield.server.policy'),
 var currency = require('../controllers/currency.server.controller');

module.exports = function(app) {
  // extrafield Group Routes
	
	app.route('/api/currency/getCurrency') .post(currency.list);
  
  app.route('/api/currency/create').post(currency.create);
  
  app.route('/api/currency/:currencyId')
  .post(currency.getById)
  .delete(currency.delete)
  .put(currency.updateCurrency);
  //console.log(13);
  app.route('/api/currency/delCheckedCurrency/:currencyId').delete(currency.delCheckedCurrency);
	
};
