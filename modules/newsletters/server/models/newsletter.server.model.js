'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newsletter Schema
 */
var NewsletterSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Newsletter name',
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

mongoose.model('Newsletter', NewsletterSchema);
