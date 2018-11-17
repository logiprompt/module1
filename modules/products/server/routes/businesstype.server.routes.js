'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  businesstype = require('../controllers/businesstype.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/businessType').all()
    .get(businesstype.list)
    .post(businesstype.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

  //   console.log(ordercreation);
   app.route('/api/ordercompletion/delCheckedOrderCompletion').all()
  .delete(businesstype.delCheckedOrderHold);

  // Finish by binding the Email middleware
 app.route('/api/ordercompletionbyid').all()
 .get(businesstype.reads) 
 .put(businesstype.update) 
  .delete(businesstype.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
