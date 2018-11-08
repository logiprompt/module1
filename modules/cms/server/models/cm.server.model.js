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
  },
  post_type:{
	  type: String
  },
  post_status:{
	  type: String
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
	  }
});

mongoose.model('Cm', CmSchema);
