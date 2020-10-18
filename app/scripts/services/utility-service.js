(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('UtilityService', UtilityService);

  function UtilityService() {
    var service = {
      isAgentChrome: isAgentChrome,
      splitArrayIntoChunks: splitArrayIntoChunks
    };

    return service;

    function isAgentChrome() {
      var appWeb = document.URL.startsWith('http');
      var chrome = appWeb ? navigator.userAgent.indexOf('Chrome') > -1:false;
      return chrome;
    }

    function splitArrayIntoChunks(arr, chunkSize) {
      var newGroups = [], i;
      for (i = 0; i < arr.length; i += chunkSize) {
        newGroups.push(arr.slice(i, i + chunkSize));
      }
      return newGroups;
    }
  }
})();
