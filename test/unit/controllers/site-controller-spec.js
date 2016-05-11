(function () {
  'use strict';

  describe('SiteController', function () {
    var ctrl, $controller, dependencies, $rootScope, $ionicLoading, $auth;

    beforeEach(module('moi.controllers'));

    beforeEach(inject(
      function (_$controller_,
                _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $ionicLoading = { show: sinon.stub(), hide: sinon.stub()};

      })
    );

    describe('#listeners', function(){
      beforeEach(function(){
        $auth = { user: {id: 1}};

        dependencies = {
          $ionicLoading: $ionicLoading,
          $auth: $auth
        };

        ctrl = $controller('SiteController', dependencies);
      });

      it('should call $ionicLoading.show in stateChangeStart', function(){
        $rootScope.$broadcast('$stateChangeStart', {name: 'fakestate'});
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.show);
      });

      it('should not call $ionicLoading.show in stateChangeStart to login and user', function(){
        $rootScope.$broadcast('$stateChangeStart', {name: 'login'});
        $rootScope.$digest();
        sinon.assert.notCalled($ionicLoading.show);
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

    describe('without user', function(){
      beforeEach(function(){
        $auth = { user: {}};

        dependencies = {
          $ionicLoading: $ionicLoading,
          $auth: $auth
        };
        ctrl = $controller('SiteController', dependencies);
      });

      it('should call $ionicLoading.show in stateChangeStart to login and no user', function(){
        $rootScope.$broadcast('$stateChangeStart', {name: 'login'});
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.show);
      });
    });

  });
})();
