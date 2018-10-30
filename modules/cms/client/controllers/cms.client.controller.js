(function () {
  'use strict';

  // Cms controller
  angular
    .module('cms')
    .controller('CmsController', CmsController);

  CmsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'cmResolve'];

  function CmsController ($scope, $state, $window, Authentication, cm) {
    var vm = this;

    vm.authentication = Authentication;
    vm.cm = cm;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Cm
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cm.$remove($state.go('cms.list'));
      }
    }

    // Save Cm
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.cmForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.cm._id) {
        vm.cm.$update(successCallback, errorCallback);
      } else {
        vm.cm.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('cms.view', {
          cmId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
