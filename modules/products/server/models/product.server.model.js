'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
product_name: {
    type: String/*,
default: '',
required: 'Please fill Product name',
trim: true*/
  },
  product_sku: {
	    type: String,
	    
 },
  product_type:{
	  type: String
  },
  product_shortdec:{
	  type: String
  },
  product_desc:{
	  type: String
  },
  product_weight:{
	  type: String
  },
  product_fromdate:{
	  type: Date
  },
  product_enddate:{
	  type: Date
  },
  product_featured:{
	  type: String
  },
  product_status:{
	  type: String
  },
  product_category:{
	  type: Array
  },
  product_metadesc:{
	  type: String
  },
  product_metakey:{
	  type: String
  },
  product_slug:{
	  type: String
  },
  product_urlkey:{
	  type: String
  },
  product_displayinmenu:{
	  type: String
  },
  product_price:{
	  type: String
  },
  product_specialprice:{
	  type: String
  },
  product_splpricestartdate:{
	  type: String
  },
  product_splpriceenddate:{
	  type: String
  },
  product_groupqty:{
	  type: String
  },
  product_groupprice:{
	  type: String
  },
  product_qty:{
	  type: String
  },
  product_qtyoutofstockstatus:{
	  type: String
  },
  product_qtyoutofstockstatus_def:{
	  type: String
  },
  product_minqtyallowed:{
	  type: String
  },
  product_minqtyallowed_def:{
	  type: String
  },
  product_maxqtyallowed:{
	  type: String 
  },
  product_maxqtyallowed_def:{
	  type: String
  },
  product_notifylowqty:{
	  type: String
  },
  product_notifylowqty_def:{
	  type: String
  },
  product_stockavailable:{
	  type: String 
  },
  product_extrafield:{
	  
  },
  product_images:{
	  
  },
 product_tags : {
	 type: String 
 },
product_taxablestatus : {
	 type: String 
},
product_taxgroup : {
	 type: String 
},
product_cst : {
	 type: String 
},
product_cst_def: {
	 type: String 
},
product_abc: {
	 type: String 
},
product_abc_def : {
	 type: String 
},
product_freeshipping : {
	 type: String 
},
  oLang :{	  
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdUser: {
	 type: String,
	    ref: 'User'
  },
  updatedUser: {
	  type: String,
	  ref: 'User'
  }
});

mongoose.model('Product', ProductSchema);
