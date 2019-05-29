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
        StorageService,
        UtilityService,
        ionicLoadingMock,
        ImagesLoginEn,
        ImagesLogin,
        ModalService;

    beforeEach(module('moi.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.factory('UtilityService', function(){
        return {
          isAgentChrome: function(){
            return true;
          }
        };
      });
      $provide.factory('ModalService', function(){
        return {
          showModel: sinon.stub()
        };
      });
      $provide.factory('StorageService', function(){
        return {
          setLanguage: function(){}
        };
      });
      $provide.factory('GAService', function(){
        return {
          track: function(){
            return null;
          }
        };
      });
    }));
    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('ImagesLogin', {
          paths: ['image/image1', 'image/image2']
        });
        $provide.constant('ImagesLoginEn', {
          paths: ['image/image1', 'image/image2']
        });
      });
    });
    beforeEach(inject(
      function ($q,
                $rootScope,
                $controller,
                _UtilityService_,
                _StorageService_,
                _ImagesLoginEn_,
                _ImagesLogin_,
                _ModalService_) {

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
      ModalService = _ModalService_;
      StorageService = _StorageService_;
      ImagesLogin = _ImagesLogin_;
      ImagesLoginEn = _ImagesLoginEn_;
      controller = $controller('LoginController', {
        '$ionicPopup': ionicPopupMock,
        '$ionicLoading': ionicLoadingMock,
        '$state': stateMock,
        '$auth': authMock,
        '$scope': $scope,
        'UtilityService': UtilityService,
        'StorageService': StorageService,
        'ModalService': ModalService
      });
    }));

    describe('#login', function() {

      beforeEach(inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
        controller.isChrome = UtilityService.isAgentChrome();
        controller.form.login = 'test1';
        controller.form.password = 'password1';
        controller.finishedSound();
      }));

      it('should call submitLogin on authService', function() {
        sinon.assert.alwaysCalledWithExactly(authMock.submitLogin, {
          login: 'test1',
          password: 'password1'
        });
      });

      describe('when the login is executed,', function() {
        it('shoul call setLanguage', function() {
          var user = {
            id: 1,
            username: 'test'
          };
          var spy = sinon.spy(StorageService, 'setLanguage');
          deferredLogin.resolve(user);
          $rootScope.$digest();
          chai.expect(spy.called).to.be.equal(true);
        });

        it('if unsuccessful, should show a popup', function() {
          deferredLogin.reject({ errors: [] });
          $rootScope.$digest();
          sinon.assert.calledOnce(ionicPopupMock.alert);
        });
      });
    });
  });
})();
