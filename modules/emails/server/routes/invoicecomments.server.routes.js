'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
 var  invoicecomments = require('../controllers/invoicecomment.server.controller');
module.exports = function(app) {
  // Emails Routes
  app.route('/api/addInvoicecomments').all()
    .get(invoicecomments.list)
    .post(invoicecomments.create)
    .delete(invoicecomments.delete);

  //   app.route('/api/userreg/delUser/:userId').all()
  //  .delete(userreg.delete);
 

    app.route('/api/updateinvoice').all()
    .put(invoicecomments.updateInvoice);
  
    app.route('/api/invoice/delCheckedinvoice').all()
    .delete(invoicecomments.delCheckedinvoice);
  // Finish by binding the Email middleware
  app.route('/api/getinvoice').all()
    .get(invoicecomments.invoiceByID);
 




};
