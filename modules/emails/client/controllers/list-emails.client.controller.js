(function () {
  'use strict';

  angular
    .module('emails')
    .controller('EmailsListController', EmailsListController);

  EmailsListController.$inject = ['EmailsService'];

  function EmailsListController(EmailsService) {
    var vm = this;

    vm.emails = EmailsService.query();
  }
}());
