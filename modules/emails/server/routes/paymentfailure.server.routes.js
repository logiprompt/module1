'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  paymentfailure = require('../controllers/paymentfailure.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/addPaymentFailure').all()
    .get(paymentfailure.list)
    .post(paymentfailure.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    console.log(paymentfailure);
  app.route('/api/paymentfailure/delCheckedPaymentFailure').all()
    .delete(paymentfailure.delCheckedPayment);

  // Finish by binding the Email middleware
  app.route('/api/paymentfailurebyid').all()
    .get(paymentfailure.reads) 
    .put(paymentfailure.update) 
    .delete(paymentfailure.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
