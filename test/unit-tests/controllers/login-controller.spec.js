(function () {
  'use strict';

  describe('LoginController', function () {
    var $scope,
        $rootScope,
        controller,
        deferredLogin,
        authMock,
        stateMock,
        ionicPopupMock;

    beforeEach(module('starter.controllers'));

    beforeEach(inject(
      function ($q,
                $rootScope,
                $controller) {

      deferredLogin  = $q.defer();
      $scope         = $rootScope.$new();
      ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
      stateMock      = jasmine.createSpyObj('$state spy', ['go']);
      authMock       = {
        submitLogin: jasmine.createSpy('$auth spy', ['go'])
                            .and.returnValue(deferredLogin.promise)
      };

      controller = $controller('LoginController', {
        '$ionicPopup': ionicPopupMock,
        '$state': stateMock,
        '$auth': authMock,
        '$scope': $scope
      });
    }));

    describe('#login', function() {

      beforeEach(inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
        $scope.loginForm.email = 'test1';
        $scope.loginForm.password = 'password1';
        $scope.login();
      }));

      it('should call submitLogin on authService', function() {
        expect(
          authMock.submitLogin
        ).toHaveBeenCalledWith({
          email: 'test1',
          password: 'password1'
        });
      });

      describe('when the login is executed,', function() {
        var successState = 'menu.dash';

        it('if successful, should change state', function() {
          deferredLogin.resolve();
          $rootScope.$digest();

          expect(stateMock.go).toHaveBeenCalledWith(successState);
        });

        it('if unsuccessful, should show a popup', function() {
          deferredLogin.reject({ errors: [] });
          $rootScope.$digest();

          expect(ionicPopupMock.alert).toHaveBeenCalled();
        });

        it('if already authenticated, change state', function () {
          $rootScope.$emit('auth:validation-success');

          expect(stateMock.go).toHaveBeenCalledWith(successState);
        });
      });
    });
  });
})();
