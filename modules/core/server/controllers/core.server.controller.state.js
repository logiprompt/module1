'use strict';

var validator = require('validator'),
  path = require('path'),
   mongoose = require('mongoose'),
    State = mongoose.model('Sys_state'),
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



exports.selectCountry = function(req, res) {

  Country.find({}).exec(function (err, data) {
             if (err) throw err;
         
         res.json({
                    status: true,
                    data:data
                }); 
        
      
        });

};


exports.updateState = function(req, res) {
  //var Newslug=custom.createslug(req.body.category,req.body.id);
  var state=req.body.state;
  // console.log(country);
   var upper = state.replace(/^\w/, function (chr) {
     return chr.toUpperCase();
   });
  var exist2=Promise.resolve(custom.fieldexist2('Sys_state','country',req.body.country,'state',upper));
  exist2.then(function(value2) {
    if(value2==0){
 State.update({_id:req.body.id},{
     $set:{"country" : req.body.country,"state":upper,"status":req.body.status,"modified" : Date.now(),"modified_user":req.body.username,"modified_ip":req.body.ip}
 },function(err) { 
                    if (err) throw err;
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
exports.selectState = function(req, res) {

  State.find().populate({ path: 'country', select: 'country' }).exec(function (err, data) {
             if (err) throw err;
         
         res.json({
                    status: true,
                    data:data
                }); 
        
      
        });

};
//////////////////////insert///////////////////////////////
exports.insState= function(req, res) {
  var state=req.body.state;
  // console.log(country);
   var upper = state.replace(/^\w/, function (chr) {
     return chr.toUpperCase();
   });
  var exist2=Promise.resolve(custom.fieldexist2('Sys_state','country',req.body.country,'state',upper));
  exist2.then(function(value2) {
    if(value2==0){

  var maxValue=Promise.resolve(custom.maxplus('Sys_state','_id'));
 
  maxValue.then(function(value) {
  console.log(11);
    //var Newslug=custom.createslug(req.body.category,value);

  var newState = new State(req.body);
 
  
  newState.state =upper;
  newState.country = req.body.country;
  newState.status = req.body.status;
  newState.created = Date.now();
  newState.modified = Date.now();
  
  newState.save(function(err) { 
                    if (err) throw err;

            });
    });     

  res.json({
        data:1
        });
}
else
{
   res.json({
        data:2
        });
}
})
};

exports.viewStatebyid = function(req, res) {

  State.findOne({_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
          
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};
exports.delstate = function(req, res) {

  var exist2=Promise.resolve(custom.fieldexist('Sys_district','state',req.body.id));
  exist2.then(function(value2) {
    if(value2==0){
     
  State.deleteOne({_id:req.body.id}).exec(function (err, data) {
   // console.log(4444);
             if (err) throw err;
        
				 res.json({
                    data:1,
                  
                });	
				
			
        });
      }
      else{
        res.json({
          data:2
          });
      }
    })

};
exports.updateCat = function(req, res) {

 
 Category.update({_id:req.body.id},{
     $set:{"category" : req.body.category,"modified" : Date.now(),}
 },function(err) { 
                    if (err) throw err;
            });
 
//console.log();
  res.json({
       status:1
        });
};
exports.delcheckedstate = function(req, res) {

  State.deleteMany({_id:{'$in': req.body.id}}).exec(function (err, data) {
             if (err) throw err;
        res.json({
                    status: 1,
              });	
				
			
				});
};

//////////////////////select///////////////////////////////

exports.selectCategory = function(req, res) {

  //var newCategorys = new Category();
 
  Category.find({}).exec(function (err, data) {
             if (err) throw err;
            console.log(data);
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};

exports.editCategory = function(req, res) {

  //var newCategorys = new Category();
 
  Category.findOne({_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
            console.log(data);
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};


exports.delCategory = function(req, res) {

  //var newCategorys = new Category();
 console.log(req.body.id);
  Category.deleteOne({_id:req.body.id}).exec(function (err, data) {
             if (err) throw err;
         //  console.log(data);
           console.log('99');
				 res.json({
                    status: 1,
                  
                });	
				
			
				});

};


