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
 

  //   app.route('/api/updateinvoice').all()
  //   .put(subscription.updateInvoice);
  
  //   app.route('/api/invoice/delCheckedinvoice').all()
  //   .delete(subscription.delCheckedinvoice);
  // // Finish by binding the Email middleware
  // app.route('/api/getinvoice').all()
  //   .get(subscription.invoiceByID);
 




};
