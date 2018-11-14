'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
 var  invoicecreation = require('../controllers/invoicecreation.server.controller');
module.exports = function(app) {
  // Emails Routes
  app.route('/api/addInvoice').all()
    .get(invoicecreation.list)
    .post(invoicecreation.create)
    .delete(invoicecreation.delete);

  //   app.route('/api/userreg/delUser/:userId').all()
  //  .delete(userreg.delete);
 

    app.route('/api/updateinvoice').all()
    .put(invoicecreation.updateInvoice);
  
    app.route('/api/invoice/delCheckedinvoice').all()
    .delete(invoicecreation.delCheckedinvoice);
  // Finish by binding the Email middleware
  app.route('/api/getinvoice').all()
    .get(invoicecreation.invoiceByID);
 




};
