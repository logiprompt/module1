'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  cmsratingaction = require('../controllers/cmsratingaction.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/addRatingAction').all()
    .get(cmsratingaction.list)
    .post(cmsratingaction.create);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    //console.log(ordercomments);
  app.route('/api/cmsratingaction/delCheckedCmsratingAction').all()
   .delete(cmsratingaction.delCheckedCmsratingAction);

  // Finish by binding the Email middleware
  app.route('/api/cmsratingactionbyid').all()
    .get(cmsratingaction.reads) 
    .put(cmsratingaction.update) 
    .delete(cmsratingaction.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
