'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var PostSchema = new Schema({
  page_id: {
    type: Number,
    default: '',
    required: 'Please enter id',
    trim: true
  },
  pagename: {
    type: String,
    default: '',
    required: 'Please enter Page title ',
    trim: true
  },
  description: {
    type: String,
    default:'',
    required: 'Please enter description'
  },
  metatag: {
    type: String,
    default:'',
    required: 'Please enter tag'
  },
  slug: {
    type: String,
    default:'',
    required: 'Please enter slug'
  },
  pageimg: {
    type: String,
    default:''
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

mongoose.model('Page', PostSchema);
