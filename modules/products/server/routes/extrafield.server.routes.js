'use strict';

/**
 * Module dependencies
 */
//var extrafieldPolicy = require('../policies/extrafield.server.policy'),
 var extrafield = require('../controllers/extrafield.server.controller');

module.exports = function(app) {
  // extrafield Group Routes
	
	app.route('/api/extrafieldgroups')
  .get(extrafield.list);
  
  app.route('/api/extrafieldgroups/create').post(extrafield.create);
  
  
	
   //app.route('/api/extrafieldgroups').all(req, res)
     //.get(extrafield.list)
  //   .post(products.create);

  // app.route('/api/products/:productId').all(productsPolicy.isAllowed)
  //   .get(products.read)
  //   .put(products.update)
  //   .delete(products.delete);

  // Finish by binding the Product middleware
  //app.param('groupId', extrafield.groupById);
};
