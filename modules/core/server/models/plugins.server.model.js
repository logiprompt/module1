'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var PluginSchema = new Schema({
  plugin_id: {
    type: Number,
    default: '',
    required: 'Please enter id ',
    trim: true
  },
  title: {
    type: String,
    default: '',
    required: 'Please enter Plugin title ',
    trim: true
  },
   pluginfile: {
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

mongoose.model('Plugin', PluginSchema);
