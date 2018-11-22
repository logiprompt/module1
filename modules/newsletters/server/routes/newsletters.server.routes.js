'use strict';

/**
 * Module dependencies
 */
var newslettersPolicy = require('../policies/newsletters.server.policy'),
  newsletters = require('../controllers/newsletters.server.controller');

module.exports = function(app) {
  // Newsletters Routes
  app.route('/api/getNewslettertemp').all()
  .get(newsletters.listtemp)
    .post(newsletters.create);
    app.route('/api/getnews').all()
    .get(newsletters.listnews)
  // app.route('/api/getNewsletterByIdaa/:newsletterId').all()
  //   .get(newsletters.read)
  //   .put(newsletters.update)
  //   .delete(newsletters.delete);
    app.route('/api/getNewsletterById').all()
    .get(newsletters.getNewsletterById);
  // Finish by binding the Newsletter middleware
  
  
};
