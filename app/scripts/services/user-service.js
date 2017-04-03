(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('UserService', UserService);

  function UserService($http, ENV, PopupService) {
    var service = {
      profile: profile,
      updateProfile: updateProfile,
      searchProfiles: searchProfiles
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
        url: ENV.apiHost + '/api/search_users',
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
