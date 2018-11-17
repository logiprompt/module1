(function () {
    'use strict';

    angular
        .module('newsletters')
        .service('NewsletterTemplateService', NewsletterTemplateService);

    NewsletterTemplateService.$inject = ['$resource', '$http'];
    function NewsletterTemplateService($resource, $http) {


        var newsLetterTemplate = {};

        /*
         * Function : addNewsLetterTemplate
         * Description : add new newsletter template
         */

        newsLetterTemplate.addNewsLetterTemplate = function (data) {
            return $http({
                url: '/api/newsLetter/addNewsLetterTemplate',
                method: "POST",
                data: data
            });
        }

        /*
         * Function : getNewsLetterList
         * Description : get all newsletter templates
         */

        newsLetterTemplate.getAllNewsLetterTemplates = function (data) {
            return $http({
                url: '/api/newsLetter/getAllNewsLetterTemplates',
                method: "GET"
            });
        }


        /*
         * Function : getNewsLetterTemplateDetails
         * Description : get the newsletter template details
         */

        newsLetterTemplate.getNewsLetterTemplateDetails = function (templateId) {
            return $http({
                url: '/api/newsLetter/getNewsLetterTemplateDetails/' + templateId,
                method: "GET"
            });
        }

        /*
         * Function : updateNewsLetterTemplateDetails
         * Description : update the newsletter template details
         */

        newsLetterTemplate.updateNewsLetterTemplate = function (data) {
            return $http({
                url: '/api/newsLetter/updateNewsLetterTemplate',
                method: "PUT",
                data: data
            });
        }
        return newsLetterTemplate;
    }


}());
