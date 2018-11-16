'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  cmsratingsubmission = require('../controllers/cmsratingsub.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/cmsratingsub').all()
    .get(cmsratingsubmission.list)
    .post(cmsratingsubmission.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/cmsratingsub/delCheckedcmsRatingSub').all()
    .delete(cmsratingsubmission.delCheckedcmsRatingSub);

  // Finish by binding the Email middleware
  app.route('/api/cmsratingsubbyid').all()
  .get(cmsratingsubmission.reads) 
  .put(cmsratingsubmission.update) 
  .delete(cmsratingsubmission.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
