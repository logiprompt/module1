(function () {
  'use strict';

  angular
    .module('newsletters')
    .controller('NewslettersListController', NewslettersListController);

  NewslettersListController.$inject = ['NewslettersService'];

  function NewslettersListController(NewslettersService) {
    var vm = this;

    vm.newsletters = NewslettersService.query();
  }
}());
