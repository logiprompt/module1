'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  prdratingadminaction = require('../controllers/prdratingadminaction.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/prdRatingAdminAction').all()
    .get(prdratingadminaction.list)
    .post(prdratingadminaction.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/prdRatingAdminAction/delCheckedprdRatingAdminAction').all()
    .delete(prdratingadminaction.delCheckedprdRatingAdminAction);

  // Finish by binding the Email middleware
  app.route('/api/prdRatingAdminActionbyid').all()
  .get(prdratingadminaction.reads) 
  .put(prdratingadminaction.update) 
  .delete(prdratingadminaction.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
