'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  memocreation = require('../controllers/memocreation.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/memocreation').all()
    .get(memocreation.list)
    .post(memocreation.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/memocreation/delCheckedMemoCreation').all()
    .delete(memocreation.delCheckedMemoCreation);

  // Finish by binding the Email middleware
  app.route('/api/memocreationbyid').all()
  .get(memocreation.reads) 
  .put(memocreation.update) 
  .delete(memocreation.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
