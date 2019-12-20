(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('NeuronService', NeuronService);

  function NeuronService($http, ENV, ModalService) {
    var service = {
      getNeuron: getNeuron,
      searchNeurons: searchNeurons
    };
    var dialogContentModel = {
      title: 'Error',
      message: ''
    };

    var dialogOptions = {
      templateUrl: 'templates/partials/modal-error.html',
      model: dialogContentModel
    };

    return service;

    function getNeuron(id) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/neurons/' + id
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        if(err.status !== 404){
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
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
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
        }
      });
    }
  }
})();
