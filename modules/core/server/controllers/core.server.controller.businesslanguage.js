'use strict';

var validator = require('validator'),
  path = require('path'),
  multer = require('multer'),
   mongoose = require('mongoose'),
  // Language = mongoose.model('Language'),
  // Country = mongoose.model('Country'),
   Businesslanguage = mongoose.model('Sys_Businesslanguage'),
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

exports.insbusinesslang = function(req, res) {
  var newBusinesslanguage = new Businesslanguage(req.body);
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
  var exist1=Promise.resolve(custom.fieldexist('Sys_Businesslanguage','localname',req.body.localname));
  exist1.then(function(value2) {
   // console.log(value2);
  if(value2==0)
 {
  var maxValue=Promise.resolve(custom.maxplus('Sys_Businesslanguage','businesslang_id'));
maxValue.then(function(value) 
{
  newBusinesslanguage.blangcountry = req.body.bcountryname;
  newBusinesslanguage.businesslang_id = value;
  newBusinesslanguage.blanguagename = req.body.blanguagename;
  newBusinesslanguage.shortname = req.body.bshortname;
  newBusinesslanguage.localname = req.body.localname;
  newBusinesslanguage.localcountryname = req.body.localcountryname;
  newBusinesslanguage.blangsupportrtl = req.body.supportrtl;
  newBusinesslanguage.status = req.body.langstatus;
  newBusinesslanguage.setupdb = req.body.setupdb;
  newBusinesslanguage.migrate = req.body.migrate;
  newBusinesslanguage.flag = picpath;
  newBusinesslanguage.created = today;
  newBusinesslanguage.modified = today;
  newBusinesslanguage.created_user=req.body.username;
  newBusinesslanguage.modified_user=req.body.username;
  newBusinesslanguage.created_ip=req.body.ip;
  newBusinesslanguage.modified_ip=req.body.ip;
  newBusinesslanguage.save(function(err) 
  { 
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

exports.selectBusinesslang = function(req, res) {

  Businesslanguage.find({}).exec(function (err, data) {
    if (err) throw err;
  
res.json({
           status: true,
           data:data
       });	
});

};
/////////////////////////////////////////////////////////////
exports.delbusinesslang = function(req, res) {

  Businesslanguage.deleteOne({businesslang_id:req.body.id}).exec(function (err, data) {
              if (err) throw err;
         
          res.json({
                     status: 1,
                   
                 });	
         });
 };


 
exports.delcheckedbusinesslang = function(req, res) {

  Businesslanguage.deleteMany({businesslang_id:{'$in': req.body.id}}).exec(function (err, data) {
             if (err) throw err;
        res.json({
                    status: 1,
              });	
				
			
				});
};

////////////////////////////////////////
exports.editBusinesslangbyid = function(req, res) {

  //var newCategorys = new Category();
 
  Businesslanguage.findOne({businesslang_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
           
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};
//////////////////////////////////////////////////////////////////////



  
 
//   Language.findOne({lang_id: req.body.id}).exec(function (err, data) {
//              if (err) throw err;
           
//          res.json({
//                     status: true,
//                     data:data
//                 }); 
        
      
//         });

// };
exports.setasDefault = function(req, res) {
  Country.update({"defaultcountry":1},{
     $set:{"defaultcountry" : 0,"modified" : Date.now()}
 },function(err) { 
                    if (err) throw err;

            Country.update({country_id:req.body.id},{
     $set:{"defaultcountry" : 1,"modified" : Date.now()}
 },function(err) { 
                    if (err) throw err;
            });

            });
 
res.json({
       status:1
        });
 

 
//console.log();
  


};
//////////////////////////////////////////////////////////////////////

exports.updatebusinessLang = function(req, res) {

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
    Businesslanguage.update({businesslang_id:req.body.id},{
    $set:{"blangcountry" : req.body.bcountryname,
        "blanguagename" : req.body.blanguagename,
        "shortname" : req.body.shortname,
        "localname":req.body.localname,
        "localcountryname" : req.body.localcountryname,
        "blangsupportrtl":req.body.blangsupportrtl,
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
            
            Businesslanguage.update({businesslang_id:req.body.id},{
      $set:{"blangcountry" : req.body.bcountryname,
            "blanguagename" : req.body.blanguagename,
            "shortname" : req.body.shortname,
            "localname":req.body.localname,
            "localcountryname" : req.body.localcountryname,
            "blangsupportrtl":req.body.blangsupportrtl,
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







