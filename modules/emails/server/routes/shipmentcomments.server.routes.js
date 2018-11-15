'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  shipmentcomments = require('../controllers/shipmentcomments.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/addShipmentComments').all()
    .get(shipmentcomments.list)
    .post(shipmentcomments.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    //console.log(ordercomments);
  app.route('/api/shipmentcomments/delCheckedShipmentComments').all()
    .delete(shipmentcomments.delCheckedShipmentComments);

  // Finish by binding the Email middleware
  app.route('/api/shipmentcommentsbyid').all()
    .get(shipmentcomments.reads) 
    .put(shipmentcomments.update) 
    .delete(shipmentcomments.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
