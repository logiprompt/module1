'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var ServiceAreaCountrySchema = new Schema({
  
 countries:{
  type: [Schema.Types.ObjectId],
  required: 'Please enter countries',
  ref:'Sys_country'
  },

  servicestatus: {
    type: Number,
    default: 1
  },
 stateoptional: {
    type: Number,
    default: 1
  },
  distoptional: {
    type: Number,
    default: 1
  },
  pinoptional: {
    type: Number,
    default: 1
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
    type: Schema.Types.Mixed, 
    default: {}
  }

}, { minimize: false });

module.exports=mongoose.model('Sys_serviceareacountry', ServiceAreaCountrySchema);
