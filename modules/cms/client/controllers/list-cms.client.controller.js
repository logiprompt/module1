(function () {
  'use strict';

  angular
    .module('cms')
    .controller('CmsListController', CmsListController);

  CmsListController.$inject = ['CmsService'];

  function CmsListController(CmsService) {
    var vm = this;

    vm.cms = CmsService.query();
  }
}());
