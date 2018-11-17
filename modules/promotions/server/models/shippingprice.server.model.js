'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var ShippingPriceSchema = new Schema({
    ruleName: { type: String, default: '' },
    description: { type: String, default: '' },
    displayIn: { type: [String], default: '' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now },
    status: { type: String },
    applyTo: { type: String, },
    conditions: { type: String },
    values: { type: [String], default: '' },
    conditionsStatus: { type: String },
    actionApplyTo: { type: String },
    discountAmount: { type: String },
    stopRuleProcess: { type: String },
    OLang: {}
});

module.exports = mongoose.model('ShippingPrice', ShippingPriceSchema);
