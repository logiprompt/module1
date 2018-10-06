'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var PincodeSchema = new Schema({
  pincode_id: {
    type: Number,
    default: Date.now
  },
  state: {
    type: String,
    default: '',
    required: 'Please enter state name',
    trim: true
  },
 country: {
    type: String,
    default:'',
    required: 'Please select country'
  },
  district: {
    type: String,
    default:'',
    required: 'Please select country'
  },
  pincode: {
    type: String,
    default:'',
    required: 'Please fill pincode'
  },
  status: {
    type: Number,
    default: '',
    required: 'Please select  status',
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

module.exports=mongoose.model('Sys_pincode', PincodeSchema);
