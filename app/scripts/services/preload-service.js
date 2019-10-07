(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('PreloadAssets', PreloadAssets);

  function PreloadAssets($q) {

    var service = {
      cache: cache
    };

    return service;

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
