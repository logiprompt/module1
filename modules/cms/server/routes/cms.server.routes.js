'use strict';

/**
 * Module dependencies
 */
var cmsPolicy = require('../policies/cms.server.policy'),
  cms = require('../controllers/cms.server.controller');

module.exports = function(app) {
  // Cms Routes
  app.route('/api/cms/post').all(/*cmsPolicy.isAllowed*/)
    .get(cms.list)
    .post(cms.create);
  app.route('/api/cms/post/:id').all(/*cmsPolicy.isAllowed*/).delete(cms.deletepost);
  app.route('/api/cms/post/:id').all(/*cmsPolicy.isAllowed*/).get(cms.getpostById);
  app.route('/api/cms/post/:id').all(/*cmsPolicy.isAllowed*/).put(cms.updatepostById);
  
  
  app.route('/api/cms/category/addCategory').post(cms.addCategory);

  app.route('/api/cms/category/updateCategory').post(cms.updateCategory);

  app.route('/api/cms/category/addSubCategory').post(cms.addSubCategory);

  app.route('/api/cms/category/deleteCategory/:categoryId').put(cms.deleteCategory);

  app.route('/api/cms/category/getCategoryItems').get(cms.getCategoryItems);

  app.route('/api/cms/category/getCategoryDetails/:categoryId').get(cms.getCategoryDetails);
  
  
  app.route('/api/cms/page/addPage').post(cms.addPage);

  app.route('/api/cms/page/updatePage/:pageId').put(cms.updatePage);

  app.route('/api/cms/page/deletePage/:pageId').delete(cms.deletePage);

  app.route('/api/cms/page/getPageItems').get(cms.getPageItems);

  app.route('/api/cms/page/getPageDetails/:pageId').get(cms.getPageDetails);
  
  app.route('/api/cms/:cmId').all(cmsPolicy.isAllowed)
    .get(cms.read)
    .put(cms.update)
    .delete(cms.delete);

  // Finish by binding the Cm middleware
  app.param('cmId', cms.cmByID);
};
