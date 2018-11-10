'use strict';

/**
 * Module dependencies
 */
//var extrafieldPolicy = require('../policies/extrafield.server.policy'),
 var acl = require('../controllers/acl.server.controller');

module.exports = function(app) {
  // extrafield Group Routes
	
//	app.route('/api/acl/getacl') .post(acl.list);
  
  app.route('/api/acl/create').post(acl.create);
  
  app.route('/api/acl')
  .post(acl.getAclList);
  //.delete(acl.delete)
 // .put(acl.updateacl);
  //console.log(13);
  //app.route('/api/acl/delCheckedacl/:aclId').delete(acl.delCheckedacl);
	
};
