(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('UserService', UserService);

  function UserService($http, ENV, PopupService) {
    var service = {
      profile: profile,
      updateProfile: updateProfile,
      searchProfiles: searchProfiles,
      uploadTreeImage: uploadTreeImage
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

  }
})();
