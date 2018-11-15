'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  prdreviewsubmission = require('../controllers/prdreviewsubmission.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/prdreviewsub').all()
    .get(prdreviewsubmission.list)
    .post(prdreviewsubmission.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/prdreviewsub/delCheckedprdReviewSub').all()
    .delete(prdreviewsubmission.delCheckedprdReviewSub);

  // Finish by binding the Email middleware
  app.route('/api/prdreviewsubbyid').all()
  .get(prdreviewsubmission.reads) 
  .put(prdreviewsubmission.update) 
  .delete(prdreviewsubmission.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
