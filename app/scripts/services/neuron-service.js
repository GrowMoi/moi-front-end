(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('NeuronService', NeuronService);

  function NeuronService($http, ENV, PopupService) {
    var service = {
      getNeuron: getNeuron,
      searchNeurons: searchNeurons
    };
    var popupOptions = { title: 'Error'};

    return service;

    function getNeuron(id) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/neurons/' + id
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
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
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      });
    }
  }
})();
