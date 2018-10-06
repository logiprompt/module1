'use strict';

var validator = require('validator'),
  path = require('path'),
  mongoose = require('mongoose'),
  State = mongoose.model('Sys_state'),
  District = mongoose.model('Sys_district'),
  Pincode = mongoose.model('Sys_pincode'),

  custom=require('./custom'),
  config = require(path.resolve('./config/config'));



/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {

  var safeUserObject = null;
  if (req.user)
  {
      safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });

 };
 exports.renderAdmin = function (req, res) {

  var safeUserObject = null;
  

  res.render('modules/core/server/views/index', {
   
  });

 };

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });

};


/////////////////////////////////change state///////////////////////////
exports.changestate = function(req, res) {

  District.find({state: req.body.id}).exec(function (err, data) {
             if (err) throw err;
          
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};


//////////////////////insert District///////////////////////////////

exports.insPincode= function(req, res) {

  var exist2=Promise.resolve(custom.fieldexist('Sys_pincode','pincode',req.body.pincode));
  exist2.then(function(value2) {
    if(value2==0){

  var maxValue=Promise.resolve(custom.maxplus('Sys_pincode','pincode_id'));
 
  maxValue.then(function(value) {
  
    //var Newslug=custom.createslug(req.body.category,value);

  var newPincode = new Pincode(req.body);
  newPincode.pincode_id = value;
  newPincode.country = req.body.country;
  newPincode.state = req.body.state;
  newPincode.district = req.body.district;
  newPincode.pincode = req.body.pincode;
  newPincode.status = req.body.status;
  newPincode.created = Date.now();
  newPincode.modified = Date.now();
  newPincode.created_user=req.body.username;
  newPincode.modified_user=req.body.username;
  newPincode.created_ip=req.body.ip;
  newPincode.modified_ip=req.body.ip;
  
  newPincode.save(function(err) { 
                    if (err) throw err;

            });
    });     

  res.json({
        data:0
        });
	}
	else
{
   res.json({
        data:1
        });
}
})
};
///////////////////////////update district///////////////////////////////////
exports.updatePincode = function(req, res) {
  //var Newslug=custom.createslug(req.body.category,req.body.id);
 
  Pincode.update({pincode_id:req.body.id},{
     $set:{"country" : req.body.country,"state":req.body.state,
     "district":req.body.district,"pincode":req.body.pincode,"status":req.body.status,
     "modified" : Date.now(),"modified_user":req.body.username,"modified_ip":req.body.ip}
 },function(err) { 
                    if (err) throw err;
            });

  res.json({
       data:1
        });
};

//////////////////////select District///////////////////////////////

exports.selectPincode = function(req, res) {

  Pincode.find({}).exec(function (err, data) {
             if (err) throw err;
         
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};
/////////////////////////////////Edit District///////////////////////////
exports.viewPincodebyid = function(req, res) {

  Pincode.findOne({pincode_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
          
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};
////////////////////////////////////delete District////////////////////////////////////////////

exports.delPincode = function(req, res) {

  
  Pincode.deleteOne({pincode_id:req.body.id}).exec(function (err, data) {
             if (err) throw err;
        
				 res.json({
                    data: 1,
                  
                });	
				
			
				});

};


exports.delcheckedpincode = function(req, res) {

  Pincode.deleteMany({pincode_id:{'$in': req.body.id}}).exec(function (err, data) {
             if (err) throw err;
        res.json({
                    status: 1,
              });	
				
			
				});
};







