'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  ordercompletion = require('../controllers/ordercompletion.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/orderCompletion').all()
    .get(ordercompletion.list)
    .post(ordercompletion.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

  //   console.log(ordercreation);
   app.route('/api/ordercompletion/delCheckedOrderCompletion').all()
  .delete(ordercompletion.delCheckedOrderHold);

  // Finish by binding the Email middleware
 app.route('/api/ordercompletionbyid').all()
 .get(ordercompletion.reads) 
 .put(ordercompletion.update) 
  .delete(ordercompletion.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
