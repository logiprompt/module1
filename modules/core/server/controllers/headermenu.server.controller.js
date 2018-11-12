'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    custom=require('./custom'),
    Headermenu = mongoose.model('Sys_adminMenu'),
    Genlang = mongoose.model('Sys_genlanguage'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));




/**
 * List of currencies
 */
exports.getTopMenuList = function(request, response) {
    //console.log(68074);
    Headermenu.find().exec(function(error, items) {

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



