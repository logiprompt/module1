'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var AdminuserSchema = new Schema({
  adminuser_id: {
    type: Number,
    default: Date.now
  },

  uname: {
    type: String,
    default: '',
    required: 'Please enter user name ',
    trim: true
  },

 fname: {
    type: String,
    default:'',
    required: 'Please enter first name'
  },

  lname: {
    type: String,
    default:'',
    required: 'Please enter last name'
  },
  email: {
    type: String,
    default:'',
    required: 'Please enter email'
  },
  profileimage: {
    type: String,
    default:'',
    required: 'Please enter flag'
  },

  status: {
    type: Number,
    default: '',
    required: 'Please fill  status',
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

  created_ip: {
    type: String,
  },

  modified_ip: {
    type: String, 
  }

});

module.exports=mongoose.model('Sys_adminuser', AdminuserSchema);
