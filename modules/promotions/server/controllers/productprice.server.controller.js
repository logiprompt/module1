'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
multer = require('multer'),
    productPrice = require('../models/productprice.server.model.js'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/* add promotion product price rule*/
exports.addProductPrice = function (req, res, next) {

  


    var picpath = "";
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads');
        },
        filename: function (req, file, callback) {
            console.log(file);
            var ext =  file.originalname.substr(file.originalname.length - 3); // => "Tabs1"
            callback(null, file.fieldname + '-' + Date.now() +'.' +  ext); // => "Tabs1");
            picpath = "uploads/" + file.fieldname + '-' + Date.now() + '.' + ext;
        }
    });
    
    var upload = multer({ storage: storage }).single('image');
   
    upload(req, res, function (err) {
        var reqBody = req.body;
        console.log(req.body);
        if (err) {
            return res.end("Error uploading file.");
        }
        else {
            reqBody['image'] = picpath;
            productPrice.create(reqBody, function (err, post) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp("category added");
                    return
                }
            });

        }
    });









   
}

// get list of all product price rules
exports.getProductPriceList = function (req, res, next) {
    productPrice.find().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

//get particular product price rule
exports.getProductPriceDetails = function (req, res, next) {
    productPrice.findById(req.params.ruleId).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

//delete product price rule
exports.deleteProductPrice = function (req, res, next) {
    productPrice.remove({ _id: req.params.itemId }).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("data deleted");
        }
    })
}

//update product price rule
exports.updateProductPrice = function (req, res, next) {
    var data = req.body;
    productPrice.findByIdAndUpdate(data._id,{
        $set:{
            'ruleName':data.ruleName,
            'description':data.description,
            'displayIn':data.displayIn,
            'startDate':data.startDate,
            'endDate':data.endDate,
            'category':data.category,
            'product':data.product,
            'stopRuleProcess':data.stopRuleProcess,
            'discountAmount':data.discountAmount,
            'actionApplyTo':data.actionApplyTo,
            'conditions':data.conditions,
            'status':data.status
        }
    }, function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("product price updated");
        }
    })
}