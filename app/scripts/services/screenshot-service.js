(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ScreenshotService', ScreenshotService);

  function ScreenshotService(ENV, $q) {

    var service = {
      getImage: getImage,
      validBase64: validBase64
    };

    function getImage(elm) {
      var deferred = $q.defer();
      var html2canvasOpts = {
        backgroundColor: null,
        allowTaint: false,
        proxy: ENV.imagesProxy,
        useCORS: true
      };
      html2canvas(elm, html2canvasOpts).then(function(canvas) { // jshint ignore:line
        deferred.resolve(canvas.toDataURL());
      });
      return deferred.promise;
    }

    function validBase64(value){
      var reg = RegExp(/data:image\/([a-zA-Z]*);base64,([^\"]*)/g); // jshint ignore:line
      return reg.test(value);
    }

    return service;

  }
})();
