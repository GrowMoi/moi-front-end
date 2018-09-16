(function () {
  'use strict';

  angular
    .module('moi.services')
    .factory('GAService', GAService);

  function GAService(ENV, $location) {

    var service = {
      loadScript: loadScript,
      track: track
    };

    return service;

    function loadScript(userId) {
      /*jshint ignore: start */
      (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
      /*jshint ignore: end */
      if (userId) {
        ga('create', ENV.gaTrackID, 'auto', { userId: userId });
      } else {
        ga('create', ENV.gaTrackID, 'auto');
      }

      if ($location.host() === 'localhost' || $location.host() === '127.0.0.1') {
        ga('set', 'sendHitTask', null);
      }

    }

    function track() {
      return ga.apply(this, arguments);
    }
  }
})();