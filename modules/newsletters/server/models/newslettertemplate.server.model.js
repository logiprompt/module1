'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var NewsLetterSchema = new Schema({

    templateName: { type: String, default: '' },
    templateSubject: { type: String, default: '' },
    senderName: { type: String, default: '' },
    senderEmail: { type: String, default: '' },
    content: { type: String, default: '' },
    status: { type: String, default: '' },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    created_user: { type: String, default: 'Admin' },
    modified_user: { type: String, },
    OLang: {}
});

module.exports = mongoose.model('NewsLetter', NewsLetterSchema);
