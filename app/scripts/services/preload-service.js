(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('PreloadImage', PreloadImage);

  function PreloadImage($q) {

    var service = {
      Cache: Cache
    };

    return service;

    function Cache(urls) {
      if (!(urls instanceof Array)){
        return $q.reject('Input is not an array');
      }

      var promises = [];

      angular.forEach(urls, function(url, index){
        var deferred = $q.defer();
        var img = new Image();

        img.onload = (function(deferred) {
          return function(){
            deferred.resolve();
          };
        })(deferred);

        img.onerror = (function(deferred,url) {
          return function(){
            deferred.reject(url);
          };
        })(deferred,urls[index]);

        promises.push(deferred.promise);
        img.src = urls[index];
      });

      return $q.all(promises);
    }
  }
})();
