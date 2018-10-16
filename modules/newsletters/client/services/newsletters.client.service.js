// Newsletters service used to communicate Newsletters REST endpoints
(function () {
  'use strict';

  angular
    .module('newsletters')
    .factory('NewslettersService', NewslettersService);

  NewslettersService.$inject = ['$resource'];

  function NewslettersService($resource) {
    return $resource('api/newsletters/:newsletterId', {
      newsletterId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
