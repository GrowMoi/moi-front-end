(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('NeuronService', NeuronService);

  function NeuronService($http, ENV) {
    var service = {
      getNeuron: getNeuron,
      searchNeurons: searchNeurons
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

    function searchNeurons(query, page) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/search',
        params: {
          page: page,
          query: query
        }
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }
  }
})();
