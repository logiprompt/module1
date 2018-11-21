'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
multer = require('multer'),
    shippingPrice = require('../models/shippingprice.server.model.js'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/* add promotion product price rule*/
exports.addshippingPrice = function (req, res, next) {

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

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, function (err) {
        var reqBody = req.body;
        console.log(req.body);
        if (err) {
            return res.end("Error uploading file.");
        }
        else {
            reqBody['image'] = picpath;
            shippingPrice.create(reqBody, function (err) {
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

    // shippingPrice.create(req.body, function (err, post) {
        
    //     if (err) {
    //         return res.status(400).send({
    //             message: errorHandler.getErrorMessage(err)
    //         });
    //     } else {
    //         res.json("shippingprice added");
    //     }
    // });
}

// get list of all shipping price rules
exports.getShippingPriceList = function (req, res, next) {
    shippingPrice.find().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}


//delete shipping price rule
exports.deleteShippingPrice = function (req, res, next) {
   // console.log(req.query.itemId);
    shippingPrice.remove({ _id: req.query.itemId }).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("data deleted");
        }
    })
}

/** 
*Delete currency by IDs
*
**/
exports.delChecked = function (request, response) {

    var arr = request.query.itemId;
    //console.log(arr);
    shippingPrice.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};

//get shipping price rule details
exports.getShippingPriceDetails = function (req, res, next) {
    shippingPrice.findById(req.query.itemId).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

//update product price rule
exports.updateShippingPriceRule = function (req, res, next) {

    var data = req.body;
    console.log(data);

    var picpath="";
    var today=Date.now();
    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
      callback(null, './public/uploads');
      },
      filename: function (req, file, callback) {
      
      callback(null, file.fieldname + '-' + today+'.png');
      picpath="/uploads/"+file.fieldname + '-' + today+'.png';
      
      }
    });
    var upload = multer({ storage : storage}).single('file');
  upload(req,res,function(err) {
   
  if(err) {
  return res.end("Error uploading file.");
  }
  else{
    
    if(picpath==''){
        shippingPrice.update({_id:req.body.id},{
            $set:{
                'ruleName':data.ruleName,
                'description':data.description,
                'displayIn':data.displayIn,
                'startDate':data.startDate,
                'endDate':data.endDate,
                'values':data.values,
                'conditionsStatus':data.conditionsStatus,
                'stopRuleProcess':data.stopRuleProcess,
                'discountAmount':data.discountAmount,
                'actionApplyTo':data.actionApplyTo,
                'conditions':data.conditions,
                'status':data.status,
                'applyTo':data.applyTo
            }
  },function(err) { 
                     if (err) throw err;
             });
  
            }
            else{
              
                shippingPrice.update({_id:req.body.id},{
                    $set:{
                        'ruleName':data.ruleName,
                        'description':data.description,
                        'displayIn':data.displayIn,
                        'startDate':data.startDate,
                        'endDate':data.endDate,
                        'image':picpath,
                        'values':data.values,
                        'conditionsStatus':data.conditionsStatus,
                        'stopRuleProcess':data.stopRuleProcess,
                        'discountAmount':data.discountAmount,
                        'actionApplyTo':data.actionApplyTo,
                        'conditions':data.conditions,
                        'status':data.status,
                        'applyTo':data.applyTo
                    }
            },function(err) { 
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json("shipping price updated");
                }
                       });
  
            }
  
  
  
            }
  
    res.json({
          data:199
          });
  });
   
    
}