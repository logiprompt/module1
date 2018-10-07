'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * extrafield Schema
 */
var ExtrafieldSchema = new Schema({
  groupname: {
    type: String,
    default: '',
    required: 'Please fill Product name',
    trim: true
  },
  status :{
	type:Number
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
	 type: Date,
	 default: Date.now
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

mongoose.model('extrafieldGroup', ExtrafieldSchema);
