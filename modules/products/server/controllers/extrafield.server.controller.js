'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Extrafield = mongoose.model('extrafieldGroup'),
  Field = mongoose.model('extrafield'),
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

	/*
	 * Create Extra field
	 */
	
	exports.createField = function(req, res){
		console.log(req.body)
		  var extrafield = new Field(req.body);
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
	}
	/**
	 * List of Extrafield group
	 */
	exports.list = function(request, response) {
		//console.log(req.body);
		//console.log(req.body);
		
		Extrafield.find().exec(function (error, items) {
	
			        if (error) {
			  		  console.log(error);
			          response.status(500).send(error);
			          return;
			        }
			        response.json(items);
			      });
		
	
	};
	
	/*
	 * List extra fields 
	 */
	exports.listField = function(request, response) {
		//console.log(req.body);
		//console.log(req.body);
		
		Field.find({'groupid':request.params.groupId}).exec(function (error, items) {
	
			  if (error) {
				  console.log(error);
			      response.status(500).send(error);
			      return;
			    }
			    response.json(items);
			});
	}
	/**
	 * Get Extra field group by ID
	 */

	exports.getById = function(request, response) {
	
		Extrafield.findById(request.params.groupId).exec(function (error, items) {
	
	        if (error) {
	  		  console.log(error);
	          response.status(500).send(error);
	          return;
	        }
	        response.json(items);
	      });
	};
	
	/*
	 * Update Extrafield Group
	 */
	exports.updateExtrafieldGroup = function(request, response){
		var groupId = request.params.groupId;

		  Extrafield.findById(request.params.groupId).exec(function (error, item) {
			  if (error) {
			        response.status(500).send(error);
			        return;
			      }
			  
			  if (item) {
				  	item.groupname = request.body.groupname;
			        item.description = request.body.status;
			        
			        item.save();

			        response.json(item);
			        return;
			      }

		  })
	}
	
	
	/**
	 * Delete Extra field group by ID
	 */
	exports.delete = function(request, response) {
		  var groupId = request.params.groupId;

			  Extrafield.findById(request.params.groupId).exec(function (error, item) {
		      
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
		            'message': 'Extrafield group was removed.'
		          });
		        });
		      } else {
		        response.status(404).json({
		          message: 'Extrafield with id ' + groupId + ' was not found.'
		        });
		      }
		    });
		};


		/*
		 * Delete Extra field
		 */
		exports.deletefield = function(request, response) {
			var groupId = request.params.fieldId;

			  Field.findById(request.params.fieldId).exec(function (error, item) {
		      
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
		            'message': 'Extrafield was removed.'
		          });
		        });
		      } else {
		        response.status(404).json({
		          message: 'Extrafield with id ' + fieldId + ' was not found.'
		        });
		      }
		    });
		}

