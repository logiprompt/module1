'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    newsLetter = require('../models/newslettertemplate.server.model.js'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/* add news letter template */
exports.addNewsLetterTemplate = function (req, res, next) {
    newsLetter.create(req.body, function (err, post) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("news letter template added");
        }
    });
}

//get all newsletter templates
exports.getAllNewsLetterTemplates = function (req, res, next) {
    newsLetter.find().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

//get newsletter template details
exports.getNewsLetterTemplateDetails = function (req, res, next) {
    newsLetter.findById(req.params.templateId).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

//update newsletter template details
exports.updateNewsLetterTemplate = function (req, res, next) {
    console.log(req.body)
    newsLetter.findByIdAndUpdate(req.body._id, {
        $set: {
            "modified": Date.now(),
            "status": req.body.status,
            "content": req.body.content,
            "senderEmail": req.body.senderEmail,
            "senderName": req.body.senderName,
            "templateSubject": req.body.templateSubject,
            "templateName": req.body.templateName
        }
    }, function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("newsletter updated");
        }
    })
}
