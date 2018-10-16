// Products service used to communicate Products REST endpoints
(function () {
  'use strict';

  angular
    .module('core')
    .factory('CoreService', CoreService);

    CoreService.$inject = ['$resource'];

  function CoreService($resource) {
    return $resource('api/products/:productId', {
      productId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
