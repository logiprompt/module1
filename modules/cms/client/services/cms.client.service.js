// Cms service used to communicate Cms REST endpoints
(function () {
  'use strict';

  angular
    .module('cms')
    .factory('CmsService', CmsService);

  CmsService.$inject = ['$resource'];

  function CmsService($resource) {
    return $resource('api/cms/:cmId', {
      cmId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
