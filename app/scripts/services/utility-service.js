(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('UtilityService', UtilityService);

  function UtilityService() {
    var service = {
      isAgentChrome: isAgentChrome
    };

    return service;

    function isAgentChrome() {
      var appWeb = document.URL.startsWith('http');
      var chrome = appWeb ? navigator.userAgent.indexOf('Chrome') > -1:false;
      return chrome;
    }
  }
})();
