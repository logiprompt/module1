'use strict';

/**
 * Module dependencies
 */
var newslettersPolicy = require('../policies/newsletters.server.policy'),
  newsletters = require('../controllers/newsletters.server.controller');

module.exports = function(app) {
  // Newsletters Routes
  app.route('/api/newsletters').all(newslettersPolicy.isAllowed)
    .get(newsletters.list)
    .post(newsletters.create);

  app.route('/api/newsletters/:newsletterId').all(newslettersPolicy.isAllowed)
    .get(newsletters.read)
    .put(newsletters.update)
    .delete(newsletters.delete);

  // Finish by binding the Newsletter middleware
  app.param('newsletterId', newsletters.newsletterByID);
};
