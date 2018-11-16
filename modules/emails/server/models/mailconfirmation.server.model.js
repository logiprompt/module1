'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var mailconfirmationSchema = new Schema({
 
  mailer: {
    type: String,
    default: '',
    required: 'Please enter mailer',
    trim: true
  },
 smtpauthen: {
    type: Boolean,
    default:'',
    required: 'Please enter smtp authentication'
  },
  smtpsecur: {
    type: String,
    default:'',
    required: 'Please enter content '
  },
  smtpport: {
    type: String,
    default:'',
    required: 'Please enter smtp port '
  },
  smtppass: {
    type: String,
    default: '',
    required: 'Please select smtp password'
  },
  smtpuname: {
    type: String,
    default: '',
    required: 'Please select smtp username'
  },
  smtphost: {
    type: String,
    default: '',
    required: 'Please select smtp host'
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

module.exports=mongoose.model('Sys_MailConfirmation', mailconfirmationSchema);
