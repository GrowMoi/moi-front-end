(function () {
  'use strict';

  describe('SiteController', function () {
    var ctrl,
        $controller,
        dependencies,
        $rootScope,
        $ionicLoading,
        $auth,
        $scope,
        IMAGES,
        VIDEOS,
        PreloadAssets,
        TreeService,
        deferredUpload,
        SoundsPage;

    beforeEach(module('moi.controllers'));

    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('IMAGES', {
          paths: ['image/image1', 'image/image2']
        });
        $provide.constant('VIDEOS', {
          paths: ['app/videos/video1']
        });
        $provide.constant('SoundsPage', {
          login: {
            sound: 'xxx.mp3',
            type: 'mp3',
            volume: 0.2
          }
        });
      });
    });

    beforeEach(module('moi.services', function($provide){
      $provide.factory('PreloadAssets', function(){
        return {
          cache: function(){
            return {
              then: function(){
                return null;
              }
            };
          },
          shouldPreloadVideo: function(){
            return {
              then: function(){
                return null;
              }
            };
          }
        };
      });
      $provide.factory('TreeService', function() {
        return {
          getNeuronsUser: function(){
            return {
              then: function(){
                return null;
              }
            };
          }
        };
      });
      $provide.factory('UserService', function($q){
        deferredUpload  = $q.defer();
        return {
          uploadTreeImage: function(){
            return deferredUpload.promise;
          }
        };
      });
      $provide.factory('UserNotificationsService', function(){
        return {
          initialize: function(){
            return null;
          }
        };
      });
      $provide.provider('$state', function () {
        return {
          $get: function () {
            return {
              go: function(){
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
                _PreloadAssets_,
                _SoundsPage_,
                _IMAGES_,
                _VIDEOS_,
                _TreeService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $ionicLoading = { show: sinon.stub(), hide: sinon.stub()};
        PreloadAssets = _PreloadAssets_;
        SoundsPage = _SoundsPage_;
        IMAGES = _IMAGES_;
        VIDEOS = _VIDEOS_;
        TreeService = _TreeService_;
      })
    );

    describe('#listeners', function(){
      beforeEach(function(){
        $auth = { user: {id: 1}};

        dependencies = {
          $ionicLoading: $ionicLoading,
          $scope: $scope,
          $auth: $auth
        };

        ctrl = $controller('SiteController', dependencies);
        ctrl.loadedImages = true;
        ctrl.preloadCalled = true;
      });

      it('should not call $ionicLoading.show in stateChangeStart to login and user', function(){
        $rootScope.$broadcast('$stateChangeStart', {name: 'login'}, {}, {name: 'fromState'});
        $rootScope.$digest();
        sinon.assert.notCalled($ionicLoading.show);
      });

      it('should call $ionicLoading.hode in stateChangeSuccess', function(){
        ctrl.loadedImages = true;
        ctrl.preloadCalled = true;
        $rootScope.$broadcast('$stateChangeSuccess', {name: 'login'}, {}, {name: 'neuron'} );
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
