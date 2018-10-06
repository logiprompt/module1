'use strict';

/**
 * Module dependencies.
 */

 
 
var Language = require('./language.server.model'),
mongoose = require('mongoose'),
 Language1 = mongoose.model('Language'),
  
  Schema = mongoose.Schema;
 
 //config = require(path.resolve('./config/config'));
/**
 * Newpost Schema
 */

var CategorySchema = new Schema({
  category: {
    type: String,
    default: '',
    required: 'Please fill Category name',
    trim: true
  },
  cat_id: {
    type: Number,
    default: Date.now
  },
  slug: {
    type: String,
    default:'',
    required: 'Please enter slug'
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
  created_ip: {
    type: String,
   
  },
  modified_ip: {
    type: String,
   
  }
});


mongoose.model('Category', CategorySchema);
var tableobj=[];
   Language1.find({}).exec(function (err, data) {
  for(var i=0;i<data.length;i++) {
     var tbl_name='Category_'+data[i].shortcode; 
    tableobj[i]=tbl_name;
    //tableobj[i]='Category_'+data[i].shortcode;
    mongoose.model(tbl_name, CategorySchema);
  }

});

 

//mongoose.model('Category', CategorySchema);


