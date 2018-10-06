'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var LanguageSchema = new Schema({
  lang_id: {
    type: Number,
    default: Date.now
  },
  country: {
    type: String,
    default: '',
    required: 'Please select country',
    trim: true
  },
  language: {
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
  supportrtl: {
    type: String,
    default:'',
    
  },
  status: {
    type: String,
    default:'',
   
  },
  lang_id: {
    type: Number,
    default:'',
    required: 'Please enter id'
  },
  langimg: {
    type: String,
    default:''
  },
  defaultlang: {
    type: String,
    default:'0'
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

module.exports=mongoose.model('Language', LanguageSchema);
