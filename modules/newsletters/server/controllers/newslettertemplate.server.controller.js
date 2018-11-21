'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    newsLetter = require('../models/newslettertemplate.server.model.js'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/* add news letter template */
exports.addNewsLetterTemplate = function (req, res, next) {
    var userDetails = req.body;
    newsLetter.create(userDetails, function (err, post) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(userDetails);
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
/**
 * Delete delNewsTempbyid by ID
 */
exports.delcheckednewstemp = function(request, response) {
      
    //var arr = request.query.userId.split(',');
    var arr = request.query.userId;
    //console.log(arr);
    newsLetter.deleteMany({_id:{'$in':arr}}).exec(function (err, data) {
                         if (err) throw err;
                         response.json({
                                        status: 1,
                            });	
                
            
                });


}
exports.delNewsTempbyid = function (request, response) {
    var userId = request.body.userId;
    console.log(userId);
    newsLetter.findById(userId).exec(function (error, item) {

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
exports.updateNewsLetterTemplate = function (req, response, next) {
    console.log(req.body)
    // newsLetter.findByIdAndUpdate(req.body._id, {
    //     $set: {
    //         "modified": Date.now(),
    //         "status": req.body.status,
    //         "content": req.body.content,
    //         "senderEmail": req.body.senderEmail,
    //         "senderName": req.body.senderName,
    //         "templateSubject": req.body.templateSubject,
    //         "templateName": req.body.templateName
    //     }
    // }, function (err, data) {
    //     if (err) {
    //         return res.status(400).send({
    //             message: errorHandler.getErrorMessage(err)
    //         });
    //     } else {
    //         res.json("newsletter updated");
    //     }
    // })



    var reqBody = req.body;
    var userId = reqBody.userId;
    var data;


    newsLetter.findByIdAndUpdate(userId).lean().exec(function (error, data) {
          
        if (error) {
            response.status(500).send(error);
            return;
        } else {
          
            if (reqBody.isDefaultLang) {
                data.templateName = reqBody.templateName;
                data.templateSubject = reqBody.templateSubject;
                data.senderName = reqBody.senderName;
                data.senderEmail = reqBody.senderEmail;
                data.content=reqBody.content;
                data.status = reqBody.status;
            } 
            
             else {
               
                 var obj = {};
                 obj.templateName = reqBody.templateName;
                 obj.templateSubject = reqBody.templateSubject;
                 obj.senderName = reqBody.senderName;
                 obj.senderEmail = reqBody.senderEmail;
                 obj.content=reqBody.content;
                 data['oLang'][reqBody.userSelectedLang] = obj;
                 
             }
        
             newsLetter.update({'_id':userId}, 
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
