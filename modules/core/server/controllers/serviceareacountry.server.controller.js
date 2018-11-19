'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    custom=require('./custom'),
    country = mongoose.model('Sys_country'),
    inscountry = mongoose.model('Sys_serviceareacountry'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function(req, res) 
{
    var arr = req.body.countries.length;
    var countriess = req.body.countries;
    for(var i=0;i<arr;i++)
    {
        var country = new inscountry(req.body);
        country.countries = countriess[i];
        //  country.servicestatus = 1;
        //  country.stateoptional = 1; 
        //  country.distoptional = 1;
        //  country.pinoptional = 1;
        country.created = Date.now();
        country.modified = Date.now();

        country.save(function (err) 
        {
            if (err) 
            {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } 
            else 
            {
                res.jsonp(country);
            }
        });
    }
};

exports.serviceareacountrylist = function (request, response) 
{
    inscountry.find().exec(function (error, item) 
    {
        console.log(item);
        country.find({'_id': {$not: {$in : item}}}).exec(function (error, items) 
        {
            if (error) 
            {
                return response.status(400).send({
                    message: errorHandler.getErrorMessage(error)
                });
            } 
            else 
            {
                response.jsonp(items);  
            }
        });
    }); 
};

/**
 * List of serviceareas
 */
exports.list = function (request, response) {
    
    inscountry.find({}).populate({ path: 'countries',model: 'Sys_country', select: 'country'}).exec(function (error, items) {

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



