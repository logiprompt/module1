'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Subscription = mongoose.model('Sys_sucessfullsubscription'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Subscription 
*/
exports.create = function(req, res) {
    var sub = req.body;
    Subscription.create(sub,function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(Subscription);
        }
    });

};



/**
 * List of users
 */
exports.list = function(request, response) {
   
    Subscription.find().exec(function(error, items) {

        if (error) {
            return response.status(400).send({
              message: errorHandler.getErrorMessage(error)
            });
          } else {
           
           response.jsonp(items);
          }




            
    });


};
exports.read = function(req, res) {



};
/**
 * Get User by ID
 */

exports.subByID = function(request, response) {
    Subscription.findById(request.query.userId)
    .lean()
    .exec(function(error, items) {
        if (error) {
            console.log(error);
            response.status(500).send(error);
            return;
        }
       
        response.jsonp(items);
      
    });
};

	/**
	 * Delete Subscription
	 */
	exports.delete = function(request, response) {
        var userId = request.query.userId;
         console.log(userId);
        Subscription.findById(userId).exec(function (error, item) {
            
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
                  'message': 'data was removed.'
                });
              });
            } else {
              response.status(404).json({
                message: 'data with id ' + userId + ' was not found.'
              });
            }
          });
      };

      	/*
	 * Update currency
	 */
	exports.updateSub= function(request, response){
        var reqBody = request.body;
        var userId = reqBody.userId;
        

		Subscription.findById(userId).exec(function (error, data) {
            if (error) 
            {
               response.status(500).send(error);
               return;
            }
          
            if (data) 
            {
              if (reqBody.isDefaultLang) 
              { 
                  data.name = reqBody.name;
                  data.subject = reqBody.subject;
                  data.content = reqBody.content;
                  data.custom = reqBody.custom;
                  data.status = reqBody.status;
              }

              else 
              {
                  var obj = {};
                  obj.name = reqBody.name;
                  obj.subject = reqBody.subject;
                  obj.content = reqBody.content;
                  obj.custom = reqBody.custom;
                  data['oLang'][reqBody.userSelectedLang] = obj;
              }
             
              Subscription.update({'_id':userId}, 
                  {$set:data} ).exec(function (error, output) {
                  if (error)
                  {
                      response.status(500).send(error);
                      return;
                  }
                  response.json(output);
                  return;    
              })
          }

          })
        }
	

      /** 
      *Delete currency by IDs
      *
      **/
      exports.delcheckeditem = function(request, response) {
      
          //var arr = request.query.userId.split(',');
          var arr = request.query.userId;
          //console.log(arr);
          Subscription.deleteMany({_id:{'$in':arr}}).exec(function (err, data) {
                               if (err) throw err;
                               response.json({
                                              status: 1,
                                  });	
                      
                  
                      });


      };





