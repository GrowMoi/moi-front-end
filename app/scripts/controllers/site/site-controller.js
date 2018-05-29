(function () {
  'use strict';

  angular
    .module('moi.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope,
                          $ionicLoading,
                          $auth,
                          PreloadAssets,
                          StorageService,
                          ScreenshotService,
                          UserService,
                          UserNotificationsService,
                          $timeout,
                          $state,
                          $scope,
                          SoundsPage,
                          TreeService,
                          IMAGES,
                          VIDEOS) {
    var site = this,
        images = IMAGES.paths,
        imageSaved = false,
        callApiSaveImage = 0;

    UserNotificationsService.initialize();

    site.loadedImages = true; // we need to start as true in login page
    site.preloadCalled = false;
    site.progress = 0;
    site.rawProgress = 0;
    site.idsTreeScreen = {
      view: 'tree-screen',
      baseTree: 'base-tree'
    };

    var videos = VIDEOS.paths;
    var updateProfile = 'profileEdit';

    function preloadAssets(data, storage) {
      site.loadedImages = false;
      var validPaths = ['images/view-elements', 'images/sprites'];
      var filterImages = filterImagesByPath(images, validPaths);
      var itemsToPreload = {
        images: filterImages
      };
      var shouldPreloadVideo = data ? PreloadAssets.shouldPreloadVideo(data, storage) : false;
      if (shouldPreloadVideo) {
        itemsToPreload.videos = videos.map(function(vdo) {
          return vdo.substring(4);
        });
      }
      var progressValue = 100 / Object.keys(itemsToPreload)
        .map(function(key) {return itemsToPreload[key].length;})
        .reduce(function(a, b) {return a+b;});

      PreloadAssets.cache(itemsToPreload, function() {updateProgress(progressValue);})
        .then(function(){
          $timeout(function() {
            site.loadedImages = true;
            site.preloadCalled = true;
            if((($auth.user || {}).username || '').indexOf('moi-') >= 0) {
              $state.go(updateProfile);
            }
          }, 500);
        });
    }

    function updateProgress(value) {
      var newProgressValue = site.rawProgress + value;
      site.rawProgress = newProgressValue;
      site.progress = Math.round(newProgressValue);
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
        'login': false,
        'register': false,
        /*jshint camelcase: false */
        'new_login.first_step': false,
        'new_login.second_step': false,
      };
      var activePreload = notPreload[toState.name] === undefined ? true : notPreload[toState.name];
      if (activePreload && !site.preloadCalled && $auth.user.id) {
        site.loadedImages = false;
        if(toState.name === 'tree'){
          var username = $auth.user.username;
          TreeService.getNeuronsUser(username).then(function(data) {
            StorageService.get().then(function(resp) {
              preloadAssets(data, resp.data.storage);
            });
          });
        } else {
          preloadAssets();
        }
      }
      if (!activePreload && $auth.user.id) {
        event.preventDefault();
      }else{
        if (site.loadedImages && $auth.user.id) {
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
      site.soundPage =  SoundsPage[toState.name] || {};
      site.soundPage.volume = site.soundPage.volume ? site.soundPage.volume : 1;
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });

    $rootScope.$on('loading:finish', function (){
      if ( $state.current.name === 'tree' && !imageSaved && $auth.user.id) {
        $timeout(function(){
          var view = document.getElementById(site.idsTreeScreen.view),
              baseTree = document.getElementById(site.idsTreeScreen.baseTree);
          if (view && baseTree && callApiSaveImage === 0 && imageSaved === false) {
            callApiSaveImage = 1;
            ScreenshotService.getImage(view).then(function(img){
              if (ScreenshotService.validBase64(img)) {
                UserService.uploadTreeImage(img)
                  .then(function(resp) {
                    imageSaved = true;
                    callApiSaveImage = 0;
                    /*jshint camelcase: false */
                    var response = resp || {},
                        user = response.user || {};
                    $auth.user.tree_image = user.tree_image.url;
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
