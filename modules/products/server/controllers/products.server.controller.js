'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');



/**
 * Create a Product
 */
exports.create = function(req, res) {
	
	console.log(req.body);
	console.log(req.files);
	console.log(req.file)
  var product = new Product(req.body);
  product.user = req.user;
  product.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};


/*
 * Product List by ID
 */
exports.listById = function(request, response){
	Product.findById(request.params.productId).exec(function (error, items) {
		
        if (error) {
  		  console.log(error);
          response.status(500).send(error);
          return;
        }
        response.json(items);
      });
	
}

/*
 * Product Update by Id
 */

exports.updateProducts = function(request, response){
	Product.findById(request.params.productId).exec(function (error, item) {
		  if (error) {
		        response.status(500).send(error);
		        return;
		      }
		  
		  if (item) {
			  	//item = request.body;
			  	console.log(item);
		       // item.description = request.body.status;
			  	item.product_name = request.body.product_name;
			  	item.product_sku = request.body.product_sku;
			  	item.product_type = request.body.product_type;
			  	item.product_shortdec = request.body.product_shortdec;
			  	item.product_desc = request.body.product_desc;
			  	item.product_weight = request.body.product_weight;
			  	item.product_fromdate = request.body.product_fromdate;
				item.product_enddate = request.body.product_enddate;
				item.product_featured = request.body.product_featured;
				item.product_status = request.body.product_status;
				item.product_category = request.body.product_category;
				item.product_metadesc = request.body.product_metadesc;
				item.product_metakey = request.body.product_metakey;
				item.product_slug = request.body.product_slug;
				item.product_urlkey = request.body.product_urlkey;
				item.product_displayinmenu = request.body.product_displayinmenu;
				item.product_price = request.body.product_price;
				item.product_specialprice =	request.body.product_specialprice;
				item.product_splpricestartdate = request.body.product_splpricestartdate;
				item.product_splpriceenddate = request.body.product_splpriceenddate;
				item.product_groupqty = request.body.product_groupqty;
				item.product_groupprice = request.body.product_groupprice;
				item.product_qty = request.body.product_qty;
				item.product_qtyoutofstockstatus = request.body.product_qtyoutofstockstatus;
				item.product_qtyoutofstockstatus_def=request.body.product_qtyoutofstockstatus_def;
				item.product_minqtyallowed = request.body.product_minqtyallowed;
				item.product_minqtyallowed_def = request.body.product_minqtyallowed_def;
				item.product_maxqtyallowed = request.body.product_maxqtyallowed;
				item.product_maxqtyallowed_def = request.body.product_maxqtyallowed_def;
				item.product_notifylowqty = request.body.product_notifylowqty;
				item.product_notifylowqty_def = request.body.product_notifylowqty_def;
				item.product_stockavailable = request.body.product_stockavailable;
				item.product_extrafield = request.body.product_extrafield;
				item.product_images = request.body.product_images;
				item.product_tags = request.body.product_tags;
				item.product_taxablestatus = request.body.product_taxablestatus;
				item.product_taxgroup = request.body.product_taxgroup;
				item.product_cst = request.body.product_cst;
				item.product_cst_def = request.body.product_cst_def;
				item.product_abc = request.body.product_abc;
				item.product_abc_def = request.body.product_abc_def;
				item.product_freeshipping = request.body.product_freeshipping;
				item.oLang = request.body.oLang;
		       
				item.save();

		        response.json(item);
		        return;
		      }

	  })
}

/**
 * Show the current Product
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var product = req.product ? req.product.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  product.isCurrentUserOwner = req.user && product.user && product.user._id.toString() === req.user._id.toString();

  res.jsonp(product);
};

/**
 * Update a Product
 */
exports.update = function(req, res) {
  var product = req.product;

  product = _.extend(product, req.body);

  product.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(product);
    }
  });
};

/**
 * Delete an Product
 */
exports.deleteproduct = function(req, response) {
  /*var product = req.product;

  product.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(product);
    }
  });*/
	var productId = req.params.productId;

	Product.findById(productId).exec(function (error, item) {
    
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
          'message': 'Product was removed.'
        });
        
      });
    } else {
      response.status(404).json({
        message: 'Product with id ' + productId + ' was not found.'
      });
    }
  });
};

/**
 * List of Products
 */
exports.list = function(req, res) {
  Product.find().sort('-created').populate('user', 'displayName').exec(function(err, products) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(products);
    }
  });
};

/**
 * Product middleware
 */
exports.productByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is invalid'
    });
  }

  Product.findById(id).populate('user', 'displayName').exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No Product with that identifier has been found'
      });
    }
    req.product = product;
    next();
  });
};
