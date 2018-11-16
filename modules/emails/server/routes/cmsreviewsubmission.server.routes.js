'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  cmsreviewsubmission = require('../controllers/cmsreviewsubmission.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/addReviewSubmition').all()
    .get(cmsreviewsubmission.list)
    .post(cmsreviewsubmission.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    //console.log(ordercomments);
  app.route('/api/cmsreviewsubmission/delCheckedCmsreviewSubmission').all()
   .delete(cmsreviewsubmission.delCheckedCmsreviewSubmission);

  // Finish by binding the Email middleware
  app.route('/api/cmsreviewsubmissionbyid').all()
    .get(cmsreviewsubmission.reads) 
    .put(cmsreviewsubmission.update) 
    .delete(cmsreviewsubmission.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
