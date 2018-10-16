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
  
  app.route('/api/extrafieldgroups/:groupId')
  .get(extrafield.getById)
  .delete(extrafield.delete)
  .put(extrafield.updateExtrafieldGroup);
  
  
  app.route('/api/extrafield/:groupId').get(extrafield.listField);
  app.route('/api/extrafield/create').post(extrafield.createField);
  app.route('/api/extrafield/:fieldId').delete(extrafield.deletefield);
  app.route('/api/extrafield/:fieldId').put(extrafield.updatefield);
  /*
  app.route('/api/extrafield/:fieldId')
  .get(extrafield.getFieldById)
  .delete(extrafield.deleteField)
  .put(extrafield.updatefield); */
  
  
	
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
