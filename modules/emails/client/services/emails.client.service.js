// Emails service used to communicate Emails REST endpoints
(function () {
  'use strict';

  angular
    .module('emails')
    .factory('EmailsService', EmailsService);

  EmailsService.$inject = ['$resource'];

  function EmailsService($resource) {
    return $resource('api/emails/:emailId', {
      emailId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
