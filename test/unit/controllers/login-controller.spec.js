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

    beforeEach(module('moi.controllers'));

    beforeEach(inject(
      function ($q,
                $rootScope,
                $controller) {

      deferredLogin  = $q.defer();
      $scope         = $rootScope.$new();
      ionicPopupMock = { alert: sinon.stub() };
      stateMock      = { go: sinon.stub() };
      authMock       = {
        submitLogin: sinon.stub()
                          .returns(deferredLogin.promise)
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
        controller.loginForm.email = 'test1';
        controller.loginForm.password = 'password1';
        controller.login();
      }));

      it('should call submitLogin on authService', function() {
        sinon.assert.alwaysCalledWithExactly(authMock.submitLogin, {
          email: 'test1',
          password: 'password1'
        });
      });

      describe('when the login is executed,', function() {
        var successState = 'menu.dash';

        it('if successful, should change state', function() {
          deferredLogin.resolve();
          $rootScope.$digest();

          sinon.assert.alwaysCalledWithExactly(stateMock.go, successState);
        });

        it('if unsuccessful, should show a popup', function() {
          deferredLogin.reject({ errors: [] });
          $rootScope.$digest();

          sinon.assert.calledOnce(ionicPopupMock.alert);
        });

        it('if already authenticated, change state', function () {
          $rootScope.$emit('auth:validation-success');

          sinon.assert.alwaysCalledWithExactly(stateMock.go, successState);
        });
      });
    });
  });
})();
