'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  taxgroup = require('../controllers/taxgroup.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/taxgroup').all()
    .get(taxgroup.list)
    .post(taxgroup.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

  //   console.log(ordercreation);
   app.route('/api/orderhold/delCheckedOrderHold').all()
  //.delete(taxgroup.delCheckedOrderHold);

  // Finish by binding the Email middleware
 app.route('/api/taxgroupbyid').all()
 .get(taxgroup.reads) 
 .put(taxgroup.update) 
  //.delete(taxgroup.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
