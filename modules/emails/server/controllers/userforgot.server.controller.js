'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Userforgot = mongoose.model('Sys_UserForgot'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function (req, res) {

    var userDetails = req.body;
    console.log(userDetails);

   
    Userforgot.create(userDetails, function (err) {
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
exports.list = function (request, response) {
    
    Userforgot.find().exec(function (error, items) {

        if (error) {
            return response.status(400).send({
                message: errorHandler.getErrorMessage(error)
            });
        } else {

            response.jsonp(items);
        }
    });
};

exports.reads = function (request, response) {
    console.log(request);


    Userforgot.findById(request.query.userId)
        .lean()
        .exec(function (error, items) {
            if (error) {
                console.log(error);
                response.status(500).send(error);
                return;
            }
            else {
                response.jsonp(items);
            }
        });

};

// /**
//  * Get User by ID
//  */

exports.userByIDs = function (request, response) {
    console.log(request);
    console.log(90909090909090)
    Userforgot.findById(request.params.userId)
        .lean()
        .exec(function (error, items) {
            if (error) {
                console.log(error);
                response.status(500).send(error);
                return;
            }
            response.jsonp(items);
        });
};

/**
 * Delete currency by ID
 */
exports.delete = function (request, response) {
    var userId = request.query.userId;
    console.log(userId);
    Userforgot.findById(userId).exec(function (error, item) {

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
exports.update = function (request, response) {
    var reqBody = request.body;
    var userId = reqBody.userId;
    var data;


    Userforgot.findById(userId).lean().exec(function (error, data) {
          
        if (error) {
            response.status(500).send(error);
            return;
        } else {
          
            if (reqBody.isDefaultLang) {
                data.name = reqBody.name;
                data.subject = reqBody.subject;
                data.content = reqBody.content;
                data.custom = reqBody.custom;
                data.status = reqBody.status;
            } 
            
             else {
               
                 var obj = {};
                 obj.name = reqBody.name;
                 obj.subject = reqBody.subject;
                 obj.content = reqBody.content;
                 obj.custom = reqBody.custom;
                
                data['oLang'][reqBody.userSelectedLang] = obj;
                 
             }
        
            Userforgot.update({'_id':userId}, 
                {$set:data} ).exec(function (error, output) {
                if (error) {
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
exports.delCheckedUser = function (request, response) {

    var arr = request.query.userId;
    console.log(arr);
    Userforgot.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};





