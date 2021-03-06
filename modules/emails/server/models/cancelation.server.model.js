'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var CancelationSchema = new Schema({
 
  name: {
    type: String,
    default: '',
    required: 'Please enter name',
    trim: true
  },
 subject: {
    type: String,
    default:'',
    required: 'Please enter subject '
  },
  content: {
    type: String,
    default:'',
    required: 'Please enter content '
  },
  custom: {
    type: String,
    default:'',
    required: 'Please enter custom styles '
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
  oLang :{	  
    type: Schema.Types.Mixed, 
    default: {}
  }

}, { minimize: false });

module.exports=mongoose.model('Sys_cancelation', CancelationSchema);
