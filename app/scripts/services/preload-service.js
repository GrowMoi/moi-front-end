(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('PreloadImage', PreloadImage);

  function PreloadImage($q) {

    var service = {
      cache: cache
    };

    return service;

    function cache(resources) {
      if (!(resources.images instanceof Array) && !(resources.sounds instanceof Array)){
        return $q.reject('Input is not an array');
      }

      var promises = formatPromise(resources);

      return $q.all(promises);
    }

    function formatPromise(resources) {
      var promises = [];
      angular.forEach(Object.keys(resources), function(key) {
        angular.forEach(resources[key], function(url, index){
          var deferred = $q.defer(),
              file;

          if(key === 'images'){
            file = new Image();
            file.onload = (function(deferred) {
              return function(){
                deferred.resolve();
              };
            })(deferred);
          }else if(key === 'sounds'){
            file = new Audio();
            file.addEventListener('canplaythrough', (function(deferred) {
              return function(){
                deferred.resolve();
              };
            })(deferred), false);
          }

          file.onerror = (function(deferred,url) {
            return function(){
              deferred.reject(url);
            };
          })(deferred,resources[key][index]);

          promises.push(deferred.promise);
          file.src = resources[key][index];
        });
      });

      return promises;
    }
  }
})();
