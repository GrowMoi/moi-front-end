(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('NeuronService', NeuronService);

  function NeuronService($http, ENV) {
    var service = {
      getNeuron: getNeuron
    };

    return service;

    function getNeuron(id) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/neurons/' + id
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }
  }
})();
