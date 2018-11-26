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
  
  state: { type: Schema.Types.ObjectId, ref: 'Sys_state' },
  country: { type: Schema.Types.ObjectId, ref: 'Sys_country' },
  district: { type: Schema.Types.ObjectId, ref: 'Sys_district' },
  
   
  postalcode: {
    type: String,
    default: '',
   required: 'Please enter postalcode',
    trim: true
  },
  
  address: {
    type: String,
    default: '',
    required: 'Please enter address',
    trim: true
  },
  
  lattitude: {
    type: String,
    default: '',
    required: 'Please enter lattitude',
    trim: true
  },

  longitude: {
    type: String,
    default: '',
   required: 'Please enter longitude',
    trim: true
  },
  
  timezone: {
    type: String,
    default: '',
  required: 'Please select timezone',
    trim: true
  },
  
  workingday: {
    type: String,
    default: '',
    required: 'Please select workingday',
    trim: true
  },
  
  weekend: {
    type: Array,
    default: [],
    required: 'Please select Week end days',
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
  timing:{
	  type:Object,
	  
	  },
  oLang :{	  
    type: Schema.Types.Mixed, 
    default: {}
  }

}, { minimize: false });

module.exports=mongoose.model('Sys_MainStore', MainstoreSchema);
