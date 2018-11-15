'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  orderprocess = require('../controllers/orderprocess.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/addOrderProcess').all()
    .get(orderprocess.list)
    .post(orderprocess.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    //console.log(ordercomments);
  app.route('/api/orderprocess/delCheckedOrderProcess').all()
    .delete(orderprocess.delCheckedOrderProcess);

  // Finish by binding the Email middleware
  app.route('/api/orderprocessbyid').all()
    .get(orderprocess.reads) 
    .put(orderprocess.update) 
    .delete(orderprocess.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
