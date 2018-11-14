'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  orderunhold = require('../controllers/orderunhold.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/orderunhold').all()
    .get(orderunhold.list)
    .post(orderunhold.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

  //   console.log(ordercreation);
  app.route('/api/orderunhold/delCheckedOrderUnhold').all()
  .delete(orderunhold.delCheckedOrderUnhold);

  // Finish by binding the Email middleware
 app.route('/api/orderunholdbyid').all()
 .get(orderunhold.reads) 
 .put(orderunhold.update) 
  .delete(orderunhold.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
