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

  app.route('/api/userforgot/:userId').all()
    .get(userforgot.read)
    .put(userforgot.update)
    .delete(userforgot.delete);
    
    app.route('/api/userforgot/delCheckedUserForget/:userId').all()
    .delete(userforgot.delCheckedUser);
  // Finish by binding the Email middleware
 app.param('userId', userforgot.userByID);



 
};
