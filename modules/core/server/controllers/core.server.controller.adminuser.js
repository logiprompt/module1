'use strict';

var validator = require('validator'),
  path = require('path'),
  multer = require('multer'),
   mongoose = require('mongoose'),
  // Language = mongoose.model('Language'),
  // Country = mongoose.model('Country'),
  Adminuser = mongoose.model('Sys_adminuser'),
  Adminuserlog = mongoose.model('Sys_adminuserlogin'),
  Adminuserroll = mongoose.model('Sys_adminuserroll'),
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

/*** Render the server not found responses
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

exports.insadminuser = function(req, res) {

  var newAdminuser = new Adminuser(req.body);
 var newAdminuserlog = new Adminuserlog(req.body);
  var picpath="";
  var today=Date.now();
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
    
    callback(null, file.fieldname + '-' + today+'.png');
    picpath="/uploads/"+file.fieldname + '-' + today+'.png';
  // console.log(picpath);
    }
  });
  var upload = multer({ storage : storage}).single('file');
upload(req,res,function(err) {

if(err) {
return res.end("Error uploading file.");
}
else{

  var exist1=Promise.resolve(custom.fieldexist('Sys_adminuser','uname',req.body.uname));
  exist1.then(function(value2) {
    console.log(value2);
 
  if(value2==0)
 {

  var maxValue=Promise.resolve(custom.maxplus('Sys_adminuser','adminuser_id'));

  maxValue.then(function(value) {

            newAdminuser.uname = req.body.uname;
            newAdminuser.adminuser_id = value;
            newAdminuser.fname = req.body.fname;
            newAdminuser.lname = req.body.lname;
            newAdminuser.email = req.body.email;
            newAdminuser.status = req.body.status;
            newAdminuser.profileimage = picpath;
            newAdminuser.created = today;
            newAdminuser.modified = today;
            newAdminuser.created_user=req.body.username;
            newAdminuser.modified_user=req.body.username;
            newAdminuser.created_ip=req.body.ip;
            newAdminuser.modified_ip=req.body.ip;
            newAdminuser.save(function(err) { 
                    if (err) throw err;
            });


            newAdminuserlog.cadminpass = req.body.cadminpassword;
            newAdminuserlog.adminuserlog_id = value;
            newAdminuserlog.password = req.body.password;
            newAdminuserlog.cpassword = req.body.cpassword;
            newAdminuserlog.created = today;
            newAdminuserlog.modified = today;
            newAdminuserlog.created_user=req.body.username;
            newAdminuserlog.modified_user=req.body.username;
            newAdminuserlog.created_ip=req.body.ip;
            newAdminuserlog.modified_ip=req.body.ip;
            newAdminuserlog.save(function(err) { 
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
  

	  }
   })   
      
}



//////////////////////select///////////////////////////////

exports.selectAdminusers = function(req, res) {

  Adminuser.find({}).exec(function (err, data) {
    if (err) throw err;
  
res.json({
           status: true,
           data:data
       });	
});

};
/////////////////////////////////////////////////////////////
exports.delAdminusers = function(req, res) {

  
  Adminuser.deleteOne({adminuser_id:req.body.id}).exec(function (err, data) {
              if (err) throw err;
         
          res.json({
                     status: 1,
                   
                 });	
         });
 };


 
 //////////////////////delete checked////////////////////////////////////////////////



exports.delcheckedAdminusers = function(req, res) {

  
  Adminuser.deleteMany({adminuser_id:{'$in': req.body.id}}).exec(function (err, data) {
             if (err) throw err;
        
				 res.json({
                    status: 1,
                  
                });	
				
			
				});

};




////////////////////////////////////////
exports.viewBusinesscountryid = function(req, res) {

  //var newCategorys = new Category();
 
  Businesscountry.findOne({business_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
           
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};

//////////////////////////////////////////////////////////////////////
exports.updatebusinessCountry = function(req, res) {

  var picpath="";
  var today=Date.now();
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
    
    callback(null, file.fieldname + '-' + today+'.png');
    picpath="/uploads/"+file.fieldname + '-' + today+'.png';
    
    }
  });
  var upload = multer({ storage : storage}).single('file');
upload(req,res,function(err) {
 
if(err) {
return res.end("Error uploading file.");
}
else{
  
  if(picpath==''){
    Businesscountry.update({business_id:req.body.id},{
    $set:{"country" : req.body.country,
    "shortname" : req.body.shortname,
    "domain":req.body.domain,
    "status": req.body.status,
    "setupdb":req.body.setupdb,
    "migrate": req.body.migrate,
    "modified_user":req.body.username,
   "modified_ip":req.body.ip,
   "modified" : Date.now()}
},function(err) { 
                   if (err) throw err;
           });

          }
          else{
            
            Businesscountry.update({business_id:req.body.id},{
              $set:{"country" : req.body.country,
              "shortname" : req.body.shortname,
              "domain":req.body.domain,
              "flag":picpath,
              "status": req.body.status,
              "setupdb":req.body.setupdb,
              "migrate": req.body.migrate,
              "modified_user":req.body.username,
             "modified_ip":req.body.ip,
             "modified" : Date.now()}
          },function(err) { 
                             if (err) throw err;
                     });

          }



          }

  res.json({
        data:199
        });
});
}



 

