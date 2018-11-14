'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  ordercomments = require('../controllers/ordercomments.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/addOrderComments').all()
    .get(ordercomments.list)
    .post(ordercomments.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    //console.log(ordercomments);
  app.route('/api/ordercomments/delCheckedOrderComments').all()
    .delete(ordercomments.delCheckedOrderComments);

  // Finish by binding the Email middleware
  app.route('/api/ordercommentsbyid').all()
    .get(ordercomments.reads) 
    .put(ordercomments.update) 
    .delete(ordercomments.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
