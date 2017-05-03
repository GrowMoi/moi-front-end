(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('UserService', UserService);

  function UserService($http, ENV, PopupService, $state, ModalService) {
    var service = {
      profile: profile,
      updateProfile: updateProfile,
      searchProfiles: searchProfiles,
      uploadTreeImage: uploadTreeImage,
      addTasks: addTasks,
      recommendedNeuron: recommendedNeuron,
      getTasks: getTasks
    };

    var popupOptions = { title: 'Error'};

    return service;

    function profile(id) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/' + id + '/profile'
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      });
    }

    function updateProfile(user){
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/users/account',
        data:user
      });
    }

    function searchProfiles(query, page) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/search',
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

    function uploadTreeImage(dataURL) {
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/users/tree_image',
        data: {
          image: dataURL
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

    function addTasks(content){
      /*jshint camelcase: false */
      var contentId = content.id,
          neuronId = content.neuron_id;
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/tasks',
        data: {}
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      });
    }

    function getTasks(page){
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/content_tasks',
        params: {
          page: page
        }
      }).then(function success(res) {
        return res.data;
      });
    }

    function recommendedNeurons() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/recommended_neurons'
      }).then(function success(res) {
        return res.data;
      });
    }

    function recommendedNeuron(neuronId) {
      recommendedNeurons().then(function(data) {
        var resp = randomRecommendation(data.neurons, neuronId),
            totalRecomendations = resp.totalRecomendations,
            msg = {
              '0': 'Todos los contenidos ya han sido aprendidos.',
              '1': 'Debes leer y aprobar estos contenidos para recibir una nueva recomendación.'
            };
        if (totalRecomendations > 1) {
          goToNeuron(resp.neuron);
        }else{
          showRecomendationModal(msg[totalRecomendations]);
        }
      });
    }

    function goToNeuron(neuron) {
      $state.go('neuron', {
        neuronId: neuron.id
      });
    }

    function randomRecommendation(neurons, neuronId) {
      var totalRecomendations = neurons.length;
      if (totalRecomendations !== 0) {
        var neuron = randomElement(neurons);
        if (totalRecomendations !== 1 && neuronId === neuron.id) {
          return randomRecommendation(neurons, neuronId);
        }
        return {
          neuron: neuron,
          totalRecomendations: totalRecomendations
        };
      }else{
        return {
          neuron: null,
          totalRecomendations: totalRecomendations
        };
      }
    }

    function randomElement(neurons) {
      return neurons[Math.floor(Math.random() * neurons.length)];
    }

    function showRecomendationModal(msg) {
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-alert-content.html',
        model: {
          message: msg,
          type: 'alert',
          btnOkLabel: 'Seguir leyendo'
        }
      };
      ModalService.showModel(dialogOptions);
    }

  }
})();
