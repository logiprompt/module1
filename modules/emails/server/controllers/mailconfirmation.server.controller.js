'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    mailConfirmation = mongoose.model('Sys_MailConfirmation'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function (req, res) {

    var mailConfirmationDetails = req.body;
    console.log(mailConfirmationDetails);
    mailConfirmation.create(mailConfirmationDetails, function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(mailConfirmationDetails);
        }
    });

};


/**
 * List of mailConfirmation
 */
exports.list = function (request, response) {

    mailConfirmation.find().exec(function (error, items) {

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


    mailConfirmation.findById(request.query.userId)
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
    mailConfirmation.findById(userId).exec(function (error, item) {

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
* Update mailConfirmation
*/
exports.update = function (request, response) {
    var reqBody = request.body;
    var userId = reqBody.userId;
    var data;

    mailConfirmation.findById(userId).lean().exec(function (error, data) {
        if (error) {
            response.status(500).send(error);
            return;
        }
        else {
            data.mailer = reqBody.mailer;
            data.smtpauthen = reqBody.smtpauthen;
            data.smtpsecur = reqBody.smtpsecur;
            data.smtpport = reqBody.smtpport;
            data.smtppass = reqBody.smtppass;

            data.smtpuname = reqBody.smtpuname;
            data.smtphost = reqBody.smtphost;


            mailConfirmation.update({ '_id': userId },
                { $set: data }).exec(function (error, output) {
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
*Delete mailConfirmation by IDs
*
**/

exports.delCheckedMailConfirmation = function (request, response) {
    var arr = request.query.userId;
    console.log(arr);
    mailConfirmation.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};





