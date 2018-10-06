'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
 
  
  Schema = mongoose.Schema;
 
 //config = require(path.resolve('./config/config'));
/**
 * Newpost Schema
 */

var RoleSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Role name',

    trim: true
  },
  rolestatus: {
    type: Number,
    default: '',
    required: 'Please fill Role status',
    trim: true
  },
  role_id: {
    type: Number,
    default: Date.now
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


mongoose.model('Sys_roleprivilege', RoleSchema);

 

//mongoose.model('Category', CategorySchema);


