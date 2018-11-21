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
            var ext = file.originalname.substr(file.originalname.length - 3); // => "Tabs1"
            callback(null, file.fieldname + '-' + Date.now() + '.' + ext); // => "Tabs1");
            picpath = "uploads/" + file.fieldname + '-' + Date.now() + '.' + ext;
        }
    });

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, function (err) {
        var reqBody = req.body;
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
                }
                else {
                    return res.jsonp("category added");
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

exports.delChecked = function (request, response) {

    var arr = request.query.itemId;
    //console.log(arr);
    productPrice.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};

//update product price rule
exports.updateProductPrice = function (req, res, next) {

   
    var reqBody = req.body;
    var userId = reqBody.id;
    var data;
console.log(123456789);

   // console.log(data);

    var picpath = "";
    var today = Date.now();
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads');
        },
        filename: function (req, file, callback) {

            callback(null, file.fieldname + '-' + today + '.png');
            picpath = "/uploads/" + file.fieldname + '-' + today + '.png';

        }
    });
    var upload = multer({ storage: storage }).single('file');
    console.log(68776988798);
    upload(req, res, function (err) {

        productPrice.findById(userId).exec(function (error, data) {

        if (err) {
            return res.end("Error uploading file.");
        }
        else {

            if (reqBody.isDefaultLang) 
            {
                    data.ruleName = reqBody.ruleName,
                    data.description = reqBody.description
            }

            else 
            {
                var obj = {};
                obj.ruleName = reqBody.ruleName;
                obj.description = reqBody.description;

                data['oLang'][reqBody.userSelectedLang] = obj;
            }

            if (picpath == '') 
            {
                    data.displayIn = reqBody.displayIn,
                    data.startDate = reqBody.startDate,
                    data.endDate = reqBody.endDate,
                    data.category = reqBody.category,
                    data.product = reqBody.product,
                    data.stopRuleProcess = reqBody.stopRuleProcess,
                    data.discountAmount = reqBody.discountAmount,
                    data.applyTo = reqBody.applyTo,
                    data.actionApplyTo = reqBody.actionApplyTo,
                    data.conditions = reqBody.conditions,
                    data.status = reqBody.status
               
            }
            else
            {
                data.displayIn = reqBody.displayIn,
                data.startDate = reqBody.startDate,
                data.endDate = reqBody.endDate,
                data.category = reqBody.category,
                data.product = reqBody.product,
                data.stopRuleProcess = reqBody.stopRuleProcess,
                data.applyTo = reqBody.applyTo,
                data.discountAmount = reqBody.discountAmount,
                data.actionApplyTo = reqBody.actionApplyTo,
                data.conditions = reqBody.conditions,
                data.image = picpath,
                data.status = reqBody.status
            }
console.log(data);
            productPrice.update({ '_id': userId },
                { $set: data }).exec(function (error, output) {
                    if (error) {
                        res.status(500).send(error);
                        return;
                    }
                    res.json(output);
                    return;


                })





        }

    })

        // res.json({
        //     data: 199
        // });
    });


    // var data = req.body;
    // productPrice.findByIdAndUpdate(data._id,{
    //     $set:{
    //         'ruleName':data.ruleName,
    //         'description':data.description,
    //         'displayIn':data.displayIn,
    //         'startDate':data.startDate,
    //         'endDate':data.endDate,
    //         'category':data.category,
    //         'product':data.product,
    //         'stopRuleProcess':data.stopRuleProcess,
    //         'discountAmount':data.discountAmount,
    //         'actionApplyTo':data.actionApplyTo,
    //         'conditions':data.conditions,
    //         'status':data.status
    //     }
    // }, function (err, data) {
    //     if (err) {
    //         return res.status(400).send({
    //             message: errorHandler.getErrorMessage(err)
    //         });
    //     } else {
    //         res.json("product price updated");
    //     }
    // })



}