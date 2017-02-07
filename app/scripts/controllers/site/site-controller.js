(function () {
  'use strict';

  angular
    .module('moi.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope,
                          $ionicLoading,
                          $auth,
                          PreloadImage,
                          IMAGES,
                          SOUNDS) {

    var site = this,
        images = IMAGES.paths,
        sounds = SOUNDS.paths;

    site.loadedImages = true; // we need to start as true in login page
    site.preloadCalled = false;

    function preloadImages() {
      site.loadedImages = false;
      images = images.map(function(img){
        return img.substring(4); // remove 'app/' of path
      });
      sounds = sounds.map(function(snd){
        return snd.substring(4); // remove 'app/' of path
      });
      PreloadImage.cache({'images': images, 'sounds': sounds}).then(function(){
        site.loadedImages = true;
        site.preloadCalled = true;
      });
    }

    //This must be the only place where we need to listen stateChanges
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
      var initApp = (fromState.name === '' && toState.name === 'login');
      if (!initApp && !site.preloadCalled) {
        preloadImages();
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
