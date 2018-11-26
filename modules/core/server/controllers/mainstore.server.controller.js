'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    mainstore = mongoose.model('Sys_MainStore'),
	country = mongoose.model('Sys_country'),
	state = mongoose.model('Sys_state'),
	district = mongoose.model('Sys_district'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function (req, res) {

   
	  var reqBody = req.body;
    console.log(reqBody);
	

    //var data;

	        mainstore.findById(reqBody.rowId).lean().exec(function (error, data) {
        if (error) {
            res.status(500).send(error);
            return;
        } else {
			if(data){
			/* res.json(data);
                return; */
				
			
				 
            if (reqBody.isDefaultLang) {
                data.name = reqBody.name;
                data.contactperson = reqBody.contactperson;
                data.address = reqBody.address;
               data.email = reqBody.email;
                data.telephone = reqBody.telephone;
				data.mobile = reqBody.mobile;
				data.fax = reqBody.fax;
				data.postalcode = reqBody.postalcode;
				data.country = reqBody.country;
				data.state = reqBody.state;
				data.district = reqBody.district;
				data.lattitude = reqBody.lattitude;
				data.longitude = reqBody.longitude;
				data.timezone = reqBody.timezone;
				data.workingday = reqBody.workingday;
				data.weekend=reqBody.weekend;
				data.timing=reqBody.timing;
            }
            else {
                var obj = {};
				data.email = reqBody.email;
                data.telephone = reqBody.telephone;
				data.mobile = reqBody.mobile;
				data.fax = reqBody.fax;
				data.postalcode = reqBody.postalcode;
				data.country = reqBody.country;
				data.state = reqBody.state;
				data.district = reqBody.district;
				data.lattitude = reqBody.lattitude;
				data.longitude = reqBody.longitude;
				data.timezone = reqBody.timezone;
				data.workingday = reqBody.workingday;
				data.timing=reqBody.timing;
				data.weekend=reqBody.weekend;
                obj.name = reqBody.name;
                obj.contactperson = reqBody.contactperson;
                obj.address = reqBody.address;
                data['oLang'][reqBody.userSelectedLang] = obj;
            }
				
 			
            mainstore.update({'_id':reqBody.rowId}, 
                {$set:data} ).exec(function (error, output) {
                if (error) {
                    res.status(500).send(error);
                    return;
                }
                res.json(output);
                return;


            })
			}
			else{
				
				 mainstore.create(reqBody, function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(reqBody);
        }
    });
				
				
				}
			
			
        }
    })
	  
      
	}
		
	



/**
 * List of country
 */
exports.list = function (request, response) {
    
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
 * List of getdetails
 */
exports.getdetails = function (request, response) {
    
    mainstore.findOne().exec(function (error, items) {

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
 * List of state
 */

exports.reads = function (request, response) {
    console.log(request.body);


    state.find({"country":request.body.userId})
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
 * List of district
 */

exports.readsdistrict = function (request, response) {
    console.log(request.body);


    district.find({"state":request.body.userId})
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

// /**
//  * Get User by ID
//  */

//exports.userByIDs = function (request, response) {
//    console.log(request);
//    console.log(90909090909090)
//    Userforgot.findById(request.params.userId)
//        .lean()
//        .exec(function (error, items) {
//            if (error) {
//                console.log(error);
//                response.status(500).send(error);
//                return;
//            }
//            response.jsonp(items);
//        });
//};

/**
 * Delete shipmentcreation by ID
 */
exports.delete = function (request, response) {
    var userId = request.query.userId;
    console.log(userId);
    cmsratingaction.findById(userId).exec(function (error, item) {

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
* Update cmsratingaction
*/
exports.update = function (request, response) {
    var reqBody = request.body;
    var userId = reqBody.userId;
    var data;


    cmsratingaction.findById(userId).lean().exec(function (error, data) {
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

            cmsratingaction.update({'_id':userId}, 
                {$set:data} ).exec(function (error, output) {
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
*Delete CmsratingAction by IDs
*
**/
exports.delCheckedCmsratingAction = function (request, response) {

    var arr = request.query.userId;
    console.log(arr);
    cmsratingaction.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};





