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
    modified_user: { type: String },
    oLang :{	  
        type: Schema.Types.Mixed, 
        default: {}
      }
    
    }, { minimize: false });

module.exports = mongoose.model('NewsLetter', NewsLetterSchema);
