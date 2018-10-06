'use strict';

var validator = require('validator'),
  path = require('path'),
  mongoose = require('mongoose'),
  Role = mongoose.model('Sys_roleprivilege'),
  

  custom=require('./custom'),
  config = require(path.resolve('./config/config'));



/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {

  var safeUserObject = null;
  if (req.user) {
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
//////////////////////insert///////////////////////////////
exports.insRoleandprivilege = function(req, res) {


  var exist2=Promise.resolve(custom.fieldexist('Sys_roleprivilege','name',req.body.rolename));
  exist2.then(function(value2) {
    if(value2==0){

  var maxValue=Promise.resolve(custom.maxplus('Sys_roleprivilege','role_id'));
 
  maxValue.then(function(value) {
  
    //var Newslug=custom.createslug(req.body.category,value);

  var newRole = new Role(req.body);
  newRole.role_id = value;
  newRole.name = req.body.rolename;
  
  newRole.rolestatus = req.body.rolestatus;
  newRole.created = Date.now();
  newRole.modified = Date.now();
  newRole.created_user=req.body.username;
  newRole.modified_user=req.body.username;
  newRole.created_ip=req.body.ip;
  newRole.modified_ip=req.body.ip;

  newRole.save(function(err) { 
                    if (err) throw err;

            });


    });     

  res.json({
        data:0
        });
      }

else{

  res.json({
    data:1
    });
}



   })
};

exports.updateRoleandprivilege = function(req, res) {
  //var Newslug=custom.createslug(req.body.category,req.body.id);
 
  Role.update({role_id:req.body.id},{
     $set:{"name" : req.body.rolename,"rolestatus": req.body.rolestatus,"modified" : Date.now(),"modified_user":req.body.username,"modified_ip":req.body.ip}
 },function(err) { 
                    if (err) throw err;
            });

  res.json({
       status:1
        });
};

//////////////////////select///////////////////////////////

exports.selectRoleprivileges = function(req, res) {

  Role.find({}).exec(function (err, data) {
             if (err) throw err;
         
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};

exports.viewRoleprivilegebyid = function(req, res) {

  Role.findOne({role_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
          
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};


exports.delRoleprivileges = function(req, res) {

  
  Role.deleteOne({role_id:req.body.id}).exec(function (err, data) {
             if (err) throw err;
        
				 res.json({
                    status: 1,
                  
                });	
				
			
				});

};

exports.delchecked = function(req, res) {

  
  Role.deleteMany({role_id:{'$in': req.body.id}}).exec(function (err, data) {
             if (err) throw err;
        
				 res.json({
                    status: 1,
                  
                });	
				
			
				});

};

