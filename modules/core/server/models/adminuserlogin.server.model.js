'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var AdminuserloginSchema = new Schema({
  adminuserlog_id: {
    type: Number,
    default: Date.now
  },

  cadminpass: {
    type: String,
    default: '',
    required: 'Please enter user name ',
    trim: true
  },

 password: {
    type: String,
    default:'',
    required: 'Please enter first name'
  },

  cpassword: {
    type: String,
    default:'',
    required: 'Please enter last name'
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

module.exports=mongoose.model('Sys_adminuserlogin', AdminuserloginSchema);
