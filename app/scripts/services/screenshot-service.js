(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ScreenshotService', ScreenshotService);

  function ScreenshotService($q) {

    var service = {
      getImage: getImage,
      validBase64: validBase64
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

    function validBase64(value){
      var reg = RegExp.new(/data:image\/([a-zA-Z]*);base64,([^\"]*)/g);
      return reg.test(value);
    }

    return service;

  }
})();
