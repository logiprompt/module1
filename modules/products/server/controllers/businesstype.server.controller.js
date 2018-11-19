'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    Businesstype = mongoose.model('Sys_BusinessType'),
    Headermenu = mongoose.model('Sys_adminMenu'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function (req, res) {

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
            Businesstype.create(reqBody, function (err) {
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
 * List of users
 */
exports.list = function (request, response) {
    //console.log(919191919191919);
    Ordercompletion.find().exec(function (error, items) {

        if (error) {
            return response.status(400).send({
                message: errorHandler.getErrorMessage(error)
            });
        } else {

            response.jsonp(items);
        }
    });
};






exports.reads = function (request, response) {
    console.log(request);


    Ordercompletion.findById(request.query.userId)
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

exports.getTopSubMenuList = function(request, response) {
   
    // <TODO>
    //condition to be added 
    //find menu from user role id
    //Set proper level values on menu create
    Headermenu.find({'level':1})
    .populate({path:"childIDs", populate:{path:"childIDs",populate:{path:"childIDs"}}})
    .exec(function(error, items) {

        if (error) {
            return response.status(400).send({
              message: errorHandler.getErrorMessage(error)
            });
          } else {
            //console.log(items);
           response.jsonp(items);
          }
            
    });
};

// /**
//  * Get User by ID
//  */

exports.userByIDs = function (request, response) {
    // console.log(request);
    // console.log(90909090909090)
    Ordercompletion.findById(request.params.userId)
        .lean()
        .exec(function (error, items) {
            if (error) {
                console.log(error);
                response.status(500).send(error);
                return;
            }
            response.jsonp(items);
        });
};

/**
 * Delete currency by ID
 */
exports.delete = function (request, response) {
    var userId = request.query.userId;
    console.log(userId);
    Ordercompletion.findById(userId).exec(function (error, item) {

        if (error) {
            response.status(500).send(error);
            return;
        }

        if (item) {
            item.remove(function (error) {

                if (error) {
                    response.status(500).send(error);
                    return;
                }

                response.status(200).json({
                    'message': 'User was removed.'
                });
            });
        } else {
            response.status(404).json({
                message: 'User with id ' + userId + ' was not found.'
            });
        }
    });
};

/*
* Update currency
*/
exports.update = function (request, response) {
    var reqBody = request.body;
    var userId = reqBody.userId;
    var data;


    Ordercompletion.findById(userId).lean().exec(function (error, data) {

        if (error) {
            response.status(500).send(error);
            return;
        } else {

            if (reqBody.isDefaultLang) {
                data.name = reqBody.name;
                data.subject = reqBody.subject;
                data.content = reqBody.content;
                data.custom = reqBody.custom;
                data.status = reqBody.status;
            }

            else {

                var obj = {};
                obj.name = reqBody.name;
                obj.subject = reqBody.subject;
                obj.content = reqBody.content;
                obj.custom = reqBody.custom;

                data['oLang'][reqBody.userSelectedLang] = obj;

            }

            Ordercompletion.update({ '_id': userId },
                { $set: data }).exec(function (error, output) {
                    if (error) {
                        response.status(500).send(error);
                        return;
                    }
                    response.json(output);
                    return;


                })
        }
    })
}


/** 
*Delete currency by IDs
*
**/
exports.delCheckedOrderHold = function (request, response) {

    var arr = request.query.userId;
    console.log(arr);
    Ordercompletion.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};





