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
  post_id: {
    type: String,
    default: '',
    required: 'Please enter id ',
    trim: true
  },
  post: {
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
  category: {
    type: String,
    default:'',
    required: 'Please select category'
  },
  metatag: {
    type: String,
    default:'',
    required: 'Please enter tag'
  },
  postimg: {
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

mongoose.model('Post', PostSchema);
