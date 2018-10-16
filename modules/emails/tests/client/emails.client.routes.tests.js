(function () {
  'use strict';

  describe('Emails Route Tests', function () {
    // Initialize global variables
    var $scope,
      EmailsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _EmailsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      EmailsService = _EmailsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('emails');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/emails');
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
          EmailsController,
          mockEmail;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('emails.view');
          $templateCache.put('modules/emails/client/views/view-email.client.view.html', '');

          // create mock Email
          mockEmail = new EmailsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Email Name'
          });

          // Initialize Controller
          EmailsController = $controller('EmailsController as vm', {
            $scope: $scope,
            emailResolve: mockEmail
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:emailId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.emailResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            emailId: 1
          })).toEqual('/emails/1');
        }));

        it('should attach an Email to the controller scope', function () {
          expect($scope.vm.email._id).toBe(mockEmail._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/emails/client/views/view-email.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          EmailsController,
          mockEmail;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('emails.create');
          $templateCache.put('modules/emails/client/views/form-email.client.view.html', '');

          // create mock Email
          mockEmail = new EmailsService();

          // Initialize Controller
          EmailsController = $controller('EmailsController as vm', {
            $scope: $scope,
            emailResolve: mockEmail
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.emailResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/emails/create');
        }));

        it('should attach an Email to the controller scope', function () {
          expect($scope.vm.email._id).toBe(mockEmail._id);
          expect($scope.vm.email._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/emails/client/views/form-email.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          EmailsController,
          mockEmail;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('emails.edit');
          $templateCache.put('modules/emails/client/views/form-email.client.view.html', '');

          // create mock Email
          mockEmail = new EmailsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Email Name'
          });

          // Initialize Controller
          EmailsController = $controller('EmailsController as vm', {
            $scope: $scope,
            emailResolve: mockEmail
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:emailId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.emailResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            emailId: 1
          })).toEqual('/emails/1/edit');
        }));

        it('should attach an Email to the controller scope', function () {
          expect($scope.vm.email._id).toBe(mockEmail._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/emails/client/views/form-email.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
