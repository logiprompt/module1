'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var ProductPriceSchema = new Schema({

  ruleName: { type: String, default: '' },
  description: { type: String, default: '' },
  displayIn: { type: [String], default: '' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },
  status: { type: String },
  applyTo: { type: String, },
  image: {type: String,default:''},
  category: { type: [] },
  product: { type: [] },
  conditions: { type: String },
  actionApplyTo: { type: String },
  discountAmount: { type: String },
  stopRuleProcess: { type: String },
  oLang: { type: Schema.Types.Mixed,default: {}}

}, { minimize: false });

module.exports = mongoose.model('Sys_productPrice', ProductPriceSchema);
