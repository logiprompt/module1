'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  orderhold = require('../controllers/orderhold.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/orderhold').all()
    .get(orderhold.list)
    .post(orderhold.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

  //   console.log(ordercreation);
  // app.route('/api/orderhold/delCheckedOrderCreation').all()
  //   .delete(ordercreation.delCheckedOrdercreate);

  // Finish by binding the Email middleware
 app.route('/api/orderholdbyid').all()
 .get(orderhold.reads) 
 .put(orderhold.update) 
  .delete(orderhold.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
