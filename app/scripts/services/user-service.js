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
      getTasks: getTasks,
      deleteTask: deleteTask,
      getNotes: getNotes,
      getNotifications: getNotifications,
      respondNotification: respondNotification,
      addFavorites: addFavorites,
      getFavorites: getFavorites,
      getAchievements: getAchievements,
      getLeaderboard: getLeaderboard,
      deleteNotification: deleteNotification,
      getUserAchievements: getUserAchievements,
      activeAchievement: activeAchievement,
      sharedEmailContent: sharedEmailContent,
      saveCertificate: saveCertificate,
      getCertificates: getCertificates,
      deleteCertificate: deleteCertificate
    };

    var popupOptions = { title: 'Error'};

    return service;

    function profile(username) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/profile',
        params: {
          username: username
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

    function getNotes(page){
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/content_notes',
        params: {
          page: page
        }
      }).then(function success(res) {
        return res.data;
      });
    }

    function getNotifications(page) {
       return $http({
         method: 'GET',
         url: ENV.apiHost + '/api/notifications/',
         params: {
           page: page
         }
       }).then(function success(res) {
         return res.data;
       });
    }

    function respondNotification(res) {
      /*jshint camelcase: false */
      var id = res.id,
          response = res.response;
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/user_tutors/' + id + '/respond',
        data: {'response': response}
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
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
          callbacks: {
            btnCenter: function(){dialogOptions.closeModal();}
          },
          labels: {
            btnCenter: 'Seguir leyendo'
          }
        }
      };
      ModalService.showModel(dialogOptions);
    }

    function deleteTask(content) {
      /*jshint camelcase: false */
      var contentId = content.id,
          neuronId = content.neuron_id;
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/task_update',
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

    function addFavorites(content){
      /*jshint camelcase: false */
      var contentId = content.id,
          neuronId = content.neuron_id;
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/favorites',
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

    function getFavorites(page){
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/content_favorites',
        params: {
          page: page
        }
      }).then(function success(res) {
        return res.data;
      });
    }

    function getAchievements(id){
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/achievements',
        params: {
          /*jshint camelcase: false */
          user_id: id
        }
      }).then(function success(res) {
        return res.data;
      });
    }

    function getLeaderboard(id){
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/leaderboard',
        params: {
          /*jshint camelcase: false */
          user_id: id
        }
      }).then(function success(res) {
        return res.data;
      });
    }

    function deleteNotification(notification){
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/notifications/' + notification.id + '/read_notifications',
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

    function getUserAchievements() {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/achievements'
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      });
    }

    function activeAchievement(id) {
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/users/achievements/'+ id +'/active',
        data: null
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      });
    }

    function sharedEmailContent(params) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/users/shared_contents',
        data: params
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      });
    }

    function saveCertificate(url){
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/users/certificates',
        data: {
          /*jshint camelcase: false */
          media_url: url
        }
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      });
    }

    function getCertificates(page){
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/certificates',
        params: {
          page: page
        }
      }).then(function success(res) {
        return res.data;
      });
    }

    function deleteCertificate(id){
      return $http({
        method: 'DELETE',
        url: ENV.apiHost + '/api/users/certificates/'+ id,
        data:{},
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      });
    }
  }
})();
