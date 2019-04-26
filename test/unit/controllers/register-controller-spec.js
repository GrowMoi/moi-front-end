(function () {
  'use strict';

  describe('RegisterController', function () {
    var $rootScope,
        controller,
        deferredRegister,
        $auth,
        $state,
        $ionicPopup,
        deferredStateGo,
        deferredValidateUser,
        ModalService,
        $scope,
        $ionicLoading,
        ImagesLoginEn,
        ImagesLogin,
        $translate,
        StorageService;

    beforeEach(module('moi.services', function($provide){
      $provide.factory('StorageService', function(){
        return {
          setLanguage: function(){}
        };
      });
    }));

    beforeEach(module('moi.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.factory('ModalService', function(){
        return {
          showModel: function(){
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
                _$rootScope_,
                _ModalService_,
                $controller,
                _ImagesLoginEn_,
                _ImagesLogin_,
                _StorageService_) {

      deferredRegister  = $q.defer();
      deferredStateGo   = $q.defer();
      deferredValidateUser   = $q.defer();
      ModalService = _ModalService_;
      $ionicPopup       = { alert: sinon.stub() };
      $ionicLoading     = { show: sinon.stub(), hide: sinon.stub()};
      $state            = { go: sinon.stub().returns(deferredStateGo.promise) };
      $auth             = {
        submitRegistration: sinon.stub()
                          .returns(deferredRegister.promise),
        validateUser: sinon.stub()
                          .returns(deferredValidateUser.promise)
      };
      $rootScope = _$rootScope_;
      $scope            = $rootScope.$new();
      ImagesLogin = _ImagesLogin_;
      ImagesLoginEn = _ImagesLoginEn_;
      StorageService = _StorageService_;
      $translate ={
        use:function(){
        }
      };

      controller = $controller('RegisterController', {
        '$ionicPopup': $ionicPopup,
        '$ionicLoading': $ionicLoading,
        '$state': $state,
        '$auth': $auth,
        '$scope': $scope,
        'ImagesLogin': ImagesLogin,
        'ImagesLoginEn': ImagesLoginEn,
        '$translate': $translate,
        'StorageService': StorageService,
      });
    }));

    describe('#register-moi', function() {

      beforeEach(inject(function() {
        controller.register();
      }));

      it('ionicLoading.show should be called', function() {
        sinon.assert.calledOnce($ionicLoading.show);
      });

      describe('when the register is executed,', function() {
        it('if successful, should call to validateUser', function() {
          deferredRegister.resolve();
          $rootScope.$digest();
          chai.expect($auth.validateUser.called).to.be.equal(true);
        });

        it('if successful validateUser, should setLanguage and redirect to tree page', function() {
          var user = {
            id: 1,
            username: 'test'
          };
          var spy = sinon.spy(StorageService, 'setLanguage');
          deferredRegister.resolve();
          deferredValidateUser.resolve(user);
          $rootScope.$digest();
          chai.expect(spy.called).to.be.equal(true);
        });
      });
    });
  });
})();
