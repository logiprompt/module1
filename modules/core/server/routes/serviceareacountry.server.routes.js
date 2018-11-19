'use strict';

/**
 * Module dependencies
 */
//var extrafieldPolicy = require('../policies/extrafield.server.policy'),
 var serviceareacountry = require('../controllers/serviceareacountry.server.controller');

module.exports = function(app) {
  // extrafield Group Routes
	
//	app.route('/api/serviceareacountry/getserviceareacountry') .post(serviceareacountry.list);
app.route('/api/genserviceareacountry')
.post(serviceareacountry.serviceareacountrylist);

app.route('/api/genserviceareacountries')
.post(serviceareacountry.create);

  app.route('/api/genserviceareas')
.post(serviceareacountry.list);
  // app.route('/api/serviceareacountry/create').post(serviceareacountry.create);
  
  // app.route('/api/serviceareacountry')
  // .post(serviceareacountry.getserviceareacountryList);
  //.delete(serviceareacountry.delete)
 // .put(serviceareacountry.updateserviceareacountry);
  //console.log(13);

 
  //app.route('/api/serviceareacountry/delCheckedserviceareacountry/:serviceareacountryId').delete(serviceareacountry.delCheckedserviceareacountry);
	
};
