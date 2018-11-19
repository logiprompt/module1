'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var BusinesslanguageSchema = new Schema({
  businesslang_id: {
    type: String
  },
  blangcountry: {
    type:[Schema.Types.ObjectId],
     ref: 'Sys_country' 
  },
  
  blanguagename: {
    type:[Schema.Types.ObjectId],
     ref: 'Sys_genlanguage' 
  },
shortname: {
    type: String,
    default:'',
    required: 'Please enter short name'
  },
 localname: {
    type: String,
    default:'',
    required: 'Please enter short name'
  },
  localcountryname: {
    type: String,
    default:'',
    required: 'Please enter domain name'
  },
  flag: {
    type: String,
    default:'',
    required: 'Please enter flag'
  },
  blangsupportrtl: {
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

module.exports=mongoose.model('Sys_Businesslanguage', BusinesslanguageSchema);
