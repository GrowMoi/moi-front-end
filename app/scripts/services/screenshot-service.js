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
      html2canvas(elm).then(function(canvas) { // jshint ignore:line
        crop(canvas, 398, 211, 2570, 1440, function(newImageBase64){
          deferred.resolve(newImageBase64);
        });
      });
      return deferred.promise;
    }

    function crop(canvas, offsetX, offsetY, width, height, callback) {
      var buffer = document.createElement('canvas');
      var b_ctx = buffer.getContext('2d'); // jshint ignore:line
      buffer.width = width;
      buffer.height = height;
      b_ctx.drawImage(canvas, offsetX, offsetY, width, height, // jshint ignore:line
                      0, 0, buffer.width, buffer.height);
      callback(buffer.toDataURL());
    }

    function validBase64(value){
      var reg = RegExp(/data:image\/([a-zA-Z]*);base64,([^\"]*)/g); // jshint ignore:line
      return reg.test(value);
    }

    return service;

  }
})();
