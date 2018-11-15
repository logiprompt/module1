'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    productCategory = require('../models/productcategory.server.model.js'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/* add new category */
exports.addCategory = function (req, res, next) {
    productCategory.create(req.body, function (err, post) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("category added");
        }
    });
}

/* add sub category */
exports.addSubCategory = function (req, res, next) {
    productCategory.create(req.body, function (err, post) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            productCategory.update({ _id: req.body.parentId }, { $set: { hasChild: true }, $push: { childIDs: post._id } }, function (err, post) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json("Subcategory updated");
                }
            })
        }
    });
}

/* delete a category */
exports.deleteCategory = function (req, res, next) {
    productCategory.find({ _id: req.params.categoryId }).select('childIDs').exec(function (err, data) {
        var ids = data[0].childIDs;
        ids.push(req.params.categoryId)
        productCategory.update({ _id: { $in: ids } }, { $set: { isdeleted: true } }, { multi: true }, function (err, post) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json("category updated");
            }
        });
    })

}

/* get all category items */
exports.getCategoryItems = function (req, res, next) {
    productCategory.find({ level: '1', isdeleted: false }).populate('childIDs').populate({ 'path': 'extrafieldGroup', 'model': 'extrafieldGroup' }).sort('-created').exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

/* get category details */
exports.getCategoryDetails = function (req, res, next) {
    productCategory.findById(req.params.categoryId).populate({ 'path': 'extrafieldGroup', model: 'extrafieldGroup' }).populate({ path: 'childIDs', model: 'productcategory', populate: { path: 'extrafieldGroup', model: 'extrafieldGroup' } }).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

/* update category details */
exports.updateCategory = function (req, res, next) {
    productCategory.findByIdAndUpdate(req.body._id, {
        $set: {
            "modified": Date.now(),
            "category": req.body.category,
            "description": req.body.description,
            "status": req.body.status,
            "extrafieldGroup": req.body.extrafieldGroup
        }
    }, function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("category updated");
        }
    })
}