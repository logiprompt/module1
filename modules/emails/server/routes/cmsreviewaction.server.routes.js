'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  cmsreviewaction = require('../controllers/cmsreviewaction.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/cmsReviewAction').all()
    .get(cmsreviewaction.list)
    .post(cmsreviewaction.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/cmsReviewAction/delCheckedcmsReviewAction').all()
    .delete(cmsreviewaction.delCheckedcmsReviewAction);

  // Finish by binding the Email middleware
  app.route('/api/cmsReviewActionbyid').all()
  .get(cmsreviewaction.reads) 
  .put(cmsreviewaction.update) 
  .delete(cmsreviewaction.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
