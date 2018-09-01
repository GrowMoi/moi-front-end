



(function () {
  'use strict';

  angular
    .module('moi.services')
    .factory('GAService', GAService);

  function GAService(ENV) {

    var service = {
      loadScript: loadScript
    };

    return service;

    function loadScript() {
      /*jshint ignore: start */
      (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
      })(window, document, 'script', ENV.gaScriptSrc, 'ga');
      /*jshint ignore: end */
      ga('create', ENV.gaTrackID, 'auto');
      ga('send', 'pageview');
    }

  }
})();
