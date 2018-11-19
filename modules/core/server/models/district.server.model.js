'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var DistrictSchema = new Schema({
 
  state: [{ type: Schema.Types.ObjectId, ref: 'Sys_state' }],
  country: [{ type: Schema.Types.ObjectId, ref: 'Sys_country' }],
  district: {
    type: String,
    default:'',
    required: 'Please select country'
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

module.exports=mongoose.model('Sys_district', DistrictSchema);
