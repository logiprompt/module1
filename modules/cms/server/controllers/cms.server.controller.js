'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Cm = mongoose.model('Cm'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Cm
 */
exports.create = function(req, res) {
  var cm = new Cm(req.body);
  cm.user = req.user;

  cm.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cm);
    }
  });
};

/**
 * Show the current Cm
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var cm = req.cm ? req.cm.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  cm.isCurrentUserOwner = req.user && cm.user && cm.user._id.toString() === req.user._id.toString();

  res.jsonp(cm);
};

/**
 * Update a Cm
 */
exports.update = function(req, res) {
  var cm = req.cm;

  cm = _.extend(cm, req.body);

  cm.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cm);
    }
  });
};

/**
 * Delete an Cm
 */
exports.delete = function(req, res) {
  var cm = req.cm;

  cm.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cm);
    }
  });
};

/**
 * List of Cms
 */
exports.list = function(req, res) {
  Cm.find().sort('-created').populate('user', 'displayName').exec(function(err, cms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cms);
    }
  });
};

/**
 * Cm middleware
 */
exports.cmByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cm is invalid'
    });
  }

  Cm.findById(id).populate('user', 'displayName').exec(function (err, cm) {
    if (err) {
      return next(err);
    } else if (!cm) {
      return res.status(404).send({
        message: 'No Cm with that identifier has been found'
      });
    }
    req.cm = cm;
    next();
  });
};
