(function () {
  'use strict';

  describe('SiteController', function () {
    var ctrl, $controller, dependencies, $rootScope, $ionicLoading;

    beforeEach(module('moi.controllers'));

    beforeEach(inject(
      function (_$controller_,
                _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $ionicLoading = { show: sinon.stub(), hide: sinon.stub()};

        dependencies = {
          $ionicLoading: $ionicLoading
        };

        ctrl = $controller('SiteController', dependencies);

      })
    );

    describe('#listeners', function(){
      it('should call $ionicLoading.show in stateChangeStart', function(){
        $rootScope.$broadcast('$stateChangeStart');
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.show);
      });

      it('should call $ionicLoading.hode in stateChangeSuccess', function(){
        $rootScope.$broadcast('$stateChangeSuccess');
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });

      it('should call $ionicLoading.hode in stateChangeError', function(){
        $rootScope.$broadcast('$stateChangeError');
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.hide);
      });
    });

  });
})();
