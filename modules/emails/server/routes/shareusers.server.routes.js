'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  shareusers = require('../controllers/shareusers.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/shareusers').all()
    .get(shareusers.list)
    .post(shareusers.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

  //   console.log(ordercreation);
   app.route('/api/ordercompletion/delCheckedOrderCompletion').all()
  .delete(shareusers.delCheckedOrderHold);

  // Finish by binding the Email middleware
 app.route('/api/shareusersbyid').all()
 .get(shareusers.reads) 
 .put(shareusers.update) 
  .delete(shareusers.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
