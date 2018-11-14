'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var MemoCreationSchema = new Schema({
 
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
  olang :{	  
  }

});

module.exports=mongoose.model('Sys_MemoCreation', MemoCreationSchema);
