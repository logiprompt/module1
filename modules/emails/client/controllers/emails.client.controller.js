(function () {
  'use strict';

  // Emails controller
  angular
    .module('emails')
    .controller('EmailsController', EmailsController);

  EmailsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'emailResolve'];

  function EmailsController ($scope, $state, $window, Authentication, email) {
    var vm = this;

    vm.authentication = Authentication;
    vm.email = email;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Email
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.email.$remove($state.go('emails.list'));
      }
    }

    // Save Email
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.emailForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.email._id) {
        vm.email.$update(successCallback, errorCallback);
      } else {
        vm.email.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('emails.view', {
          emailId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
