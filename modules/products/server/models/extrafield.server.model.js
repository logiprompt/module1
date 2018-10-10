'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * extrafield grup Schema
 */
var ExtrafieldGroupSchema = new Schema({
  groupname: {
    type: String,
    default: '',
    required: 'Please fill group name',
    trim: true
  },
  status :{
	type:Number
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
	 type: Date,
	 default: Date.now
  },
  createdUser: {
    type: String,
    ref: 'User'
  },
  updatedUser: {
    type: String,
    ref: 'User'
  }
});


/**
 * extrafield Schema
 */
var ExtrafieldSchema = new Schema({
  groupid: {
    type: String,
    required: 'Please select group',
  },
  status :{
	type:Number
  },
  name :{
	type: String
  },
  label :{
	type: String
  },
  size :{
	type: String
  },
  classname :{
	type: String
  },
  style :{
	type: String  
  },
  defvalue :{
	type: String 
  },
  type:{
	type: String  
  },
  FEvisibility:{
	  type: String    
  },
  position:{
	  type: String  	  
  },
  required:{
	  type: String  	  
  },
  cols:{
	  type:String
  },
  rows:{
	  type:String
  },
  values:{
	  
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
	 type: Date,
	 default: Date.now
  },
  createdUser: {
    type: String,
    ref: 'User'
  },
  updatedUser: {
    type: String,
    ref: 'User'
  }
});
mongoose.model('extrafieldGroup', ExtrafieldGroupSchema);
mongoose.model('extrafield', ExtrafieldSchema);