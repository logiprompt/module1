'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
 var  invoicecomments = require('../controllers/invoicecomment.server.controller');
module.exports = function(app) {
  // Emails Routes
  app.route('/api/addInvoicecomment').all()
    .get(invoicecomments.list)
    .post(invoicecomments.creates)
    .delete(invoicecomments.delete);

  //   app.route('/api/userreg/delUser/:userId').all()
  //  .delete(userreg.delete);
 

    app.route('/api/updateinvoicecomment').all()
    .put(invoicecomments.updateInvoicecomment);
  
    app.route('/api/invoice/delCheckedinvoicecomments').all()
    .delete(invoicecomments.delCheckedinvoice);
  // Finish by binding the Email middleware
  app.route('/api/getinvoicecomment').all()
    .get(invoicecomments.invoicecommentsByID);
 




};
