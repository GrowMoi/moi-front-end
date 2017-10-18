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
                          UserNotificationsService,
                          $timeout,
                          $state,
                          $scope,
                          SoundsPage,
                          IMAGES,
                          SOUNDS) {
    var site = this,
        images = IMAGES.paths,
        sounds = SOUNDS.paths,
        imageSaved = false,
        callApiSaveImage = 0;

    UserNotificationsService.initialize();

    site.loadedImages = true; // we need to start as true in login page
    site.preloadCalled = false;

    function preloadAssets() {
      site.loadedImages = false;
      var validPaths = ['images/view-elements', 'images/sprites'];
      var filterImages = filterImagesByPath(images, validPaths);
      sounds = sounds.map(function(snd){
        var route = matchRouteAssets(snd);
        return route;
      });
      PreloadAssets.cache({images: filterImages, sounds: sounds}).then(function(){
        site.loadedImages = true;
        site.preloadCalled = true;
      });
    }

    function filterImagesByPath(images, paths ) {
      var result = [];
      angular.forEach(images, function(img){
        var route = matchRouteAssets(img),
            isValid = !!startsWithPath(route, paths);
        if (isValid) {
          result.push(route);
        }
      });
      return result;
    }

    function startsWithPath(route, paths) {
      var valid = paths.find(function(path){
        if (route.startsWith(path)) {
          return true;
        }
      });
      return valid;
    }

    function matchRouteAssets(route) {
      var initialPath = route.substring(0,3);
      return (initialPath === 'app') ? route.substring(4) : route;
    }

    //This must be the only place where we need to listen stateChanges
    $rootScope.$on('$stateChangeStart', function(event, toState){
      var notPreload = {
        login: false,
        register: false
      };
      var activePreload = notPreload[toState.name] === undefined ? true : notPreload[toState.name];
      if (activePreload && !site.preloadCalled) {
        preloadAssets();
      }
      if ((toState.name === 'login' || toState.name === 'register') && $auth.user.id) {
        event.preventDefault();
      }else{
        if (site.loadedImages) {
          $ionicLoading.show({
            template: 'cargando...'
          });
        }
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState){
      if (site.loadedImages) {
        $ionicLoading.hide();
      }
      site.soundPage =  SoundsPage[toState.name];
      site.soundPage.volume = SoundsPage[toState.name].volume ? SoundsPage[toState.name].volume : 1;
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });

    $rootScope.$on('loading:finish', function (){
      if ( $state.current.name === 'tree' && !imageSaved) { //save image one time by visit page
        $timeout(function(){
          var view = document.getElementById('screen');
          var baseTree = document.getElementById('base-tree');
          if (view && baseTree && callApiSaveImage === 0 && imageSaved === false) {
            callApiSaveImage = 1;
            ScreenshotService.getImage(view).then(function(img){
              if (ScreenshotService.validBase64(img)) {
                UserService.uploadTreeImage(img)
                  .then(function(resp) {
                    imageSaved = true;
                    callApiSaveImage = 0;
                    /*jshint camelcase: false */
                    $auth.user.tree_image = resp.user.tree_image.url;
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
