'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newsletter Schema
 */
var NewslettersSchema = new Schema({
 
  
  temp: {
    type: Schema.Types.ObjectId,
   ref: 'newsletter'
  },
  title: { type: String, default: '' },
  subject: { type: String, default: '' },
  sender: { type: String, default: '' },
  senderemail: { type: String, default: '' },
  contentdesc: { type: String, default: '' },
  imgfile: { type: String, default: '' },
  imgfile1: { type: String, default: '' },
  status: { type: String, default: '' },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  created_user: { type: String, default: 'Admin' },
  modified_user: { type: String },
  oLang :{	  
      type: Schema.Types.Mixed, 
      default: {}
    }
  
  }, { minimize: false });

  module.exports = mongoose.model('Sys_newsletter', NewslettersSchema);
