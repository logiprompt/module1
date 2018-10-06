'use strict';

var validator = require('validator'),
  path = require('path'),
  mongoose = require('mongoose'),
  Category = mongoose.model('Category'),
  Language = mongoose.model('Language'),

  custom=require('./custom'),
  config = require(path.resolve('./config/config'));

  Language.find({}).exec(function (err, data) {

  var tableobj=[];
  for(var i=0;i<data.length;i++) {
  var tbl_name='Category_'+data[i].shortcode; 

  tableobj[i]=tbl_name;
  tbl_name= mongoose.model(tbl_name);
 
  }

});



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
exports.insCategory = function(req, res) {


  // var exist2=Promise.resolve(custom.fieldexist(Category,'category',req.body.category));
  // exist2.then(function(value2) {
  
  //   if(value2==0){
  

  var maxValue=Promise.resolve(custom.maxplus('Category','cat_id'));
 
  maxValue.then(function(value) {
  
    var Newslug=custom.createslug(req.body.category,value);

  var newCategory = new Category(req.body);
  newCategory.cat_id = value;
  newCategory.category = req.body.category;
  newCategory.created = Date.now();
  newCategory.modified = Date.now();
  newCategory.slug = Newslug;
   newCategory.save(function(err) { 
                    if (err) throw err;

            });

var default_lang=req.body.defaultlang;
var default_lang_schema='Category_'+default_lang;
var newTable = mongoose.model(default_lang_schema);
  
var newCategory = new newTable();
  newCategory.cat_id = value;
  newCategory.category = req.body.category;
  newCategory.created = Date.now();
  newCategory.modified = Date.now();
  newCategory.slug = Newslug;
   newCategory.save(function(err) { 
                    if (err) throw err;
            });
    });     

  res.json({
        data:1
        });
};

exports.updateCat = function(req, res) {
  var Newslug=custom.createslug(req.body.category,req.body.id);
 
 Category.update({cat_id:req.body.id},{
     $set:{"category" : req.body.category,"slug":Newslug,"modified" : Date.now(),}
 },function(err) { 
                    if (err) throw err;
            });

  res.json({
       status:1
        });
};

//////////////////////select///////////////////////////////

exports.selectCategory = function(req, res) {

   Category.find({}).exec(function (err, data) {
             if (err) throw err;
         
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};

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