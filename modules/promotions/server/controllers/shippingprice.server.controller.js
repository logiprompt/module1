'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    shippingPrice = require('../models/shippingprice.server.model.js'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/* add promotion product price rule*/
exports.addshippingPrice = function (req, res, next) {
    shippingPrice.create(req.body, function (err, post) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("shippingprice added");
        }
    });
}

// get list of all shipping price rules
exports.getShippingPriceList = function (req, res, next) {
    shippingPrice.find().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}


//delete shipping price rule
exports.deleteShippingPrice = function (req, res, next) {
    console.log(req.query.itemId);
    shippingPrice.remove({ _id: req.query.itemId }).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("data deleted");
        }
    })
}

//get shipping price rule details
exports.getShippingPriceDetails = function (req, res, next) {
    shippingPrice.findById(req.params.ruleId).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

//update product price rule
exports.updateShippingPriceRule = function (req, res, next) {
    var data = req.body;
    shippingPrice.findByIdAndUpdate(data._id,{
        $set:{
            'ruleName':data.ruleName,
            'description':data.description,
            'displayIn':data.displayIn,
            'startDate':data.startDate,
            'endDate':data.endDate,
            'values':data.values,
            'conditionsStatus':data.conditionsStatus,
            'stopRuleProcess':data.stopRuleProcess,
            'discountAmount':data.discountAmount,
            'actionApplyTo':data.actionApplyTo,
            'conditions':data.conditions,
            'status':data.status,
            'applyTo':data.applyTo
        }
    }, function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("shipping price updated");
        }
    })
}