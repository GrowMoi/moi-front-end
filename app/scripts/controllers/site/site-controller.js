(function () {
  'use strict';

  angular
    .module('moi.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope,
                          $ionicLoading,
                          $auth,
                          PreloadImage,
                          IMAGES) {

    var site = this,
        images = IMAGES.paths;

    site.loadedImages = false;

    function preloadImages() {
      images = images.map(function(img){
        return img.substring(4); // remove 'app/' of path
      });
      PreloadImage.cache(images).then(function(){
        site.loadedImages = true;
      });
    }

    //This must be the only place where we need to listen stateChanges
    $rootScope.$on('$stateChangeStart', function(event, toState){
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

    preloadImages();
  }
})();
