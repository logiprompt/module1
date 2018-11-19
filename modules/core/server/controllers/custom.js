
 var path = require('path'),
  mongoose = require('mongoose'),
  Category = mongoose.model('Category'),
 Page = mongoose.model('Page'),
  Schema = mongoose.Schema;



module.exports.checkslug = function (slug,suffixnum) 
//function checkslug(slug,suffixnum){
{

 var newslug=slug+'-'+suffixnum;
 //function checking(){

 return new Promise(function(resolve, reject) {



 Page.findOne({ 'slug': newslug}).exec(function (err, data) {

  if (data) {
           
            var oldsuffix=data.slug.split("-");
            suffixnum=parseInt(oldsuffix[oldsuffix.length-1])+1;
            newslug=slug+'-'+suffixnum;
        // return newslug;
         
          checkslug(slug,suffixnum);
         
          } 

          else{
          	resolve(newslug) ;
          }
        });

         })
//}
//return checking();

   };

module.exports.maxplus = function (table_name,field_name) 
{
	var newTable = mongoose.model(table_name);
   	var maxid;
   	return   new Promise(function(resolve, reject) {

		newTable.find().sort({_id: -1}).limit(1)
	   .exec(function (err, datam) {
		   if(datam=="" ){
				  maxid=1;
				 resolve( maxid) ;
				 }
				else{

				  maxid=parseInt(datam[0][field_name])+1;
				 resolve( maxid) ;
				}

			});
	});

}

module.exports.fieldexist = function (table_name,field_name,value) 
{
  var newTable = mongoose.model(table_name);

    return   new Promise(function(resolve, reject) {
      query={};
      query[field_name] = value;
     //console.log( query);
     //var ind='country';
    newTable.find( query)
     .count(function (err, data) {
     // console.log(data)
       if(data==0 ){

         var exist=0;
         resolve( exist) ;
         }
        else{
        var exist=1;
        resolve( exist) ;
        }

      });
  });

}
module.exports.fieldexist3 = function (table_name,field_name1,value1,field_name2,value2,field_name3,value3) 
{
  var newTable = mongoose.model(table_name);

    return   new Promise(function(resolve, reject) {
      query={};
      query[field_name1] = value1;
      query[field_name2] = value2;
      query[field_name3] = value3;
     //console.log( query);
     //var ind='country';
    newTable.find( query)
     .count(function (err, data) {
     // console.log(data)
       if(data==0 ){

         var exist=0;
         resolve( exist) ;
         }
        else{
        var exist=1;
        resolve( exist) ;
        }

      });
  });

}

module.exports.createslug = function (title,maxvalue) 
{
	
	var lowerslug=title.toLowerCase();
	var slug=lowerslug.split(' ').join('-');
	return slug+'-'+maxvalue;

}

