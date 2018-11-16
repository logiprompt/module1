'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
 var  subscription = require('../controllers/subscription.server.controller');
module.exports = function(app) {
  // Emails Routes
  app.route('/api/addSubscription').all()
    .get(subscription.list)
    .post(subscription.create)
    .delete(subscription.delete);

  //   app.route('/api/userreg/delUser/:userId').all()
  //  .delete(userreg.delete);
 

    app.route('/api/updateSubscription').all()
     .put(subscription.updateSubscription);
  
     app.route('/api/delcheckedsubscription').all()
     .delete(subscription.delcheckedsubscription);
  // // Finish by binding the Email middleware
   app.route('/api/getsubscription').all()
    .get(subscription.subscriptionByID);
 




};
