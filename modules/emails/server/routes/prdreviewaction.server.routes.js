'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  prdreviewaction = require('../controllers/prdreviewaction.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/prdreviewaction').all()
    .get(prdreviewaction.list)
    .post(prdreviewaction.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

   
  app.route('/api/prdreviewaction/delCheckedprdReviewAction').all()
    .delete(prdreviewaction.delCheckedprdReviewAction);

  // Finish by binding the Email middleware
  app.route('/api/prdreviewactionbyid').all()
  .get(prdreviewaction.reads) 
  .put(prdreviewaction.update) 
  .delete(prdreviewaction.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
