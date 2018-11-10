'use strict';

/**
 * Module dependencies
 */
//var extrafieldPolicy = require('../policies/extrafield.server.policy'),
 var adminuser = require('../controllers/core.server.controller.adminuser');

module.exports = function(app) {
  // extrafield Group Routes
	
//	app.route('/api/acl/getacl') .post(acl.list);
  
  //app.route('/api/adminuser/update').post(adminuser.create);
  
 app.route('/api/admin/selectAdminuser')
  .post(adminuser.reads);
 //.put(adminuser.updateUser);

  //console.log(13);
  //app.route('/api/acl/delCheckedacl/:aclId').delete(acl.delCheckedacl);
	
};
