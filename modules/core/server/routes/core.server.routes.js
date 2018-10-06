'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');
  
  var rollz = require('../controllers/core.server.controller.rollandprevilage');
  var adminuser = require('../controllers/core.server.controller.adminuser');
 // var pages = require('../controllers/core.server.controller.page');
  //var plugin = require('../controllers/core.server.controller.plugins');
 // var post1 = require('../controllers/core.server.controller.post');
 // var blog = require('../controllers/core.server.controller.blog');
 // var Language = require('../controllers/core.server.controller.Language');
  var Country = require('../controllers/core.server.controller.country');
  var Businesscountry = require('../controllers/core.server.controller.businesscountry');
  var Businesslanguage = require('../controllers/core.server.controller.businesslanguage');
  var State = require('../controllers/core.server.controller.state');
   var District = require('../controllers/core.server.controller.district');
   var pincode = require('../controllers/core.server.controller.pincode');
   
    var Genlanguage = require('../controllers/core.server.controller.generallanguage');
   
 var custom=require('../controllers/custom');
 
var mongoose = require('mongoose');
var Languages = mongoose.model('Language');
var Schema = mongoose.Schema;
  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  //app.route('/*').get(core.renderIndex);
   app.route('/*').get(core.renderIndex);
////////////////////////getdefaultLang//////////////////////////
app.post('/api/admin/getdefaultLang', function(req, res){

   
   Languages.findOne({defaultlang: 1})
      .exec(function (err, data) {
       res.json({
           status: true,
           //data:data.shortcode
       });  
        
    });

});


  app.post('/api/admin/getallLanguages', function(req, res){
     Languages.find({})
      .exec(function (err, data) {
       
      res.json({
           status: true,
          // data:data
       });  
        
    });
 
 });

//////////////////////end getdefaultLang////////////////////////////

//////////////////insert///////////////////////////
 

///////////////////////////////////////////////////////////////////

//////////////////country ///////////////////////////
app.post('/api/admin/insCountry', function(req, res)
{
  var data=req;
  var res=res;
  Country.insCountry(data,res);
  return res;
});

app.post('/api/admin/selectCountry', function(req, res)
{ 
  var data=req;
  var res=res;
  Country.selectCountry(data,res);
});



app.post('/api/admin/delcountry', function(req, res){
  
  var data=req;
  var res=res;
  Country.delCountry(data,res);

});
app.post('/api/admin/delstate', function(req, res){
  
  var data=req;
  var res=res;
  State.delstate(data,res);

});


app.post('/api/admin/delcheckedcountry', function(req, res){
  var data=req;
  var res=res;
  Country.delcheckedcountry(data,res);
  return res;
});

//////////////////////////state//////////////////////////////
app.post('/api/admin/insState', function(req, res)
{
  var data=req;
  var res=res;

 State.insState(data,res);
 return res;
});
app.post('/api/admin/delcheckedstate', function(req, res){
  var data=req;
  var res=res;
  State.delcheckedstate(data,res);
  return res;
});
app.post('/api/admin/updateState', function(req, res){
  var data=req;
  var res=res;
  State.updateState(data,res);
  return res;
});

app.post('/api/admin/selectState', function(req, res)
{ 
  var data=req;
  var res=res;
  State.selectState(data,res);
});
app.post('/api/admin/viewCountrybyid', function(req, res)
{ 
  var data=req;
  var res=res;
  Country.viewCountryid(data,res);
});

//////////////////District///////////////////////////

app.post('/api/admin/changecountry', function(req, res)
{ 
  var data=req;
  var res=res;
  District.changecountry(data,res);
});

app.post('/api/admin/insDistrict', function(req, res)
{
  var data=req;
  var res=res;
  District.insDistrict(data,res);
});

app.post('/api/admin/selectDistrict', function(req, res)
{ 
  var data=req;
  var res=res;
  District.selectDistrict(data,res);
});

app.post('/api/admin/viewDistrictbyid', function(req, res)
{ 
  var data=req;
  var res=res;
  District.viewDistrictbyid(data,res);
});

app.post('/api/admin/updDistrict', function(req, res){
  var data=req;
  var res=res;
  District.updDistrict(data,res);
  
});

app.post('/api/admin/delDistrict', function(req, res){
  
  var data=req;
  var res=res;
  District.delDistrict(data,res);
 
});

app.post('/api/admin/delcheckeddistrict', function(req, res){
  var data=req;
  var res=res;
  District.delcheckeddistrict(data,res);
  return res;
});

/////////////////////////pincode///////////////////////////////////////////
////////////////on change state///////////////////////////

app.post('/api/admin/changestate', function(req, res)
{ 
  var data=req;
  var res=res;
  pincode.changestate(data,res);
});

/////////////////////////insert/////////////////////////////
app.post('/api/admin/insPincode', function(req, res)
{
  var data=req;
  var res=res;
  pincode.insPincode(data,res);
  return res;
});
//////////////////////list pincode///////////////
app.post('/api/admin/selectPincode', function(req, res)
{
  var data=req;
  var res=res;
  pincode.selectPincode(data,res);
});
///////////////////////view by id/////////////////
app.post('/api/admin/viewPincodebyid', function(req, res)
{ 
  var data=req;
  var res=res;
  pincode.viewPincodebyid(data,res);
});
///////////////////////update/////////////////
app.post('/api/admin/updatePincode', function(req, res)
{ 
  var data=req;
  var res=res;
  pincode.updatePincode(data,res);
});
///////////////////////del/////////////////
app.post('/api/admin/delPincode', function(req, res)
{ 
  var data=req;
  var res=res;
  pincode.delPincode(data,res);
});
//////////////////////del checked/////////////////
app.post('/api/admin/delcheckedpincode', function(req, res)
{ 
  var data=req;
  var res=res;
  pincode.delcheckedpincode(data,res);
});

//////////////////General Languages///////////////////////////

app.post('/api/admin/insLanguage', function(req, res)
{
  var data=req;
  var res=res;
  Genlanguage.insLanguage(data,res);
  return res;
});

app.post('/api/admin/selectGenlanguage', function(req, res)
{ 
  var data=req;
  var res=res;
  Genlanguage.selectGenlanguage(data,res);
});

app.post('/api/admin/viewGenlangbyid', function(req, res)
{ 
  var data=req;
  var res=res;
  Genlanguage.viewGenlangbyid(data,res);
});

app.post('/api/admin/updGenlang', function(req, res){
  var data=req;
  var res=res;
  Genlanguage.updGenlang(data,res);
  return res;
});

app.post('/api/admin/delGenlang', function(req, res){
  
  var data=req;
  var res=res;
  Genlanguage.delGenlang(data,res);
  return res;
});

app.post('/api/admin/delcheckedgenlang', function(req, res){
  var data=req;
  var res=res;
  Genlanguage.delcheckedgenlang(data,res);
  return res;
});


///////////////////roles/////////////////////////insert/////////////
app.post('/api/admin/insRoleandprivilege', function(req, res){
  var data=req;
  var res=res;
  rollz.insRoleandprivilege(data,res);
  return res;
});
app.post('/api/admin/delchecked', function(req, res){
  var data=req;
  var res=res;
  rollz.delchecked(data,res);
  return res;
});
/////////////////all list///////////////////
app.post('/api/admin/selectRoleprivileges', function(req, res)
{ 
  var data=req;
  var res=res;
  rollz.selectRoleprivileges(data,res);
});
///////////////view//////////////////
app.post('/api/admin/viewRoleprivilegebyid', function(req, res)
{ 
  var data=req;
  var res=res;
  rollz.viewRoleprivilegebyid(data,res);
});
  

//////////////////update///////////////////////////
  app.post('/api/admin/updateRoleandprivilege', function(req, res){
    var data=req;
    var res=res;
    rollz.updateRoleandprivilege(data,res);
 
 });
  ///////////////////delete////////////////////////////
  app.post('/api/admin/delRoleprivileges', function(req, res){
    var data=req;
    var res=res;
    rollz.delRoleprivileges(data,res);
  });
///////////////////////////////////end roles////////////
/////////////bussiness country/////////////////////
//////////////////////insert////////////////////
app.post('/api/admin/insbusinessCountry', function(req, res){
  var data=req;
  var res=res;
  Businesscountry.insbusinessCountry(data,res);
  return res;
});

app.post('/api/admin/insbusinesslang', function(req, res){
  var data=req;
  var res=res;
  Businesslanguage.insbusinesslang(data,res);
  return res;
});


app.post('/api/admin/selectbusinesslang', function(req, res)
{ 
  var data=req;
  var res=res;
  Businesslanguage.selectBusinesslang(data,res);
});

app.post('/api/admin/delbusinesslang', function(req, res)
{ 
  var data=req;
  var res=res;
  Businesslanguage.delbusinesslang(data,res);
});

app.post('/api/admin/delcheckedbusinesslang', function(req, res)
{ 
  var data=req;
  var res=res;
  Businesslanguage.delcheckedbusinesslang(data,res);
});

app.post('/api/admin/viewBusinesslangid', function(req, res)
{ 
  var data=req;
  var res=res;
  Businesslanguage.editBusinesslangbyid(data,res);
});


app.post('/api/admin/updatebusinesslang', function(req, res)
{ 
  var data=req;
  var res=res;
  Businesslanguage.updatebusinessLang(data,res);
});


/////////////////end insert///////////////////
/////////load bussiness countries////////////
app.post('/api/admin/selectbusinessCountry', function(req, res)
{ 
  var data=req;
  var res=res;
  Businesscountry.selectbusinessCountry(data,res);
});
/////////////////////////////////////////////
/////////view bussiness countries by id////////////
app.post('/api/admin/viewBusinesscountryid', function(req, res)
{ 
  var data=req;
  var res=res;
  Businesscountry.viewBusinesscountryid(data,res);
});
////////update bussiness countries by id////////////
app.post('/api/admin/updatebusinessCountry', function(req, res)
{ 
  var data=req;
  var res=res;
  Businesscountry.updatebusinessCountry(data,res);
});
///////////////delete //////////////////////////////
app.post('/api/admin/delBusinesscountry', function(req, res){
  var data=req;
  var res=res;
  Businesscountry.delBusinesscountry(data,res);
  return res;
});
///////////////delete checked//////////////////////////////
app.post('/api/admin/busdelchecked', function(req, res){
  var data=req;
  var res=res;
  Businesscountry.busdelchecked(data,res);
  return res;
});
/////////////////////////////////////////////////////////////////////
///////////////////////////adminuser add////////////////////////////

app.post('/api/admin/insadminuser', function(req, res){
  var data=req;
  var res=res;
  adminuser.insadminuser(data,res);
  return res;
});
////////////////////////list////////////////////////////////////////
app.post('/api/admin/selectAdminusers', function(req, res){
  var data=req;
  var res=res;
  adminuser.selectAdminusers(data,res);
});

///////////////delete //////////////////////////////
app.post('/api/admin/delAdminusers', function(req, res){
  var data=req;
  var res=res;
  adminuser.delAdminusers(data,res);
  return res;
});
///////////////delete checked//////////////////////////////
app.post('/api/admin/delcheckedAdminusers', function(req, res){
  var data=req;
  var res=res;
  adminuser.delcheckedAdminusers(data,res);
  return res;
});


/////////////////////////////////////////////////////////////////////
 
};
