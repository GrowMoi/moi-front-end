(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('TreeService', TreeService);

  function TreeService($http, ENV) {
    var service = {
      getNeuronsUser: getNeuronsUser
    };

    return service;

    function getNeuronsUser() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/neurons'
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }
  }
})();
