(function () {
  'use strict';

  // Newsletters controller
  angular
    .module('newsletters')
    .controller('NewslettersController', NewslettersController);

  NewslettersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'newsletterResolve'];

  function NewslettersController ($scope, $state, $window, Authentication, newsletter) {
    var vm = this;

    vm.authentication = Authentication;
    vm.newsletter = newsletter;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Newsletter
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.newsletter.$remove($state.go('newsletters.list'));
      }
    }

    // Save Newsletter
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.newsletterForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.newsletter._id) {
        vm.newsletter.$update(successCallback, errorCallback);
      } else {
        vm.newsletter.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('newsletters.view', {
          newsletterId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
 

   
    }
   
   
   






}());
