'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  cmstagsubmission = require('../controllers/cmstagsubmission.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/addTagSubmission').all()
    .get(cmstagsubmission.list)
    .post(cmstagsubmission.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    //console.log(ordercomments);
  app.route('/api/cmstagsubmission/delCheckedCmstagSubmission').all()
   .delete(cmstagsubmission.delCheckedCmstagSubmission);

  // Finish by binding the Email middleware
  app.route('/api/cmstagsubmissionbyid').all()
    .get(cmstagsubmission.reads) 
    .put(cmstagsubmission.update) 
    .delete(cmstagsubmission.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
