'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    AdminMenu = mongoose.model('Sys_adminMenu'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function(req, res) {
    var adminMenuData = req.body;
    AdminMenu.create(adminMenuData,function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(adminMenuData);
        }
    });

};

/**
* Create  Admin submenu 
*/
exports.addSubMenu = function(req, res) {
    var adminMenuData = req.body;
    AdminMenu.save(adminMenuData,function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else { 
            AdminMenu.update({_id:adminMenuData.parentID},{
        $set:{"hasChild" :true}
    },function(err) { 
                       if (err) throw err;
               });

            res.jsonp(adminMenuData);
        }
    });

   



};

/**
 * List of currencies
 */
exports.getList = function(request, response) {
    console.log(68074);
    AdminMenu.find().exec(function(error, items) {

        if (error) {
            return response.status(400).send({
              message: errorHandler.getErrorMessage(error)
            });
          } else {
            console.log(items);
           response.jsonp(items);
          }




            
    });


};

/**
 * Get Extra field group by ID
 */

exports.getById = function(request, response) {
    AdminMenu.findById(request.params.groupId)
    .lean()
    .exec(function(error, items) {
        if (error) {
            console.log(error);
            response.status(500).send(error);
            return;
        }
        response.json(items);
    });
};




