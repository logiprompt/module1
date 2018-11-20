'use strict';

/**
 * Module dependencies
 */
var newsLetter = require('../controllers/newslettertemplate.server.controller');

module.exports = function (app) {

    //add new newsletter template
    app.route('/api/newsLetter/addNewsLetterTemplate').post(newsLetter.addNewsLetterTemplate);

    //get all newsletter templates
    app.route('/api/newsLetter/getAllNewsLetterTemplates').get(newsLetter.getAllNewsLetterTemplates);

    //get newsletter template details
    app.route('/api/newsLetter/getNewsLetterTemplateDetails/:templateId').get(newsLetter.getNewsLetterTemplateDetails);

    //update newsletter template details
    app.route('/api/newsLetter/updateNewsLetterTemplate').post(newsLetter.updateNewsLetterTemplate);

    app.route('/api/newsLetter/delNewsTempbyid').post(newsLetter.delNewsTempbyid);

};
