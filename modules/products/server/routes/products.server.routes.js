'use strict';

/**
 * Module dependencies
 */
var productsPolicy = require('../policies/products.server.policy'),
  products = require('../controllers/products.server.controller');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
});
var upload = multer({storage: storage});

module.exports = function(app) {
	
	
	
  // Products Routes
   app.route('/api/products')
     .get(products.list)
     .post(upload.array('product_images',10),products.create);
   app.route('/api/products/:productId')
   .get(products.listById)
   .put(products.updateProducts);
   app.route('/api/products/:productId').delete(products.deleteproduct);

  // app.route('/api/products/:productId').all(productsPolicy.isAllowed)
  //   .get(products.read)
  //   .put(products.update)
  //   .delete(products.delete);

  // Finish by binding the Product middleware
  //app.param('productId', products.productByID);
};
