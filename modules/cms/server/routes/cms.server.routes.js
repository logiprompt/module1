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

  app.route('/api/cms/:cmId').all(cmsPolicy.isAllowed)
    .get(cms.read)
    .put(cms.update)
    .delete(cms.delete);

  // Finish by binding the Cm middleware
  app.param('cmId', cms.cmByID);
};
