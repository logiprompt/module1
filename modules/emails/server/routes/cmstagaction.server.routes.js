'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  cmstagaction = require('../controllers/cmstagaction.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/cmsTagAction').all()
    .get(cmstagaction.list)
    .post(cmstagaction.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/cmsTagAction/delCheckedcmsTagAction').all()
    .delete(cmstagaction.delCheckedcmsTagAction);

  // Finish by binding the Email middleware
  app.route('/api/cmsTagActionbyid').all()
  .get(cmstagaction.reads) 
  .put(cmstagaction.update) 
  .delete(cmstagaction.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
