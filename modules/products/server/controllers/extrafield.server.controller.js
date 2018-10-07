'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Extrafield = mongoose.model('extrafieldGroup'),
  
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

  /**
 * Create a Extrafield Group
 */
exports.create = function(req, res) {
  console.log(req.body)
  var extrafield = new Extrafield(req.body);
  extrafield.user = req.user;

  extrafield.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(extrafield);
    }
  });
};

/**
 * List of Extrafield group
 */
exports.list = function(request, response) {
	//console.log(req.body);
	//console.log(req.body);
	
	Extrafield.find({"groupname":"Electronics"}).exec(function (error, items) {
		  console.log(items);
		        if (error) {
		  		  console.log(error);
		          response.status(500).send(error);
		          return;
		        }
		        response.json(items);
		      });
	
	
	//console.log(Extrafield);
	//var extrafield = new Extrafield(req.body);
 /* Extrafield.find().sort('-created').populate('user', 'displayName').exec(function(err, extrafield) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(extreafield);
    }
  }); */
};


