'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    custom=require('./custom'),
    country = mongoose.model('Sys_country'),
    
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function(req, res) {
//console.log(req.header['language']);

var exist2=Promise.resolve(custom.fieldexist('Sys_acl','userID',req.body.userID));
exist2.then(function(value2) {
  if(value2==0){
    var aclData = req.body;
   // console.log(req.body);
    Acl.create(aclData,function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(aclData);
        }
    });
}
else{
    Acl.find({userID:req.body.userID}).exec(function (error, item) {
        if (error) {
          res.status(500).send(error);
              return;
            }
        //console.log(item);
        if (item) {


            Acl.update({userID:req.body.userID},
                {
                $set:{"menuIDs" : req.body.menuIDs,
                "modified" : Date.now()}
            },function(err) { 
                               if (err) throw err;
                       });
           
             res.json({
                  data:1
                   });


            //console.log(8888)
          // item.menuIDs = req.body.menuIDs;
          // item.modified = Date.now();
        //   item.save();
        //   res.json(item);
              return;
            }

    })
}
})

};

exports.serviceareacountrylist = function (request, response) {
    
    country.find().exec(function (error, items) {

        if (error) {
            return response.status(400).send({
                message: errorHandler.getErrorMessage(error)
            });
        } else {

            response.jsonp(items);
        }
    });
};


/**
 * List of level 1 menu
 */
exports.reads = function (request, response) {
    console.log(request);


    country.findById(request.query.userId)
        .lean()
        .exec(function (error, items) {
            if (error) {
                console.log(error);
                response.status(500).send(error);
                return;
            }
            else {
                response.jsonp(items);
            }
        });

};




/**
 * Get acl by ID
 */

exports.getAclList = function(request, response) {
    console.log(90);
    console.log(request.query.userID);
    Acl.find({userID:request.query.userID})
    .lean()
    .exec(function(error, items) {
        if (error) {
           // console.log(error);
            response.status(500).send(error);
            return;
        }
      //  console.log(items);
        response.json(items);
    });
};



