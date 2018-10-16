'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var ProductCategorySchema = new Schema({

  category: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, default: '' },
  level: { type: Number },
  isdeleted: { type: Boolean, default: 0 },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  created_user: { type: String, default: 'Admin' },
  modified_user: { type: String, },
  hasChild: { type: Boolean,default: 0  },
  childIDs: { type: [Schema.ObjectId] },
  OLang: {}

});

module.exports = mongoose.model('productcategory', ProductCategorySchema);
