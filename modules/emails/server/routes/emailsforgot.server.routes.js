'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  userforgot = require('../controllers/userforgot.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/userforgot').all()
    .get(userforgot.list)
    .post(userforgot.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    console.log(userforgot);
  app.route('/api/userforgot/delCheckedUserForgot').all()
    .delete(userforgot.delCheckedUser);

  // Finish by binding the Email middleware
  app.route('/api/userforgotbyid').all()
  .get(userforgot.reads) 
  .put(userforgot.update) 
  .delete(userforgot.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
