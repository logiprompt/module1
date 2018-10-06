'use strict';

var validator = require('validator'),
  path = require('path'),
  mongoose = require('mongoose'),
  Genlanguage = mongoose.model('Sys_genlanguage'),
  

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


//////////////////////insert Language///////////////////////////////

exports.insLanguage= function(req, res) {

  var exist2=Promise.resolve(custom.fieldexist('Sys_genlanguage','language',req.body.genlang));
  exist2.then(function(value2) {
    if(value2==0){

  var maxValue=Promise.resolve(custom.maxplus('Sys_genlanguage','language_id'));
 
  maxValue.then(function(value) {
  
    //var Newslug=custom.createslug(req.body.category,value);

  var newLanguage = new Genlanguage(req.body);
  newLanguage.language_id = value;
  newLanguage.language = req.body.genlang;
  newLanguage.extension = req.body.genextension;
  newLanguage.status = req.body.genstatus;
  newLanguage.created = Date.now();
  newLanguage.modified = Date.now();
  newLanguage.created_user=req.body.username;
  newLanguage.modified_user=req.body.username;
  newLanguage.created_ip=req.body.ip;
  newLanguage.modified_ip=req.body.ip;
  
  newLanguage.save(function(err) { 
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
///////////////////////////update Language///////////////////////////////////
exports.updGenlang = function(req, res) {
  //var Newslug=custom.createslug(req.body.category,req.body.id);
 
  Genlanguage.update({language_id:req.body.id},{
     $set:{"language" : req.body.language,"extension":req.body.extension,"status":req.body.status,"modified" : Date.now(),"modified_user":req.body.username,"modified_ip":req.body.ip}
 },function(err) { 
                    if (err) throw err;
            });

  res.json({
       data:1
        });
};

//////////////////////select Language///////////////////////////////

exports.selectGenlanguage = function(req, res) {

  Genlanguage.find({}).exec(function (err, data) {
             if (err) throw err;
         
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};
/////////////////////////////////Edit Language///////////////////////////
exports.viewGenlangbyid = function(req, res) {

  Genlanguage.findOne({language_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
          
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};
////////////////////////////////////delete Language////////////////////////////////////////////

exports.delGenlang = function(req, res) {

  
  Genlanguage.deleteOne({language_id:req.body.id}).exec(function (err, data) {
             if (err) throw err;
        
				 res.json({
                    data: 1,
                  
                });	
				
			
				});

};


exports.delcheckedgenlang = function(req, res) {

  Genlanguage.deleteMany({language_id:{'$in': req.body.id}}).exec(function (err, data) {
             if (err) throw err;
        res.json({
                    status: 1,
              });	
				
			
				});
};


////////////////////////////////////////////////////////////////////////////////////////////////
exports.editCategory = function(req, res) {

   Category.findOne({cat_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
          
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};

exports.delCategory = function(req, res) {

  
  Category.deleteOne({cat_id:req.body.id}).exec(function (err, data) {
             if (err) throw err;
        
				 res.json({
                    status: 1,
                  
                });	
				
			
				});

};


exports.insCategoryLang = function(req, res) {
var default_lang_schema='Category_'+req.body.catlang;
//custom.fieldexist(default_lang_schema,'cat_id',1);
var exist=Promise.resolve(custom.fieldexist(default_lang_schema,'cat_id',req.body.id));
  //var maxValue=Promise.resolve(custom.maxplus('Category','cat_id'));
 
//var default_lang=req.body.defaultlang;
exist.then(function(value) {
  
  if(value==0){
var default_lang_schema='Category_'+req.body.catlang;
var newTable = mongoose.model(default_lang_schema);

  var Newslug=custom.createslug(req.body.categorylang,req.body.id);

  var newCategory = new newTable();
  newCategory.cat_id = req.body.id;
  newCategory.category = req.body.categorylang;
  newCategory.created = Date.now();
  newCategory.modified = Date.now();
  newCategory.slug = Newslug;
  newCategory.save(function(err) { 
                    if (err) throw err;
            });
      }
    else{
  var default_lang_schema='Category_'+req.body.catlang;
  var newTable = mongoose.model(default_lang_schema);

  var Newslug=custom.createslug(req.body.categorylang,req.body.id);
  newTable.update({cat_id:req.body.id},{
     $set:{"category" : req.body.categorylang,"modified" : Date.now()}
 },function(err) { 
                    if (err) throw err;
            });

    }
 })


  res.json({
        data:1
        });
};