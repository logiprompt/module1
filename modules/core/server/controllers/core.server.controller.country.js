'use strict';

var validator = require('validator'),
  path = require('path'),
  mongoose = require('mongoose'),
  Country = mongoose.model('Sys_country'),
  

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

//////////////////////insert country///////////////////////////////

exports.insCountry= function(req, res) {
  var country=req.body.countryname;
  // console.log(country);
   var upper = country.replace(/^\w/, function (chr) {
     return chr.toUpperCase();
   });
   //console.log(upper);
  var exist2=Promise.resolve(custom.fieldexist('Sys_country','country',upper));
  exist2.then(function(value2) {
    if(value2==0){

  var maxValue=Promise.resolve(custom.maxplus('Sys_country','_id'));
 
  maxValue.then(function(value) {
  
    //var Newslug=custom.createslug(req.body.category,value);
    
  var newCountry = new Country(req.body);

  newCountry.country =upper;
  newCountry.shortcode = req.body.shortname;
  newCountry.countrystatus = req.body.status;
  newCountry.created = Date.now();
  newCountry.modified = Date.now();
  newCountry.created_user=req.body.username;
  newCountry.modified_user=req.body.username;
  newCountry.created_ip=req.body.ip;
  newCountry.modified_ip=req.body.ip;
  newCountry.save(function(err) { 
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

///////////////////////////update Country///////////////////////////////////
exports.updateCountry = function(req, res) {
  //var Newslug=custom.createslug(req.body.category,req.body.id);
  var country=req.body.country;
  //console.log(country);
  var upper = country.replace(/^\w/, function (chr) {
    return chr.toUpperCase();
  });
  //console.log(upper);
  var exist2=Promise.resolve(custom.fieldexist('Sys_country','country',upper));
  exist2.then(function(value2) {
    if(value2==0){

  Country.update({_id:req.body.id},{
     $set:{"country" : upper,"shortcode":req.body.shortcode,"countrystatus":req.body.status,"modified" : Date.now(),"modified_user":req.body.username,"modified_ip":req.body.ip}
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

//////////////////////select Country///////////////////////////////
exports.selectCountry = function(req, res) {
Country.find({}).exec(function (err, data) {
             if (err) throw err;        
				 res.json({
                    status: true,
                    data:data
                });				
				});
};
/////////////////////////////////View Country///////////////////////////
exports.viewCountryid = function(req, res) {

  Country.findOne({_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
          
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};
////////////////////////////////////delete Country////////////////////////////////////////////

exports.delCountry = function(req, res) {

 var exist2=Promise.resolve(custom.fieldexist('Sys_state','country',req.body.id));
 exist2.then(function(value2) {
  // console.log(value2);
  if(value2==0){
  Country.deleteOne({_id:req.body.id}).exec(function (err, data) {
             if (err) throw err;
        
				 res.json({
                    data:0,
                  
                });	
				
			
        });
      }
      else{
      res.json({
        data:1
        });
      }
    })

};



exports.delcheckedcountry = function(req, res) {

  Country.deleteMany({_id:{'$in': req.body.id}}).exec(function (err, data) {
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