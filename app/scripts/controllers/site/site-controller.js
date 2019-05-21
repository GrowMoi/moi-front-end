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
                          $translate,
                          SoundsPage,
                          TreeService,
                          $location,
                          GAService,
                          IMAGES,
                          VIDEOS,
                          AdvicesPage,
                          AdvicesPageEn,
                          ModalService,
                          TooltipsService,
                          EventsService) {
    var site = this,
        images = IMAGES.paths,
        imageSaved = false,
        callApiSaveImage = 0,
        isShowingPassiveModal = false;

    UserNotificationsService.initialize();

    site.loadedImages = true; // we need to start as true in login page
    site.preloadCalled = false;
    site.progress = 0;
    site.rawProgress = 0;
    site.idsTreeScreen = {
      view: 'tree-screen',
      baseTree: 'base-tree'
    };
    //init nofitications in passive time
    if(!localStorage.getItem('advicesOn')){
      localStorage.setItem('advicesOn', 'true');
    }

    //init pagesViewed for passive messages
    if(!localStorage.getItem('pagesViewed')){
      localStorage.setItem('pagesViewed', JSON.stringify({}));
    }

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
      TooltipsService.removeAllTooltips();
      var activePreload = notPreload[toState.name] === undefined ? true : notPreload[toState.name];
      if (activePreload && !site.preloadCalled && $auth.user.id) {
        site.loadedImages = false;
        if(toState.name === 'tree'){
          var username = $auth.user.username;
          if ($auth && $auth.user.level > 4) {
            localStorage.setItem('advicesOn', 'false');
          }
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
        var language = $auth.user.language;
        var languageTemplate = language === 'es' ? 'cargando ...' : 'loading...';
        if (site.loadedImages && $auth.user.id) {
          $ionicLoading.show({
            template: languageTemplate
          });
        }
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState){
      var path = $location.path();

      if (toState.name === 'neuron') {
        path = '/neuron';
      } else if (toState.name === 'content') {
        path = '/neuron/content/';
      } else if (toState.name === 'profile') {
        path = '/user/profile';
      } else if (toState.name === 'tree') {
        path = '/tree';
      }

      GAService.track('set', 'page', path);
      GAService.track('send', 'pageview');

      if (site.loadedImages) {
        $ionicLoading.hide();
      }

      //load daily events
      if(!localStorage.getItem('seenDailyEvents') && toState.name === 'neuron'){
        EventsService.showDailyEvents();
      }

      site.soundPage =  SoundsPage[toState.name] || {};
      site.soundPage.volume = site.soundPage.volume ? site.soundPage.volume : 1;
      site.advicePage = AdvicesPage[toState.name];
      handlePagesViewed(toState);
      if(toState.name === 'new_login.first_step' || toState.name === 'new_login.second_step' || toState.name === 'register' || toState.name ==='login'){
        var lang = navigator.language || navigator.userLanguage;
        var languageBrowser = lang.slice(0,2);
        site.advicePage = languageBrowser === 'es' ? AdvicesPage[toState.name] : AdvicesPageEn[toState.name];
        $translate.use(languageBrowser);
      }
      else {
        StorageService.get().then(function(value){
          var storage = value.data.storage || {};
          site.advicePage = storage.language === 'es' ? AdvicesPage[toState.name] : AdvicesPageEn[toState.name];
          $translate.use(storage.language);
        });
      }
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
                    $rootScope.$broadcast('scanner-started', { any: user });
                  });
              }
            });
          }
        }, 700);
      }else{
        imageSaved = false;
        callApiSaveImage = 0;
      }
    });

    $scope.$on('IdleStart', showPassiveModal);

    function showPassiveModal() {
      var isActiveMessages = (localStorage.getItem('advicesOn') === 'true');
      if(site.advicePage && !isShowingPassiveModal && $state.current.name !== 'tree' && isActiveMessages){
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-pasive-info.html',
          animation: 'animated flipInX',
          backdropClickToClose: true,
          model: {
            message: site.advicePage.messages[0],
            type: 'passive',
            cssClass: site.advicePage.position || 'modal-bottomRight'
          },
          onHide: function() {
            isShowingPassiveModal = false;
          }
        };

        if(site.advicePage.messages.length > 1){
          var keyAdvice = $state.current.name + '_advice';
          var lastIndexAdvice = parseInt(localStorage.getItem(keyAdvice)) || 0;
          dialogOptions.model.message = site.advicePage.messages[lastIndexAdvice];
          dialogOptions.onHide = function() {
            var nexIndexAdvice = (lastIndexAdvice < site.advicePage.messages.length-1) ? lastIndexAdvice + 1 : 0;
            localStorage.setItem(keyAdvice, nexIndexAdvice);
            isShowingPassiveModal = false;
          };
        }

        ModalService.showModel(dialogOptions);
        isShowingPassiveModal = true;
      }
    }

    function handlePagesViewed(state) {
      var currentPage = state.name;
      if(currentPage !== 'tree') {
        var pagesViewed = JSON.parse(localStorage.getItem('pagesViewed'));
        if(!pagesViewed[currentPage]){
          //show passive model messages when enter for first time into the page
          $timeout(showPassiveModal);
        }
        pagesViewed[currentPage] = true;
        localStorage.setItem('pagesViewed', JSON.stringify(pagesViewed));
      }
    }
  }
})();
