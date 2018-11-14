'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Invoice = mongoose.model('Sys_invoice'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create  invoice 
*/
exports.create = function(req, res) {
    var invoice = req.body;
    Invoice.create(invoice,function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(invoice);
        }
    });

};



/**
 * List of users
 */
exports.list = function(request, response) {
   
    Invoice.find().exec(function(error, items) {

        if (error) {
            return response.status(400).send({
              message: errorHandler.getErrorMessage(error)
            });
          } else {
           
           response.jsonp(items);
          }




            
    });


};
exports.read = function(req, res) {



};
/**
 * Get User by ID
 */

exports.invoiceByID = function(request, response) {
    Invoice.findById(request.query.userId)
    .lean()
    .exec(function(error, items) {
        if (error) {
            console.log(error);
            response.status(500).send(error);
            return;
        }
       
        response.jsonp(items);
      
    });
};

	/**
	 * Delete invoice
	 */
	exports.delete = function(request, response) {
        var userId = request.query.userId;
         console.log(userId);
        Invoice.findById(userId).exec(function (error, item) {
            
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
                  'message': 'Invoice was removed.'
                });
              });
            } else {
              response.status(404).json({
                message: 'Invoice with id ' + userId + ' was not found.'
              });
            }
          });
      };

      	/*
	 * Update currency
	 */
	exports.updateInvoice= function(request, response){
        var userId = request.body.userId;
        
		Invoice.findById(userId).exec(function (error, item) {
			  if (error) {
			        response.status(500).send(error);
			        return;
			      }
			  
			  if (item) {
				  	item.name = request.body.name;
			        item.subject = request.body.subject;
                    item.content = request.body.content;
                    item.custom = request.body.custom;
			        item.status = request.body.status;
			        item.save();
                
			        response.json(item);
			        return;
			      }

		  })
	}
	

      /** 
      *Delete currency by IDs
      *
      **/
      exports.delCheckedinvoice = function(request, response) {
      
          //var arr = request.query.userId.split(',');
          var arr = request.query.userId;
          //console.log(arr);
          Invoice.deleteMany({_id:{'$in':arr}}).exec(function (err, data) {
                               if (err) throw err;
                               response.json({
                                              status: 1,
                                  });	
                      
                  
                      });


      };





