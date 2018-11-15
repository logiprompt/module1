'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  prdratingsubmission = require('../controllers/prdratingsubmission.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/prdratingsub').all()
    .get(prdratingsubmission.list)
    .post(prdratingsubmission.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/prdratingsub/delCheckedprdRatingSub').all()
    .delete(prdratingsubmission.delCheckedprdRatingSub);

  // Finish by binding the Email middleware
  app.route('/api/prdratingsubbyid').all()
  .get(prdratingsubmission.reads) 
  .put(prdratingsubmission.update) 
  .delete(prdratingsubmission.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
