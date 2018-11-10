'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Userreg = mongoose.model('Sys_user'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function(req, res) {
    var userDetails = req.body;
    Userreg.create(userDetails,function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(userDetails);
        }
    });

};



/**
 * List of users
 */
exports.list = function(request, response) {
   
    Userreg.find().exec(function(error, items) {

        if (error) {
            return response.status(400).send({
              message: errorHandler.getErrorMessage(error)
            });
          } else {
           
           response.jsonp(items);
          }




            
    });


};
exports.read = function(req, res) {};
/**
 * Get User by ID
 */

exports.userByID = function(request, response) {
    Userreg.findById(request.params.userId)
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

	/**
	 * Delete currency by ID
	 */
	exports.delete = function(request, response) {
        var userId = request.query.userId;
         console.log(userId);
        Userreg.findById(userId).exec(function (error, item) {
            
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
                  'message': 'User was removed.'
                });
              });
            } else {
              response.status(404).json({
                message: 'User with id ' + userId + ' was not found.'
              });
            }
          });
      };

      	/*
	 * Update currency
	 */
	exports.updateUser= function(request, response){
        var userId = request.body.userId;
        
		Userreg.findById(userId).exec(function (error, item) {
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
                
			        response.json(item);
			        return;
			      }

		  })
	}
	

      /** 
      *Delete currency by IDs
      *
      **/
      exports.delCheckedUser = function(request, response) {
      
          //var arr = request.query.userId.split(',');
          var arr = request.query.userId;
          //console.log(arr);
          Userreg.deleteMany({_id:{'$in':arr}}).exec(function (err, data) {
                               if (err) throw err;
                               response.json({
                                              status: 1,
                                  });	
                      
                  
                      });


      };





