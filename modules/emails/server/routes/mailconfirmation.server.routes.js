'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var mailconfirmation = require('../controllers/mailconfirmation.server.controller');

module.exports = function (app) {
  // Emails Routes
  app.route('/api/mailconfirmation').all()
    .get(mailconfirmation.list)
    .post(mailconfirmation.create);

  app.route('/api/mailconfirmation/delCheckedMailConfirmation').all()
    .delete(mailconfirmation.delCheckedMailConfirmation);

  // Finish by binding the Email middleware
  app.route('/api/mailconfirmationbyid').all()
    .get(mailconfirmation.reads)
    .put(mailconfirmation.update)
    .delete(mailconfirmation.delete);
  //app.param(':userId', userforgot.userByIDs);




};
