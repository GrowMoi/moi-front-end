(function () {
  'use strict';

  angular
    .module('moi.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope,
                          $ionicLoading,
                          $auth,
                          PreloadAssets,
                          ScreenshotService,
                          UserService,
                          $timeout,
                          $state,
                          $scope,
                          IMAGES,
                          SOUNDS) {

    var site = this,
        images = IMAGES.paths,
        sounds = SOUNDS.paths,
        imageSaved = false,
        callApiSaveImage = 0;

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

    $rootScope.$on('loading:finish', function (){
      if ( $state.current.name === 'tree' && !imageSaved) { //save image one time by visit page
        $timeout(function(){
          var elm = document.getElementById('screen');
          if (elm && callApiSaveImage === 0 && imageSaved === false) {
            callApiSaveImage = 1;
            ScreenshotService.getImage(elm).then(function(img){
              if (ScreenshotService.validBase64(img)) {
                UserService.uploadTreeImage(img)
                  .then(function(resp) {
                    imageSaved = true;
                    callApiSaveImage = 0;
                    /*jshint camelcase: false */
                    if (resp) {
                      $auth.user.tree_image = resp.user.tree_image.url;
                    }
                  });
              }
            });
          }
        }, 500);
      }else{
        imageSaved = false;
        callApiSaveImage = 0;
      }
    });

  }
})();
