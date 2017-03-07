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
        $scope,
        $ionicLoading;

    beforeEach(module('moi.controllers'));

    beforeEach(inject(
      function ($q,
                _$rootScope_,
                $controller) {

      deferredRegister  = $q.defer();
      deferredStateGo   = $q.defer();
      $ionicPopup       = { alert: sinon.stub() };
      $ionicLoading     = { show: sinon.stub(), hide: sinon.stub()};
      $state            = { go: sinon.stub().returns(deferredStateGo.promise) };
      $auth             = {
        submitRegistration: sinon.stub()
                          .returns(deferredRegister.promise)
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
        var successState = 'tree';

        it('if successful, should change state', function() {
          deferredRegister.resolve();
          $rootScope.$digest();

          sinon.assert.alwaysCalledWithExactly($state.go, successState);
        });
      });
    });
  });
})();
