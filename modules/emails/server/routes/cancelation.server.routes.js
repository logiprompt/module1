'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  cancelation = require('../controllers/cancelation.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/cancelation').all()
    .get(cancelation.list)
    .post(cancelation.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
     
    //.post(userforgot.update)  
   // .delete(userforgot.delete);

   
   app.route('/api/cancelation/delCheckedCancelation').all()
   .delete(cancelation.delCheckedCancelation);

  // Finish by binding the Email middleware
   app.route('/api/cancelationbyid').all()
   .get(cancelation.reads) 
   .put(cancelation.update) 
   .delete(cancelation.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
