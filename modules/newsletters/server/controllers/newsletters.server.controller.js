'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Newsletter = mongoose.model('Newsletter'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Newsletter
 */
exports.create = function(req, res) {
  var newsletter = new Newsletter(req.body);
  newsletter.user = req.user;

  newsletter.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(newsletter);
    }
  });
};

/**
 * Show the current Newsletter
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var newsletter = req.newsletter ? req.newsletter.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  newsletter.isCurrentUserOwner = req.user && newsletter.user && newsletter.user._id.toString() === req.user._id.toString();

  res.jsonp(newsletter);
};

/**
 * Update a Newsletter
 */
exports.update = function(req, res) {
  var newsletter = req.newsletter;

  newsletter = _.extend(newsletter, req.body);

  newsletter.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(newsletter);
    }
  });
};

/**
 * Delete an Newsletter
 */
exports.delete = function(req, res) {
  var newsletter = req.newsletter;

  newsletter.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(newsletter);
    }
  });
};

/**
 * List of Newsletters
 */
exports.list = function(req, res) {
  Newsletter.find().sort('-created').populate('user', 'displayName').exec(function(err, newsletters) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(newsletters);
    }
  });
};

/**
 * Newsletter middleware
 */
exports.newsletterByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Newsletter is invalid'
    });
  }

  Newsletter.findById(id).populate('user', 'displayName').exec(function (err, newsletter) {
    if (err) {
      return next(err);
    } else if (!newsletter) {
      return res.status(404).send({
        message: 'No Newsletter with that identifier has been found'
      });
    }
    req.newsletter = newsletter;
    next();
  });
};
