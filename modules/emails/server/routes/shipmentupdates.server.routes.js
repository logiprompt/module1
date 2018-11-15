'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  shipmentupdates = require('../controllers/shipmentupdates.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/addShipmentUpdates').all()
    .get(shipmentupdates.list)
    .post(shipmentupdates.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    //console.log(ordercomments);
  app.route('/api/shipmentupdates/delCheckedShipmentUpdates').all()
    .delete(shipmentupdates.delCheckedShipmentUpdates);

  // Finish by binding the Email middleware
  app.route('/api/shipmentupdatesbyid').all()
    .get(shipmentupdates.reads) 
    .put(shipmentupdates.update) 
    .delete(shipmentupdates.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
