'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var MainstoreSchema = new Schema({
 
  name: {
    type: String,
    default: '',
    required: 'Please enter name',
    trim: true
  },
 contactperson: {
    type: String,
    default:'',
    required: 'Please enter contactperson '
  },
  email: {
    type: String,
    default:'',
    required: 'Please enter content '
  },
  telephone: {
    type: String,
    default:'',
    required: 'Please enter custom styles '
  },
  
  mobile: {
    type: String,
    default: '',
    required: 'Please enter  mobile',
    trim: true
  },
  
  fax: {
    type: String,
    default: '',
    required: 'Please enter  fax',
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
  oLang :{	  
    type:Object,
    default:{}
  }

});

module.exports=mongoose.model('Sys_MainStore', MainstoreSchema);
