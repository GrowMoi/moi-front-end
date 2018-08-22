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
        ImagesLogin;

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
      });
    });

    beforeEach(inject(
      function ($q,
                _$rootScope_,
                _ModalService_,
                $controller,
                _ImagesLogin_) {

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

      controller = $controller('RegisterController', {
        '$ionicPopup': $ionicPopup,
        '$ionicLoading': $ionicLoading,
        '$state': $state,
        '$auth': $auth,
        '$scope': $scope,
        'ImagesLogin': ImagesLogin
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

        it('if successful validateUser, should got to successState', function() {
          var user = {
            id: 1,
            username: 'test'
          };
          deferredRegister.resolve();
          deferredValidateUser.resolve(user);
          $rootScope.$digest();
          sinon.assert.alwaysCalledWithExactly($state.go, 'tree', {username: user.username});
        });
      });
    });
  });
})();
