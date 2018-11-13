'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  nostock = require('../controllers/nostock.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/nostock').all()
    .get(nostock.list)
    .post(nostock.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/nostock/delCheckedNoStock').all()
    .delete(nostock.delCheckedNoStock);

  // Finish by binding the Email middleware
  app.route('/api/NoStockbyid').all()
  .get(nostock.reads) 
  .put(nostock.update) 
  .delete(nostock.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
