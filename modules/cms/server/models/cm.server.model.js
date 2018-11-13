'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cm Schema
 */
var CmSchema = new Schema({
  post_title: {
    type: String,
    default: '',
    required: 'Please fill post title',
    trim: true
  },
  post_content:{
	  type: String
  },
  post_type:{
	  type: String
  },
  post_status:{
	  type: String
  },
  post_category:{
	  type: String
  },
  post_metadesc:{
	  type: String
  },
  post_metakey:{
	  type: String
  },
  post_slug:{
	  type: String
  },
  post_urlkey:{
	  type: String
  },
  post_displayinmenu:{
	  type: String  
  },
  post_tags:{
	  type: String
  },
  post_text:{
	  
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updated: {
	    type: Date,
	    default: Date.now
	  },
	  updateduser: {
	    type: Schema.ObjectId,
	    ref: 'User'
	  },
	  OLang: {}
});




var cmsCategorySchema = new Schema({

  category: { type: String, default: '' },
  description: { type: String, default: '' },
  category_url:{ type: String, default: ''},
  menu:{ type: String, default: ''},
  sidebar:{ type: String, default: ''},
  wer:{ type: String, default: ''},
  asd:{ type: String, default: ''},
  status: { type: String, default: '' },
  level: { type: Number },
  isdeleted: { type: Boolean, default: 0 },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  created_user: { type: String, default: 'Admin' },
  modified_user: { type: String, },
  hasChild: { type: Boolean,default: 0  },
  childIDs: { type: [Schema.ObjectId], ref: 'cmscategory' },
  OLang: {}

});

mongoose.model('cmsCategory', cmsCategorySchema);

mongoose.model('Cm', CmSchema);
