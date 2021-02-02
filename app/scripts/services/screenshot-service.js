(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ScreenshotService', ScreenshotService);

  function ScreenshotService(ENV, $q) {

    var service = {
      getBase64Image: getBase64Image,
      validBase64: validBase64,
      getFileImage: getFileImage
    };

    function getImageBase64(elm) {
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

    function getFileImage(elm) {
      var deferred = $q.defer();
      var html2canvasOpts = {
        backgroundColor: null,
        allowTaint: false,
        proxy: ENV.imagesProxy,
        useCORS: true
      };
      html2canvas(elm, html2canvasOpts).then(function(canvas) { // jshint ignore:line
        canvas.toBlob(function (blob) {
          var timestamp = new Date().valueOf();
          var fileName = 'screenshot_' + timestamp + '.png';
          var file = new File([blob], fileName, { type: 'image/png' });// jshint ignore:line
          deferred.resolve(file);
        }, 'image/png');
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
