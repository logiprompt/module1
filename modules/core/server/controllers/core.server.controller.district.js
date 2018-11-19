'use strict';

var validator = require('validator'),
  path = require('path'),
  mongoose = require('mongoose'),
  State = mongoose.model('Sys_state'),
  District = mongoose.model('Sys_district'),
  

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


/////////////////////////////////change Country///////////////////////////
exports.changecountry = function(req, res) {

  State.find({country: req.body.id}).exec(function (err, data) {
             if (err) throw err;
          
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};


//////////////////////insert District///////////////////////////////

exports.insDistrict= function(req, res) {
  var district=req.body.district;
  // console.log(country);
   var upper = district.replace(/^\w/, function (chr) {
     return chr.toUpperCase();
   });
  var exist2=Promise.resolve(custom.fieldexist3('Sys_district','country',req.body.country,'state',req.body.state,'district',upper));
  exist2.then(function(value2) {
    console.log(value2);
    if(value2==0){

  var maxValue=Promise.resolve(custom.maxplus('Sys_district','_id'));
 
  maxValue.then(function(value) {
  
    //var Newslug=custom.createslug(req.body.category,value);

  var newDistrict = new District(req.body);
 
  
  newDistrict.country = req.body.country;
  newDistrict.state = req.body.state;
  newDistrict.district = upper;
  newDistrict.status = req.body.status;
  newDistrict.created = Date.now();
  newDistrict.modified = Date.now();
  newDistrict.created_user=req.body.username;
  newDistrict.modified_user=req.body.username;
  newDistrict.created_ip=req.body.ip;
  newDistrict.modified_ip=req.body.ip;
  
  newDistrict.save(function(err) { 
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
///////////////////////////update district///////////////////////////////////
exports.updDistrict = function(req, res) {
  //var Newslug=custom.createslug(req.body.category,req.body.id);
 
  District.update({_id:req.body.id},{
     $set:{"country" : req.body.country,"state":req.body.state,"district":req.body.district,"status":req.body.status,"modified" : Date.now(),"modified_user":req.body.username,"modified_ip":req.body.ip}
 },function(err) { 
                    if (err) throw err;
            });

  res.json({
       data:1
        });
};

//////////////////////select District///////////////////////////////

exports.selectDistrict = function(req, res) {

  District.find().populate({ path: 'country', select: 'country' }).populate({ path: 'state', select: 'state' }).exec(function (err, data) {
    if (err) throw err;

res.json({
           status: true,
           data:data
       }); 


});


};
/////////////////////////////////Edit District///////////////////////////
exports.viewDistrictbyid = function(req, res) {

  District.findOne({_id: req.body.id}).exec(function (err, data) {
             if (err) throw err;
          
				 res.json({
                    status: true,
                    data:data
                });	
				
			
				});

};
////////////////////////////////////delete District////////////////////////////////////////////

exports.delDistrict = function(req, res) {

  
  District.deleteOne({_id:req.body.id}).exec(function (err, data) {
             if (err) throw err;
        
				 res.json({
                    data: 1,
                  
                });	
				
			
				});

};


exports.delcheckeddistrict = function(req, res) {

  District.deleteMany({_id:{'$in': req.body.id}}).exec(function (err, data) {
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