'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  Cm = mongoose.model('Cm'),
  cmsCategory = mongoose.model('cmsCategory'),
  cmsPage = mongoose.model('cmsPage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Cm
 */
exports.create = function(req, res) {
  var cm = new Cm(req.body);
  cm.user = req.user;

  cm.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cm);
    }
  });
};

/*
 * Get post by id
 */
exports.getpostById = function(req, res){
  var id = req.params.id;
Cm.findById(id).exec(function (error, items) {
    
        if (error) {
        console.log(error);
          res.status(500).send(error);
          return;
        }
        res.json(items);
      });
}
/*
 * Updatepost by Id
 */
exports.updatepostById = function(req, res){
  var id = req.params.id;
  Cm.findById(id).exec(function (error, item) {
      
          if (error) {
          console.log(error);
            res.status(500).send(error);
            return;
          }
         // item = req.body;
          item.post_title = req.body.post_title;
            item.post_content = req.body.post_content;
            item.post_type = req.body.post_type;
            item.post_status = req.body.post_status;
            item.post_category = req.body.post_category;
            item.post_metadesc = req.body.post_metadesc;
            item.post_metakey = req.body.post_metakey;
            item.post_slug = req.body.post_slug;
            item.post_urlkey = req.body.post_urlkey;
            item.post_displayinmenu = req.body.post_displayinmenu;
            item.post_tags = req.body.post_tags;
            item.post_text = req.body.post_text;
            item.oLang = req.body.oLang;
          item.save();

          res.json(item);
          return;
        });
  }

exports.deletepost = function(req, res){
  var id = req.params.id;

  Cm.findById(id).exec(function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        // var cm = item;

         item.remove(function(err) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              res.jsonp(item);
            }
          });
        
      }
      });
}
/**
 * Show the current Cm
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var cm = req.cm ? req.cm.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  cm.isCurrentUserOwner = req.user && cm.user && cm.user._id.toString() === req.user._id.toString();

  res.jsonp(cm);
};

/**
 * Update a Cm
 */
exports.update = function(req, res) {
  var cm = req.cm;

  cm = _.extend(cm, req.body);

  cm.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cm);
    }
  });
};

/**
 * Delete an Cm
 */
exports.delete = function(req, res) {
  var cm = req.cm;

  cm.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cm);
    }
  });
};

/**
 * List of Cms
 */
exports.list = function(req, res) {
  Cm.find().sort('-created').populate('user', 'displayName').exec(function(err, cms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cms);
    }
  });
};

/**
 * Cm middleware
 */
exports.cmByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cm is invalid'
    });
  }

  Cm.findById(id).populate('user', 'displayName').exec(function (err, cm) {
    if (err) {
      return next(err);
    } else if (!cm) {
      return res.status(404).send({
        message: 'No Cm with that identifier has been found'
      });
    }
    req.cm = cm;
    next();
  });
};





















/* add new category */
exports.addCategory = function (req, res, next) {
    console.log(req.body)

    var today = Date.now();
    var picpath = "";
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads');
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.substr(file.originalname.length - 3); // => "Tabs1"
            callback(null, file.fieldname + '-' + today + '.' + ext); // => "Tabs1");
            picpath = "uploads/" + file.fieldname + '-' + today + '.' + ext;
        }
    });

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, function (err) {
        var reqBody = req.body;
        if (err) {
            return res.end("Error uploading file.");
        }
        else {
        reqBody['image'] = picpath;

    cmsCategory.create(reqBody, function (err, post) {
       

        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
           
            res.json("category added");
        }
    });
}
    });
}

/* add sub category */
exports.addSubCategory = function (req, res, next) {

    var today = Date.now();
    var picpath = "";
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads');
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.substr(file.originalname.length - 3); // => "Tabs1"
            callback(null, file.fieldname + '-' + today + '.' + ext); // => "Tabs1");
            picpath = "uploads/" + file.fieldname + '-' + today + '.' + ext;
        }
    });

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, function (err) {
        var reqBody = req.body;
        if (err) {
            return res.end("Error uploading file.");
        }
        else {
        reqBody['image'] = picpath;

    cmsCategory.create(reqBody, function (err, post) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            cmsCategory.update({ _id: reqBody.parentId }, { $set: { hasChild: true }, $push: { childIDs: post._id } }, function (err, post) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json("Subcategory updated");
                }
            })
        }
    });

}
    });

}

/* delete a category */
exports.deleteCategory = function (req, res, next) {
    cmsCategory.find({ _id: req.params.categoryId }).select('childIDs').exec(function (err, data) {
        var ids = data[0].childIDs;
        ids.push(req.params.categoryId)
        cmsCategory.update({ _id: { $in: ids } }, { $set: { isdeleted: true } }, { multi: true }, function (err, post) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json("category updated");
            }
        });
    })

}

/* delete a category */
exports.delCheckedCmscategory = function (req, res, next) {
    var arr=req.query.categoryId;
    cmsCategory.find({ '_id': {$in:arr} }).exec(function (err, data) {
        for (var i = 0; i < data.length; i++) {
        cmsCategory.update({ '_id': data[i]._id }, {$set: {isdeleted: true}}, {multi: true}, function (err, post){
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json("category updated");
            }
        });
      }
   })
}

/* get all category items */
exports.getCategoryItems = function (req, res, next) {
    cmsCategory.find({ level: '1', isdeleted: false }).populate('childIDs').sort('-created').exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

/* get category details */
exports.getCategoryDetails = function (req, res, next) {
    cmsCategory.findById(req.params.categoryId).populate({ path: 'childIDs', model: 'cmsCategory' }).exec(function (err, data) {
        console.log(data)
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

/* update category details */
exports.updateCategory = function (req, res, next) {

    var today = Date.now();
    var picpath = "";
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads');
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.substr(file.originalname.length - 3); // => "Tabs1"
            callback(null, file.fieldname + '-' + today + '.' + ext); // => "Tabs1");
            picpath = "uploads/" + file.fieldname + '-' + today + '.' + ext;
        }
    });

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, function (err) {
        var reqBody = req.body;
        
        if (err) {
            return res.end("Error uploading file.");
        }
        else {
        //reqBody['image'] = picpath;


        if (reqBody.defaultLang==reqBody.userSelectedLang) 
        {
            data.category = reqBody.category,
            data.description = reqBody.description,
            data.category_url = reqBody.category_url
        }
        else 
        {
            var obj = {};
            obj.category = reqBody.category;
            obj.description = reqBody.description;
             obj.category_url = reqBody.category_url;
            data['oLang'][reqBody.userSelectedLang] = obj;  
        }
        if (picpath == '') 
        {
       
            data.category= reqBody.category,
           data.description= reqBody.description,
            data.category_url= reqBody.category_url,
           data.category_metadesc=reqBody.desc,
           data.category_metakey=reqBody.key,
            data.menu= reqBody.dispmenu,
            data.sidebar= reqBody.sidebar,
           data.status= reqBody.status
          
        }
        else
        {
                 data.category= reqBody.category,
                 data.description= reqBody.description,
                 data.category_url= reqBody.category_url,
                 data.category_metadesc=reqBody.desc,
                data.category_metakey= reqBody.key,
                 data.menu= reqBody.dispmenu,
                data.sidebar= reqBody.sidebar,
                 data.status=reqBody.status,
                 data.image= picpath
        }

  cmsCategory.findByIdAndUpdate({_id:reqBody.id}, { $set: data }, function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("category updated");
        }
        
    })

}
});


}





























/* add new Page */
exports.addPage = function (req, res, next) {
    console.log(req.body)
    cmsPage.create(req.body, function (err, post) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("category added");
        }
    });
}



/* delete a page */
exports.deletePage = function (req, res) {
      var id = req.params.pageId;
    cmsPage.findById(id).exec(function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        // var cm = item;

         item.remove(function(err) {
            if (err) {
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
              res.jsonp(item);
            }
          });
        
      }
      });
    

}

/* get all category items */
exports.getPageItems = function (req, res, next) {
    cmsPage.find().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

/* get category details */
exports.getPageDetails = function (req, res, next) {
    cmsPage.findById(req.params.pageId).exec(function (err, data) {
        console.log(data)
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

/* update category details */
exports.updatePage = function (req, res, next) {
  var id = req.params.pageId
  cmsPage.findById(id).exec(function (error, item) {
    
        if (error) {
        console.log(error);
          res.status(500).send(error);
          return;
        }
       // item = req.body;
        item.page_title = req.body.page_title;
          item.page_content = req.body.page_content;
          item.page_status = req.body.page_status;
          item.page_metadesc = req.body.page_metadesc;
          item.page_metakey = req.body.page_metakey;
          item.page_slug = req.body.page_slug;
          item.page_urlkey = req.body.page_urlkey;
          item.page_displayinmenu = req.body.page_displayinmenu;
          item.oLang = req.body.oLang;
        item.save();

        res.json(item);
        return;
      });
}