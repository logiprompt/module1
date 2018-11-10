'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Acl = mongoose.model('Sys_acl'),
    Genlang = mongoose.model('Sys_genlanguage'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  Admin menu 
*/
exports.create = function(req, res) {
//console.log(req.header['language']);
    var aclData = req.body;
    console.log(req.body);
    Acl.create(aclData,function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(aclData);
        }
    });

};



/**
 * List of currencies
 */
exports.getList = function(request, response) {
    //console.log(68074);
    Acl.find().exec(function(error, items) {

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


exports.getLang = function(request, response) {
    console.log(68074);
    Genlang.find().exec(function(error, items) {

        if (error) 
        {
            return response.status(400).send({
              message: errorHandler.getErrorMessage(error)
            });
        }
        else 
        {
            //console.log(items);
           response.jsonp(items);
        }
            
});


};

/**
 * Get Extra field group by ID
 */

exports.getAclList = function(request, response) {
    console.log(90);
    //console.log(request.params.aclId);
    Acl.findById(request.query.userID)
    .lean()
    .exec(function(error, items) {
        if (error) {
           // console.log(error);
            response.status(500).send(error);
            return;
        }
        response.json(items);
    });
};

/*
	 * Update currency
	 */
	exports.updateMenu= function(request, response){
		
       // console.log(request.body);
		Acl.findById(request.body.parentID).exec(function (error, item) {
			  if (error) {
			        response.status(500).send(error);
			        return;
			      }
			  
			  if (item) {

                AdminMenu.find({parentID:request.body.parentID}).exec(function(error, res) {

                    if (error) {
                        return response.status(400).send({
                          message: errorHandler.getErrorMessage(error)
                        });
                      } else {
                        //console.log(items);
                       var ids=res[0].id; console.log(ids);
                       
                       item.hasChild = request.body.hasChild;
                       item.childIDs.push(ids);
                      
			        item.save();
                   
                      }
            
            
                        
                });
  
                      

			        response.json(item);
			        return;
			      }

		  })
	}


