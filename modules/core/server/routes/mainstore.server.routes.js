'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
var  mainstore = require('../controllers/mainstore.server.controller');

module.exports = function(app) {
  // Emails Routes
  app.route('/api/insMainstores').all()
  
    .post(mainstore.list)
   
	
	app.route('/api/insMainstoreadd').all()
  
    .post(mainstore.create);
	
	app.route('/api/getMainstoreDetails').all()
  
    .post(mainstore.getdetails);

//app.route('/api/userforgot/:userId').all()

    //.get(userforgot.read)    
    //.post(userforgot.update)
   // .delete(userforgot.delete);

    //console.log(ordercomments);
  //app.route('/api/cmsratingaction/delCheckedCmsratingAction').all()
   //.delete(cmsratingaction.delCheckedCmsratingAction);

  // Finish by binding the Email middleware
   app.route('/api/getsDistrictbyId').all()
   .post(mainstore.readsdistrict) 
   
  app.route('/api/getsStatesbyId').all()
    .post(mainstore.reads)
	.put(mainstore.update) 
    .delete(mainstore.delete);
 // app.param(':userId', userforgot.userByIDs);



 
};
