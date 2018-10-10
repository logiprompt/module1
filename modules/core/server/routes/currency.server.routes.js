'use strict';

/**
 * Module dependencies
 */
//var extrafieldPolicy = require('../policies/extrafield.server.policy'),
 var currency = require('../controllers/currency.server.controller');

module.exports = function(app) {
  // extrafield Group Routes
	
	app.route('/api/currency')
  .get(currency.list);
  
  app.route('/api/currency/create').post(currency.create);
  
  app.route('/api/currency/:groupId')
  .get(currency.getById)
  .delete(currency.delete)
  .put(currency.updateCurrency);
  
	
};
