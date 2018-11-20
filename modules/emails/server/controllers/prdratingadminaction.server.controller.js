'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    prdRatingAdminAction = mongoose.model('Sys_PrdRatingAdminAction'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function(req, res)
{
  var userDetails = req.body; 
   prdRatingAdminAction.create(userDetails,function(err)
  {
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
    console.log(919191919191919);
     prdRatingAdminAction.find().exec(function(error, items) 
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
   prdRatingAdminAction.findById(request.query.userId)
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
     prdRatingAdminAction.findById(request.params.userId)
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
        // console.log(userId);
          prdRatingAdminAction.findById(userId).exec(function (error, item) {
            
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
    exports.update= function(request, response)
    {
        //console.log(request)
        var reqBody = request.body;
        var userId = reqBody.userId;
        var data;

        //console.log(userId);

         prdRatingAdminAction.findById(userId).exec(function (error, data) 
        {
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
    
                 prdRatingAdminAction.update({'_id':userId}, 
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

      exports.delCheckedprdRatingAdminAction = function(request, response) 
      {      
          var arr = request.query.userId;
         // console.log(arr);
           prdRatingAdminAction.deleteMany({_id:{'$in':arr}}).exec(function (err, data) {
                               if (err) throw err;
                               response.json({
                                              status: 1,
                                  });	
                      
                  
                      });


      };





