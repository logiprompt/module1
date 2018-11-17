'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var BusinessTypeSchema = new Schema({
 
  businessTypeName: {
    type: String,
    default: '',
    required: 'Please enter business name',
    trim: true
  },
 subTypeName: {
    type: String,
    default:'',
   // required: 'Please enter sub type name'
  },
  image: {
    type: String,
    default:'',
   // required: 'Please enter image'
  },
  description: {
    type: String,
    default:'',
    required: 'Please enter description'
  },
  slug: {
    type: String,
    default: '',
    required: 'Please enter  slug',
  },
  URLkey: {
    type: String,
    default: '',
    required: 'Please enter  URL key',
  },
  menuLink: {
    type: String,
    default: '',
    required: 'Please select menu Link',
  },
  displaySelectedIn: {
    type: Object,
    default: '',
    required: 'Please select display Selected In',
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

module.exports=mongoose.model('Sys_BusinessType', BusinessTypeSchema);
