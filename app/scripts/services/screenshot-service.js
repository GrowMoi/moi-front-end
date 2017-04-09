(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ScreenshotService', ScreenshotService);

  function ScreenshotService($q) {

    var service = {
      getImage: getImage
    };

    function getImage(elm) {
      var deferred = $q.defer();
      html2canvas(elm, { // jshint ignore:line
        onrendered: function (cv){
          var img = cv.toDataURL('image/png');
          deferred.resolve(img);
        }
      });
      return deferred.promise;
    }

    return service;

  }
})();
