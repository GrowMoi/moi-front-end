(function () {
  'use strict';

  angular
    .module('moi.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope,
                          $ionicLoading,
                          $auth,
                          PreloadAssets,
                          IMAGES,
                          SOUNDS) {

    var site = this,
        images = IMAGES.paths,
        sounds = SOUNDS.paths;

    site.loadedImages = true; // we need to start as true in login page
    site.preloadCalled = false;

    function preloadAssets() {
      images = images.map(function(img){
        return img.substring(4); // remove 'app/' of path
      });
      sounds = sounds.map(function(snd){
        return snd.substring(4); // remove 'app/' of path
      });
      PreloadAssets.cache({'images': images}).then(function(){
        site.loadedImages = true;
        site.preloadCalled = true;
      });
    }

    //This must be the only place where we need to listen stateChanges
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
      var initApp = (fromState.name === '' && toState.name === 'login');
      var registerApp = (fromState.name === 'register' && toState.name === 'login');
      if (!initApp && !registerApp && !site.preloadCalled && toState.name !== 'register') {
        var getConfigVineta = JSON.parse(localStorage.getItem('vinetas_animadas'));
        var vinetaShowed = getConfigVineta ? true : false;
        site.loadedImages = (toState.name === 'tree' && !vinetaShowed);
        preloadAssets();
      }
      var killedSound = ((fromState.name === 'login' ||  fromState.name === 'register') && toState.name === 'tree');
      if(killedSound){
        $rootScope.$broadcast('vineta:remove-sound');
      }
      if (toState.name === 'login' && $auth.user.id) {
        event.preventDefault();
      }else{
        if (site.loadedImages) {
          $ionicLoading.show({
            template: 'cargando...'
          });
        }
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(){
      if (site.loadedImages) {
        $ionicLoading.hide();
      }
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });
  }
})();
