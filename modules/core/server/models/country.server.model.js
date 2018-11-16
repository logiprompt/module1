'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var CountrySchema = new Schema({
 
  country: {
    type: String,
    default: '',
    required: 'Please enter Post title ',
    trim: true
  },
 shortcode: {
    type: String,
    default:'',
    required: 'Please enter tag'
  },
  countrystatus: {
    type: Number,
    default: '',
    required: 'Please fill Role status',
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

module.exports=mongoose.model('Sys_country', CountrySchema);
