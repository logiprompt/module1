'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var TaxGroupSchema = new Schema({
 
  TaxGroupname: {
    type: String,
    default: '',
    required: 'Please enter taxgroup name',
    trim: true
  },
  status: {
    type: Number,
    default: '',
    required: 'Please select  status',
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
  // oLang :{	  
  //   type: Schema.Types.Mixed, 
  //   default: {}
  // }

}, { minimize: false });

module.exports=mongoose.model('Sys_TaxGroup', TaxGroupSchema);
