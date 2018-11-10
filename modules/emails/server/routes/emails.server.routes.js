'use strict';

/**
 * Module dependencies
 */
//var emailsPolicy = require('../policies/emails.server.policy'),
 var  userreg = require('../controllers/userreg.server.controller');
module.exports = function(app) {
  // Emails Routes
  app.route('/api/userreg').all()
    .get(userreg.list)
    .post(userreg.create)
    .delete(userreg.delete);

  //   app.route('/api/userreg/delUser/:userId').all()
  //  .delete(userreg.delete);
 

    app.route('/api/userreg').all()
    .put(userreg.updateUser);
  
    app.route('/api/userreg/delCheckedUser').all()
    .delete(userreg.delCheckedUser);
  // Finish by binding the Email middleware
  app.route('/api/userreg/:userId').all()
    .get(userreg.read);
 app.param('userId', userreg.userByID);




};
