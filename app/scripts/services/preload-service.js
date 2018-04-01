(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('PreloadAssets', PreloadAssets);

  function PreloadAssets($q) {

    var vinetas = [
      {
        depth: 1,
        video: 'videos/vineta_1.mp4'
      },
      {
        depth: 5,
        video: 'videos/vineta_2.mp4'
      },
      {
        depth: 7,
        video: 'videos/vineta_3.mp4'
      },
      {
        depth: 9,
        video: 'videos/vineta_4.mp4'
      }
    ];

    var service = {
      cache: cache,
      shouldPreloadVideo: shouldPreloadVideo
    };

    return service;

    function shouldPreloadVideo(data, storage) {
      var getConfigVineta = storage.tree ? storage.tree.vinetas_animadas : undefined; //jshint ignore:line
      var isDiferentLevel = getConfigVineta ? getConfigVineta.depth !== data.meta.depth : false;
      return getVineta(data.meta.depth) !== '' && (!getConfigVineta || isDiferentLevel) ? getVineta(data.meta.depth) : false;
    }

    function getVineta(depth){
      var vinetaSelected = vinetas.filter(function(item){return item.depth === depth && item.video;});
      return vinetaSelected[0] ? vinetaSelected[0].video : '';
    }

    function cache(resources, updateProgress) {
      if (!(resources.images instanceof Array) && !(resources.sounds instanceof Array) && !(resources.videos instanceof Array)){
        return $q.reject('Input is not an array');
      }

      var promises = formatPromise(resources, updateProgress);

      return $q.all(promises);
    }

    function formatPromise(resources, updateProgress) {
      var promises = [];
      angular.forEach(Object.keys(resources), function(key) {
        angular.forEach(resources[key], function(url, index){
          var deferred = $q.defer(),
              file;
          switch (key) {
            case 'images':
              file = new Image();
              file.onload = function() {
                deferred.resolve(url);
                updateProgress();
              };
              file.onerror = function() {
                deferred.reject(resources[key][index]);
              };
              break;
            case 'sounds':
              file = document.createElement('AUDIO');
              file.addEventListener('canplaythrough', function() {
                deferred.resolve(url);
                updateProgress();
              }, false);
              file.onerror = function() {
                deferred.reject(resources[key][index]);
              };
              break;
            case 'videos':
              file = document.createElement('VIDEO');
              preloadVideo(resources[key][index], deferred, updateProgress);
              break;
            default:
          }
          promises.push(deferred.promise);
          file.src = resources[key][index];
        });
      });

      return promises;
    }

    function preloadVideo(src, deferred, updateProgress) {
      var req = new XMLHttpRequest();
      req.open('GET', src, true);
      req.responseType = 'blob';

      req.onload = function() {
        if (this.status === 200) {
          deferred.resolve();
          updateProgress();
        }
      };
      req.onerror = function() {
        deferred.reject(src);
      };

      req.send();
    }
  }
})();
