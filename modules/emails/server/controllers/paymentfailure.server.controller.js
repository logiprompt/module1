'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Paymentfailure = mongoose.model('Sys_PaymentFailure'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function (req, res) {

    var failureDetails = req.body;
    console.log(failureDetails);
    Paymentfailure.create(failureDetails, function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(failureDetails);
        }
    });

};


/**
 * List of payment failure
 */
exports.list = function (request, response) {
    
    Paymentfailure.find().exec(function (error, items) {

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


    Paymentfailure.findById(request.query.userId)
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


/**
 * Delete Paymentfailure by ID
 */
exports.delete = function (request, response) {
    var userId = request.query.userId;
    console.log(userId);
    Paymentfailure.findById(userId).exec(function (error, item) {

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
* Update Paymentfailure
*/
exports.update = function (request, response) {
    var reqBody = request.body;
    var userId = reqBody.userId;
    var data;


    Paymentfailure.findById(userId).lean().exec(function (error, data) {
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

            Paymentfailure.update({'_id':userId}, 
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
*Delete Paymentfailure by IDs
*
**/
exports.delCheckedPayment = function (request, response) {

    var arr = request.query.userId;
    console.log(arr);
    Paymentfailure.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};





