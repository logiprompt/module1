'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var AclSchema = new Schema({
  userID:{
    type: Schema.Types.ObjectId,
    ref:'Sys_roleprivilege'

  }, 
 menuIDs:{
  type: [Schema.Types.ObjectId],
  required: 'Please enter menu ',
  ref:'Sys_adminmenu'
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

module.exports=mongoose.model('Sys_acl', AclSchema);
