'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var AdminuserrollSchema = new Schema({
  adminuserroll_id: {
    type: Number,
    default: Date.now
  },

  roll: {
    type: String,
    default: '',
    required: 'Please enter user name ',
    trim: true
  },

 userid: {
    type: String,
    default:'',
    required: 'Please enter first name'
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

module.exports=mongoose.model('Sys_adminuserroll', AdminuserrollSchema);
