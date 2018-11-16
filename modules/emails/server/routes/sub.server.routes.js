'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
 var  subscription = require('../controllers/sub.server.controller');
module.exports = function(app) {
  // Emails Routes
  app.route('/api/addSub').all()
    .get(subscription.list)
    .post(subscription.create)
    .delete(subscription.delete);

  //   app.route('/api/userreg/delUser/:userId').all()
  //  .delete(userreg.delete);
 

     app.route('/api/updateSub').all()
   .put(subscription.updateSub);
  
      app.route('/api/delcheckeditem').all()
   .delete(subscription.delcheckeditem);
  // // // Finish by binding the Email middleware
   app.route('/api/getsub').all()
   .get(subscription.subByID);
 




};
