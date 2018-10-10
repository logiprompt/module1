'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var AdminMenuSchema = new Schema({
  
  menu: {
    type: String,
    default: '',
    required: 'Please enter menu name',
    trim: true
  },
  parentID: {
    type: String,
    default: ''
  },
 description: {
    type: String,
    default:'',
    required: 'Please enter description '
  },
  alt: {
    type: String,
    default:'',
    required: 'Please enter alt '
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
  level:{
    type: Number, min: 0, max: 5
  },
  
  hasChild: {
    type: Boolean
  },
  childIDs:{
      type:[]
  },
  OLang:{}

});

module.exports=mongoose.model('Sys_adminMenu', AdminMenuSchema);
