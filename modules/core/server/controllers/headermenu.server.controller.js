'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    custom=require('./custom'),
    Headermenu = mongoose.model('Sys_adminMenu'),
    Adminuser = mongoose.model('Sys_adminuser'),
    Genlang = mongoose.model('Sys_genlanguage'),
    Role = mongoose.model('Sys_roleprivilege'),
    Acl = mongoose.model('Sys_acl'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));




/**
 * List of currencies
 */
exports.getTopMenuList = function(request, response) {
    console.log(request);
   
    Acl.find({userID:request.query.role})
    .populate({ path: 'menuIDs', model: 'Sys_adminMenu' ,
    populate: { path: 'menuIDs', model: 'Sys_adminMenu' }})
   
    .exec(function (err, data) {
        
      
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
           // console.log(data);
 
            response.json(data);
        }
    });


};




/**
 * Get acl by ID
 */

exports.getTopSubMenuList = function(request, response) {
   
    Headermenu.find({'parentID':{$ne: null}}).exec(function(error, items) {

        if (error) {
            return response.status(400).send({
              message: errorHandler.getErrorMessage(error)
            });
          } else {
            //console.log(items);
           response.jsonp(items);
          }
            
    });
};



