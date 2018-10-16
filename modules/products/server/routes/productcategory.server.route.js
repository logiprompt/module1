'use strict';

/**
 * Module dependencies
 */
var productcategory = require('../controllers/productcategory.server.controller');

module.exports = function (app) {

    app.route('/api/productcategory/addCategory').post(productcategory.addCategory);

    app.route('/api/productcategory/updateCategory').post(productcategory.updateCategory);

    app.route('/api/productcategory/addSubCategory').post(productcategory.addSubCategory);

    app.route('/api/productcategory/deleteCategory/:categoryId').put(productcategory.deleteCategory);

    app.route('/api/productcategory/getCategoryItems').get(productcategory.getCategoryItems);

    app.route('/api/productcategory/getCategoryDetails/:categoryId').get(productcategory.getCategoryDetails);

};
