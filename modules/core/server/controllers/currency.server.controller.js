'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Currency = mongoose.model('Sys_currency'),
	custom=require('./custom'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

	  /**
	 * Create a Extrafield Group
	 */
	exports.create = function(req, res) {
		console.log(req.body)
		

		var exist2=Promise.resolve(custom.fieldexist('Sys_currency','currency',req.body.currency));
		exist2.then(function(value2) {
			if(value2==0){
	
		var maxValue=Promise.resolve(custom.maxplus('Sys_currency','currency_id'));
	 
		maxValue.then(function(value) {
		
			//var Newslug=custom.createslug(req.body.category,value);
	
			var currency = new Currency(req.body);
			currency.currency_id = value;

		currency.currency = req.body.currency;
		currency.shortname = req.body.shortname;
		currency.symbol = req.body.symbol;
		currency.status = req.body.status;
		currency.created = Date.now();
		currency.modified = Date.now();
		currency.created_user=req.body.username;
		currency.modified_user=req.body.username;
		currency.created_ip=req.body.ip;
		currency.modified_ip=req.body.ip;
		
	
	  currency.save(function(err) {
	    if (err) {
	      return res.status(400).send({
	        message: errorHandler.getErrorMessage(err)
	      });
	    } else {
	      res.jsonp(currency);
	    }
	  });
			});     
	
		res.json({
					data:0
					});
		}
		else
	{
		 res.json({
					data:1
					});
	}
	})
	 ;
	
	};

	/**
	 * List of currencies
	 */
	exports.list = function(request, response) {
		//console.log(req.body);
		//console.log(req.body);
		
		Currency.find().exec(function (error, items) {
	
			        if (error) {
			  		  console.log(error);
			          response.status(500).send(error);
			          return;
			        }
			        response.json(items);
			      });
		
	
	};
	
	
	/**
	 * Get currency by ID
	 */

	exports.getById = function(request, response) {
	
		Currency.findById(request.params.currencyId).exec(function (error, items) {
	
	        if (error) {
	  		  console.log(error);
	          response.status(500).send(error);
	          return;
	        }
	        response.json(items);
	      });
	};
	
	/*
	 * Update currency
	 */
	exports.updateCurrency= function(request, response){
		var currencyId = request.params.currencyId;

		Currency.findById(request.params.currencyId).exec(function (error, item) {
			  if (error) {
			        response.status(500).send(error);
			        return;
			      }
			  
			  if (item) {
				  	item.currency = request.body.currency;
			        item.shortname = request.body.shortname;
			        item.symbol = request.body.symbol;
			        item.status = request.body.status;
			        item.save();

			        response.json(item);
			        return;
			      }

		  })
	}
	
	
	/**
	 * Delete currency by ID
	 */
	exports.delete = function(request, response) {
		  var currencyId = request.params.currencyId;

			Currency.findById(request.params.currencyId).exec(function (error, item) {
		      
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
		            'message': 'Currency was removed.'
		          });
		        });
		      } else {
		        response.status(404).json({
		          message: 'Currency with id ' + currencyId + ' was not found.'
		        });
		      }
		    });
		};

		/** 
		*Delete currency by IDs
		*
		**/
		exports.delCheckedCurrency = function(request, response) {
		
			var arr = request.params.currencyId.split(',');
			console.log(arr);
			Currency.deleteMany({_id:{'$in':arr}}).exec(function (err, data) {
								 if (err) throw err;
								 response.json({
												status: 1,
									});	
						
					
						});


		};



