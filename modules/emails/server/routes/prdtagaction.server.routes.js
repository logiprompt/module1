'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  prdtagaction = require('../controllers/prdtagaction.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/prdTagAction').all()
    .get(prdtagaction.list)
    .post(prdtagaction.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/prdTagAction/delCheckedprdTagAction').all()
    .delete(prdtagaction.delCheckedprdTagAction);

  // Finish by binding the Email middleware
  app.route('/api/prdTagActionbyid').all()
  .get(prdtagaction.reads) 
  .put(prdtagaction.update) 
  .delete(prdtagaction.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
