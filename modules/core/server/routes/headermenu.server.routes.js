'use strict';

/**
 * Module dependencies
 */
//var extrafieldPolicy = require('../policies/extrafield.server.policy'),
 var headermenu = require('../controllers/headermenu.server.controller');

module.exports = function(app) {
  // extrafield Group Routes
	

  
  app.route('/api/headermenu')
  .post(headermenu.getTopMenuList);
  //.delete(acl.delete)
 // .put(acl.updateacl);
  //console.log(13);

  app.route('/api/headermenu/submenu')
  .post(headermenu.getTopSubMenuList);
  //app.route('/api/acl/delCheckedacl/:aclId').delete(acl.delCheckedacl);
	
};
