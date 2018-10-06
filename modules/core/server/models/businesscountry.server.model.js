'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var BusinesscountrySchema = new Schema({
  business_id: {
    type: Number,
    default: Date.now
  },
  country: {
    type: String,
    default: '',
    required: 'Please enter country name ',
    trim: true
  },
 shortname: {
    type: String,
    default:'',
    required: 'Please enter short name'
  },
  domain: {
    type: String,
    default:'',
    required: 'Please enter domain name'
  },
  flag: {
    type: String,
    default:'',
    required: 'Please enter flag'
  },
  status: {
    type: Number,
    default: '',
    required: 'Please fill  status',
    trim: true
  },
  setupdb: {
    type: Boolean,
    default: '',
    required: 'Please fill  setup',
    trim: true
  },
  migrate: {
    type: Boolean,
    default: '',
    required: 'Please fill  migrate',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  },
  created_user: {
    type: String,
   
  },
  modified_user: {
    type: String,
   
  },
  created_ip: {
    type: String,
   
  },
  modified_ip: {
    type: String,
   
  }

});

module.exports=mongoose.model('Sys_businesscountry', BusinesscountrySchema);
