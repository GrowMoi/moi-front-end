(function () {
  'use strict';

  describe('LoginController', function () {
    var $scope,
        $rootScope,
        controller,
        deferredLogin,
        authMock,
        stateMock,
        ionicPopupMock,
        UtilityService,
        ionicLoadingMock;

    beforeEach(module('moi.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.factory('UtilityService', function(){
        return {
          isAgentChrome: function(){
            return true;
          }
        };
      });
    }));
    beforeEach(inject(
      function ($q,
                $rootScope,
                $controller,
                _UtilityService_) {

      deferredLogin     = $q.defer();
      $scope            = $rootScope.$new();
      ionicPopupMock    = { alert: sinon.stub() };
      ionicLoadingMock  = { show: sinon.stub(), hide: sinon.stub()};
      stateMock         = { go: sinon.stub() };
      authMock          = {
        submitLogin: sinon.stub()
                          .returns(deferredLogin.promise)
      };
      UtilityService    = _UtilityService_;
      controller = $controller('LoginController', {
        '$ionicPopup': ionicPopupMock,
        '$ionicLoading': ionicLoadingMock,
        '$state': stateMock,
        '$auth': authMock,
        '$scope': $scope,
        'UtilityService': UtilityService
      });
    }));

    describe('#login', function() {

      beforeEach(inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
        controller.isChrome = UtilityService.isAgentChrome();
        controller.loginForm.login = 'test1';
        controller.loginForm.password = 'password1';
        controller.finishedSound();
      }));

      it('should call submitLogin on authService', function() {
        sinon.assert.alwaysCalledWithExactly(authMock.submitLogin, {
          login: 'test1',
          password: 'password1'
        });
      });

      describe('when the login is executed,', function() {
        var successState = 'tree';
        var profileEdit = 'profileEdit';

        it('if successful, should change state', function() {
          deferredLogin.resolve({'username': 'tester'});
          $rootScope.$digest();

          sinon.assert.alwaysCalledWithExactly(stateMock.go, successState);
        });

        it('if unsuccessful, should show a popup', function() {
          deferredLogin.reject({ errors: [] });
          $rootScope.$digest();

          sinon.assert.calledOnce(ionicPopupMock.alert);
        });

        it('if user dont change the new login, should redirect user to edit profile', function () {
          $rootScope.$emit('auth:validation-success');

          sinon.assert.alwaysCalledWithExactly(stateMock.go, profileEdit);
        });
      });
    });
  });
})();
