'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    cmsreviewsubmission = mongoose.model('Sys_CmsreviewSubmission'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function (req, res) {

    var cmsreviewsubmissionDetails = req.body;
    console.log(cmsreviewsubmissionDetails);
    cmsreviewsubmission.create(cmsreviewsubmissionDetails, function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(cmsreviewsubmissionDetails);
        }
    });

};


/**
 * List of cmsreviewsubmission
 */
exports.list = function (request, response) {
    
    cmsreviewsubmission.find().exec(function (error, items) {

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


    cmsreviewsubmission.findById(request.query.userId)
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
 * Delete shipmentcreation by ID
 */
exports.delete = function (request, response) {
    var userId = request.query.userId;
    console.log(userId);
    cmsreviewsubmission.findById(userId).exec(function (error, item) {

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
* Update cmsreviewsubmission
*/
exports.update = function (request, response) {
    var reqBody = request.body;
    var userId = reqBody.userId;
    var data;


    cmsreviewsubmission.findById(userId).lean().exec(function (error, data) {
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

            cmsreviewsubmission.update({'_id':userId}, 
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
*Delete CmsreviewSubmission by IDs
*
**/
exports.delCheckedCmsreviewSubmission = function (request, response) {

    var arr = request.query.userId;
    console.log(arr);
    cmsreviewsubmission.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};





