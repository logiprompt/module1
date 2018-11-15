'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  shipmentcreation = require('../controllers/shipmentcreation.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/addShipmentCreation').all()
    .get(shipmentcreation.list)
    .post(shipmentcreation.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    //console.log(ordercomments);
  app.route('/api/shipmentcreation/delCheckedShipmentCreation').all()
    .delete(shipmentcreation.delCheckedShipmentCreation);

  // Finish by binding the Email middleware
  app.route('/api/shipmentcreationbyid').all()
    .get(shipmentcreation.reads) 
    .put(shipmentcreation.update) 
    .delete(shipmentcreation.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
