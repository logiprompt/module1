'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
 // Newslettertemp = mongoose.model('Newsletter'),
  Newsletter = mongoose.model('Sys_newsletter'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Newsletter
 */
exports.create = function(req, res) {

  var picpath = "";
  var storage = multer.diskStorage({
      destination: function (req, file, callback) {
          callback(null, './public/uploads');
      },
      filename: function (req, file, callback) {
          console.log(file);
          var ext =  file.originalname.substr(file.originalname.length - 3); // => "Tabs1"
          callback(null, file.fieldname + '-' + Date.now() +'.' +  ext); // => "Tabs1");
          picpath = "uploads/" + file.fieldname + '-' + Date.now() + '.' + ext;
      }
  });

  var upload = multer({ storage: storage }).single('imgfile');
/////////////////////////////////////////////////////////////////////////


 var picpath1 = "";
 
// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './public/uploads');
//     },
//     filename: function (req, file, callback) {
//         console.log(file);
//         var ext =  file.originalname.substr(file.originalname.length - 3); // => "Tabs1"
//         callback(null, file.fieldname + '-' + Date.now() +'.' +  ext); // => "Tabs1");
//         picpath1 = "uploads/" + file.fieldname + '-' + Date.now() + '.' + ext;
//     }
// });

// var upload = multer({ storage: storage }).single('imgfile1');




///////////////////////////////////////////////////////////////////////////
  upload(req, res, function (err) {
      var reqBody = req.body;
      console.log(req.body);
      if (err) {
          return res.end("Error uploading file.");
      }
      else {
          reqBody['imgfile'] = picpath;
          reqBody['imgfile1'] = picpath1;
          Newsletter.create(reqBody, function (err) {
              if (err) {
                  return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                  });
              } else {
                  res.jsonp(reqBody);
              }
          });

      }
  });



};

/**
 * Show the current Newsletter
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var newsletter = req.newsletter ? req.newsletter.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  newsletter.isCurrentUserOwner = req.user && newsletter.user && newsletter.user._id.toString() === req.user._id.toString();

  res.jsonp(newsletter);
};

/**
 * Update a Newsletter
 */
exports.update = function(req, res) {
  var newsletter = req.newsletter;

  newsletter = _.extend(newsletter, req.body);

  newsletter.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(newsletter);
    }
  });
};

/**
 * Delete an Newsletter
 */
exports.delete = function(req, res) {
  var newsletter = req.newsletter;

  newsletter.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(newsletter);
    }
  });
};

/**
 * List of Newsletters
 */
exports.listtemp = function (request, response) {
    
  // Newslettertemp.find().exec(function (error, items) {

  //     if (error) {
  //         return response.status(400).send({
  //             message: errorHandler.getErrorMessage(error)
  //         });
  //     } else {

  //         response.jsonp(items);
  //     }
  // });
};
exports.list = function(req, res) {
  Newsletter.find().sort('-created').populate('user', 'displayName').exec(function(err, newsletters) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(newsletters);
    }
  });
};

/**
 * Newsletter middleware
 */
exports.newsletterByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Newsletter is invalid'
    });
  }

  Newsletter.findById(id).populate('user', 'displayName').exec(function (err, newsletter) {
    if (err) {
      return next(err);
    } else if (!newsletter) {
      return res.status(404).send({
        message: 'No Newsletter with that identifier has been found'
      });
    }
    req.newsletter = newsletter;
    next();
  });
};
