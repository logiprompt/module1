'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  memocomments = require('../controllers/memocomments.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/memocomments').all()
    .get(memocomments.list)
    .post(memocomments.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/memocomments/delCheckedMemoComments').all()
    .delete(memocomments.delCheckedMemoComments);

  // Finish by binding the Email middleware
  app.route('/api/memocommentsbyid').all()
  .get(memocomments.reads) 
  .put(memocomments.update) 
  .delete(memocomments.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
