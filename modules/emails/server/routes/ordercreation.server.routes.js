'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  ordercreation = require('../controllers/ordercreation.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/ordercreation').all()
    .get(ordercreation.list)
    .post(ordercreation.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    console.log(ordercreation);
  app.route('/api/ordercreation/delCheckedOrderCreation').all()
    .delete(ordercreation.delCheckedOrdercreate);

  // Finish by binding the Email middleware
  app.route('/api/ordercreationbyid').all()
  .get(ordercreation.reads) 
  .put(ordercreation.update) 
  .delete(ordercreation.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
