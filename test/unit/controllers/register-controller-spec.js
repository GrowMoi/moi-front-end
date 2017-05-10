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
        $scope,
        $ionicLoading;

    beforeEach(module('moi.controllers'));

    beforeEach(inject(
      function ($q,
                _$rootScope_,
                $controller) {

      deferredRegister  = $q.defer();
      deferredStateGo   = $q.defer();
      deferredValidateUser   = $q.defer();
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

      controller = $controller('RegisterController', {
        '$ionicPopup': $ionicPopup,
        '$ionicLoading': $ionicLoading,
        '$state': $state,
        '$auth': $auth,
        '$scope': $scope
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
          deferredRegister.resolve();
          deferredValidateUser.resolve();
          $rootScope.$digest();
          sinon.assert.alwaysCalledWithExactly($state.go, 'tree');
        });
      });
    });
  });
})();
