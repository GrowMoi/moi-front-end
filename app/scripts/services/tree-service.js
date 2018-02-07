(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('TreeService', TreeService);

  function TreeService($http, ENV, PopupService) {
    var service = {
      getNeuronsUser: getNeuronsUser
    };
    var popupOptions = { title: 'Error'};

    return service;

    function getNeuronsUser(username, neuronId) {
      var params = {
        username: username
      };
      if(neuronId){
        params.neuronId = neuronId;
      }
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/tree',
        params: params
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
