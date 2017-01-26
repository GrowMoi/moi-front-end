(function () {
  'use strict';

  describe('SiteController', function () {
    var ctrl,
        $controller,
        dependencies,
        $rootScope,
        $ionicLoading,
        $auth,
        IMAGES,
        PreloadImage;

    beforeEach(module('moi.controllers'));

    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('IMAGES', {
          paths: ['image/image1', 'image/image2']
        });
      });
    });

    beforeEach(module('moi.services', function($provide){
      $provide.factory('PreloadImage', function(){
        return {
          cache: function(){
            return {
              then: function(){
                return null;
              }
            };
          }
        };
      });
    }));

    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _PreloadImage_,
                _IMAGES_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $ionicLoading = { show: sinon.stub(), hide: sinon.stub()};
        PreloadImage = _PreloadImage_;
        IMAGES = _IMAGES_;
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
        ctrl.loadedImages = true;
        ctrl.preloadCalled = true;
      });

      it('should call $ionicLoading.show in stateChangeStart', function(){
        ctrl.loadedImages = true;
        ctrl.preloadCalled = true;
        $rootScope.$broadcast('$stateChangeStart', {name: 'fakestate'}, {}, {name: 'fromState'});
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.show);
      });

      it('should not call $ionicLoading.show in stateChangeStart to login and user', function(){
        $rootScope.$broadcast('$stateChangeStart', {name: 'login'}, {}, {name: 'fromState'});
        $rootScope.$digest();
        sinon.assert.notCalled($ionicLoading.show);
      });

      it('should call $ionicLoading.hode in stateChangeSuccess', function(){
        ctrl.loadedImages = true;
        ctrl.preloadCalled = true;
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
        ctrl.loadedImages = true;
        ctrl.preloadCalled = true;
        $rootScope.$broadcast('$stateChangeStart', {name: 'login'}, {}, {name: 'fromState'} );
        $rootScope.$digest();
        sinon.assert.calledOnce($ionicLoading.show);
      });
    });

  });
})();
