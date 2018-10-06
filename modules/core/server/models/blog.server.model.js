'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var BlogSchema = new Schema({
  blog_id: {
    type: Number,
    default: Date.now
  },
  blog: {
    type: String,
    default: '',
    required: 'Please enter Post title ',
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
  blogimg: {
    type: String,
    default:''
  },
  slug: {
    type: String,
    default:'',
    required: 'Please enter slug'
  },
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  },created_user: {
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

mongoose.model('Blog', BlogSchema);
