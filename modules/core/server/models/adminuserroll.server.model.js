'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var AdminUserRoleSchema = new Schema({

  accessList: {
    type: String,
    default: '',
    required: 'Please enter role name ',
    trim: true
  },
  userId: {
    type: String,
    default: ''
  },
  alt: {
    type: String
  },
  createdDateTime: {
    type: Date,
    default: Date.now
  },

  modifiedDateTime: {
    type: Date,
    default: Date.now
  },

  createdUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  modifiedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});

module.exports = mongoose.model('Sys_adminUserRole', AdminUserRoleSchema);
