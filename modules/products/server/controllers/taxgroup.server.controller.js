'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Taxgroup = mongoose.model('Sys_TaxGroup'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function (req, res) {

    var Details = req.body;
    console.log(Details);
    Taxgroup.create(Details, function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(Details);
        }
    });

};


/**
 * List of order comments
 */
exports.list = function (request, response) {
    
    Taxgroup.find().exec(function (error, items) {

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
  
    Taxgroup.findById(request.query.userId)
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

//exports.userByIDs = function (request, response) {
//    console.log(request);
//    console.log(90909090909090)
//    Userforgot.findById(request.params.userId)
//        .lean()
//        .exec(function (error, items) {
//            if (error) {
//                console.log(error);
//                response.status(500).send(error);
//                return;
//            }
//            response.jsonp(items);
//        });
//};

/**
 * Delete ordercomments by ID
 */
exports.delete = function (request, response) {
    var userId = request.query.userId;
    console.log(userId);
    Taxgroup.findById(userId).exec(function (error, item) {

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
* Update Ordercomments
*/
exports.update = function (request, response) {
    var reqBody = request.body;
    var userId = reqBody.id;
    var data;
    

    Taxgroup.findById(userId).lean().exec(function (error, data) {
        if (error) {
            response.status(500).send(error);
            return;
        } else {
            if (reqBody.isDefaultLang) {
                data.TaxGroupname = reqBody.TaxGroupname;
                data.status = reqBody.status;
            }
            else {
                var obj = {};
                obj.TaxGroupname = reqBody.TaxGroupname;
                data['oLang'][reqBody.userSelectedLang] = obj;
            }

            Taxgroup.update({'_id':userId}, 
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
*Delete Ordercomments by IDs
*
**/
exports.delCheckedOrderComments = function (request, response) {

    var arr = request.query.userId;
    console.log(arr);
    Taxgroup.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};





