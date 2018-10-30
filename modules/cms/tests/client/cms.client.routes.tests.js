(function () {
  'use strict';

  describe('Cms Route Tests', function () {
    // Initialize global variables
    var $scope,
      CmsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CmsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CmsService = _CmsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('cms');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/cms');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          CmsController,
          mockCm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('cms.view');
          $templateCache.put('modules/cms/client/views/view-cm.client.view.html', '');

          // create mock Cm
          mockCm = new CmsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Cm Name'
          });

          // Initialize Controller
          CmsController = $controller('CmsController as vm', {
            $scope: $scope,
            cmResolve: mockCm
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:cmId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.cmResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            cmId: 1
          })).toEqual('/cms/1');
        }));

        it('should attach an Cm to the controller scope', function () {
          expect($scope.vm.cm._id).toBe(mockCm._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/cms/client/views/view-cm.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CmsController,
          mockCm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('cms.create');
          $templateCache.put('modules/cms/client/views/form-cm.client.view.html', '');

          // create mock Cm
          mockCm = new CmsService();

          // Initialize Controller
          CmsController = $controller('CmsController as vm', {
            $scope: $scope,
            cmResolve: mockCm
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.cmResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/cms/create');
        }));

        it('should attach an Cm to the controller scope', function () {
          expect($scope.vm.cm._id).toBe(mockCm._id);
          expect($scope.vm.cm._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/cms/client/views/form-cm.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CmsController,
          mockCm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('cms.edit');
          $templateCache.put('modules/cms/client/views/form-cm.client.view.html', '');

          // create mock Cm
          mockCm = new CmsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Cm Name'
          });

          // Initialize Controller
          CmsController = $controller('CmsController as vm', {
            $scope: $scope,
            cmResolve: mockCm
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:cmId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.cmResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            cmId: 1
          })).toEqual('/cms/1/edit');
        }));

        it('should attach an Cm to the controller scope', function () {
          expect($scope.vm.cm._id).toBe(mockCm._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/cms/client/views/form-cm.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
