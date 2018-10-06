'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var GenerallanguageSchema = new Schema({
  language_id: {
    type: Number,
    default: Date.now
  },
  
  language: {
    type: String,
    default: '',
    required: 'Please enter Language  ',
    trim: true
  },
 extension: {
    type: String,
    default:'',
    required: 'Please enter extension'
  },
  
  status: {
    type: String,
    default:'',
   
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

module.exports=mongoose.model('Sys_genlanguage', GenerallanguageSchema);
