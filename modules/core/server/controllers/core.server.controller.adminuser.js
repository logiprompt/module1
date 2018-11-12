'use strict';

var validator = require('validator'),
  path = require('path'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  // Language = mongoose.model('Language'),
  // Country = mongoose.model('Country'),
  Adminuser = mongoose.model('Sys_adminuser'),
  Adminuserlog = mongoose.model('Sys_adminuserlogin'),
  Adminuserrole = mongoose.model('Sys_adminUserRole'),
  custom = require('./custom'),
  config = require(path.resolve('./config/config'));

/**
 * Render the main application page
 */

exports.renderIndex = function (req, res) {
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });

};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/*** Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};

//////////////////////insert///////////////////////////////

exports.insadminuser = function (req, res) {

  var newAdminuser = new Adminuser(req.body);
  var newAdminuserlog = new Adminuserlog(req.body);
  var newAdminuserrole = new Adminuserrole(req.body);
  var picpath = "";
  var today = Date.now();
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {

      callback(null, file.fieldname + '-' + today + '.png');
      picpath = "/uploads/" + file.fieldname + '-' + today + '.png';
      // console.log(picpath);
    }
  });
  var upload = multer({ storage: storage }).single('file');
  upload(req, res, function (err) {

    if (err) {
      return res.end("Error uploading file.");
    }
    else {

      var exist1 = Promise.resolve(custom.fieldexist('Sys_adminuser', 'uname', req.body.uname));
      exist1.then(function (value2) {
        console.log(value2);

        if (value2 == 0) {

          var maxValue = Promise.resolve(custom.maxplus('Sys_adminuser', 'adminuser_id'));

          maxValue.then(function (value) {

            newAdminuser.uname = req.body.uname;
            //newAdminuser.adminuser_id = value;
            newAdminuser.fname = req.body.fname;
            newAdminuser.lname = req.body.lname;
            newAdminuser.email = req.body.email;
            newAdminuser.status = req.body.status;
            newAdminuser.profileimage = picpath;
            newAdminuser.accessList = req.body.role;
            newAdminuser.created = today;
            newAdminuser.modified = today;
            newAdminuser.created_user = req.body.username;
            newAdminuser.modified_user = req.body.username;
            newAdminuser.created_ip = req.body.ip;
            newAdminuser.modified_ip = req.body.ip;
            newAdminuser.save(function (err) {
              if (err) throw err;
            });


            newAdminuserlog.cadminpass = req.body.cadminpassword;
            newAdminuserlog.adminuserlog_id = newAdminuser._id;
            newAdminuserlog.password = req.body.password;
            newAdminuserlog.cpassword = req.body.cpassword;
            newAdminuserlog.created = today;
            newAdminuserlog.modified = today;
            newAdminuserlog.created_user = req.body.username;
            newAdminuserlog.modified_user = req.body.username;
            newAdminuserlog.created_ip = req.body.ip;
            newAdminuserlog.modified_ip = req.body.ip;
            newAdminuserlog.save(function (err) {
              if (err) throw err;
            });
            //console.log(req.body)
            // newAdminuserrole.accessList = req.body.role;
            //newAdminuserrole.userId = req.body.desc;
            ///newAdminuserrole.createdUser=req.body.username;
            //newAdminuserrole.modifiedUser=req.body.username;
            // newAdminuserrole.save(function(err) 
            // { 
            //     if (err) throw err;
            // });  
          });

          res.json({
            data: 0
          });


        }
        else {
          res.json({
            data: 1
          });

        }

      })


    }
  })

}
///////////////////////////////////////////////////////////


exports.reads = function (request, response) {
  Adminuser.findById(request.query.userId)
    .lean()
    .exec(function (error, items) {
      Adminuserlog.find({adminuserlog_id:request.query.userId})
        .lean()
        .exec(function (error, items2) {
          if (error) 
          {
              console.log(error);
              response.status(500).send(error);
              return;
          }
          else 
          {
              response.jsonp({'data1':items,'data2':items2});
          }
        });
    });
};


//////////////////////select///////////////////////////////

exports.selectAdminusers = function (req, res) {

  Adminuser.find({}).exec(function (err, data) {
    if (err) throw err;

    res.json({
      status: true,
      data: data
    });
  });

};
/////////////////////////////////////////////////////////////
exports.delAdminusers = function (req, res) {
  Adminuser.deleteOne({ _id: req.body.id }).exec(function (err, data) {
    if (err) throw err;

    res.json({
      status: 1,

    });
  });
  Adminuserlog.deleteOne({ _id: req.body.id }).exec(function (err, data) {
    if (err) throw err;

    res.json({
      status: 1,

    });
  });
  Adminuserrole.deleteOne({ _id: req.body.id }).exec(function (err, data) {
    if (err) throw err;

    res.json({
      status: 1,

    });
  });
};



//////////////////////delete checked////////////////////////////////////////////////



exports.delcheckedAdminusers = function (req, res) {


  Adminuser.deleteMany({ _id: { '$in': req.body.id } }).exec(function (err, data) {
    if (err) throw err;

    res.json({
      status: 1,

    });


  });

  Adminuserlog.deleteMany({ _id: { '$in': req.body.id } }).exec(function (err, data) {
    if (err) throw err;

    res.json({
      status: 1,

    });


  });

  Adminuserrole.deleteMany({ _id: { '$in': req.body.id } }).exec(function (err, data) {
    if (err) throw err;

    res.json({
      status: 1,

    });


  });


};
////////////////////////////////////////////////////////////////////////////////////////


exports.updateAdminUser = function (request, response) {

  Adminuser.findById(request.body.userId).exec(function (error, item) {

    if (error) {
      response.status(500).send(error);
      return;
    }

    if (item) {
      item.uname = request.body.uname;
      item.fname = request.body.fname;
      item.lname = request.body.lname;
      item.email = request.body.email;
      item.status = request.body.status;
      item.accessList = request.body.accessList;
       item.modified =Date.now();
      item.save();
      response.json(item);
      //return;
    }
  })



  Adminuserlog.find({adminuserlog_id:request.body.userId}).exec(function (error, items) {

    if (error) {
      response.status(500).send(error);
      return;
    }

    if (items) {



      Adminuserlog.update({adminuserlog_id:request.body.userId},
        {
        $set:{"password" : request.body.password,
        "cadminpass" : request.body.cadminpassword,
        "cpassword" : request.body.cpassword,
        "modified" : Date.now()}
    },function(err) { 
                       if (err) throw err;
               });
   
     res.json({
          data:1
           });

      return;
    }

  })






}


///////////////////////////////////////////////////////////////////////////////////////






