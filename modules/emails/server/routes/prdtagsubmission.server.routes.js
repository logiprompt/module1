'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  prdtagsubmission = require('../controllers/prdtagsubmission.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/prdtagsub').all()
    .get(prdtagsubmission.list)
    .post(prdtagsubmission.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
    //.delete(userforgot.delete);

   
    app.route('/api/prdtagsub/delCheckedprdTagSub').all()
    .delete(prdtagsubmission.delCheckedprdtagSub);

    //Finish by binding the Email middleware
  app.route('/api/prdtagsubbyid').all()
  .get(prdtagsubmission.reads) 
  .put(prdtagsubmission.update) 
  .delete(prdtagsubmission.delete);
    //app.param(':userId', userforgot.userByIDs);



 
};
