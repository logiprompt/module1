'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Cancelation = mongoose.model('Sys_cancelation'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function(req, res)
{
  var userDetails = req.body; 
    Cancelation.create(userDetails,function(err) {
        if (err)
        {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else
        {
            res.jsonp(userDetails);
        }
    });
};

/**
 * List of users
 */
exports.list = function(request, response) 
{
    
    Cancelation.find().exec(function(error, items) 
    {
        if (error) 
        { 
            return response.status(400).send({
              message: errorHandler.getErrorMessage(error)
            });
        } 
        else 
        {           
           response.jsonp(items);
        } 
    });
};

exports.reads= function(request, response) 
{ 
  Cancelation.findById(request.query.userId)
    .lean()
    .exec(function(error, items) 
    {
        if (error) 
        {
            console.log(error);
            response.status(500).send(error);
            return;
        }
        else{
        response.jsonp(items);
        }
    });

};

// /**
//  * Get User by ID
//  */

exports.userByIDs = function(request, response) 
{
    // console.log(request);
    // console.log(90909090909090)
    Cancelation.findById(request.params.userId)
    .lean()
    .exec(function(error, items) {
        if (error) {
            //console.log(error);
            response.status(500).send(error);
            return;
        }
        response.jsonp(items);
    });
};

	/**
	 * Delete currency by ID
	 */
	exports.delete = function(request, response) {
        var userId = request.query.userId;
         console.log(userId);
         Cancelation.findById(userId).exec(function (error, item) {
            
            if (error) {
              response.status(500).send(error);
              return;
            }

            if (item) {
              item.remove(function (error) {

                if (error) {
                  response.status(500).send(error);
                  return;
                }

                response.status(200).json({
                  'message': 'Item was removed.'
                });
              });
            } else {
              response.status(404).json({
                message: 'Item with id ' + userId + ' was not found.'
              });
            }
          });
      };
  	/*
	 * Update currency
	 */
	exports.update= function(request, response){
        // console.log(request)
             var userId = request.body.userId;
           //  console.log(userId);
     
             Cancelation.findById(userId).exec(function (error, item) {
                   if (error) {
                         response.status(500).send(error);
                         return;
                       }
                   
                   if (item) {
                           item.name = request.body.name;
                         item.subject = request.body.subject;
                         item.content = request.body.content;
                         item.custom = request.body.custom;
                         item.status = request.body.status;
                         item.save();
                         //console.log(item);
                         response.json(item);
                         return;
                       }
     
               })
         }
         
	

      /** 
      *Delete currency by IDs
      *
      **/

      exports.delCheckedCancelation = function(request, response) 
      {      
          var arr = request.query.userId;
         // console.log(arr);
          Cancelation.deleteMany({_id:{'$in':arr}}).exec(function (err, data) {
                               if (err) throw err;
                               response.json({
                                              status: 1,
                                  });	
                      
                  
                      });


      };





