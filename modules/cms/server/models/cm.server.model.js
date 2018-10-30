'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cm Schema
 */
var CmSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Cm name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Cm', CmSchema);
