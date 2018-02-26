(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('StorageService', StorageService);

    function StorageService($http, $ionicPopup, ENV, PopupService) {

      var service = {
        get: get,
        update: update
      };
      var popupOptions = { title: 'Error'};

      return service;

      function get() {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/users/storage',
        }).then(function success(res) {
          return res;
        }, function error(err) {
          errorPopup(err);
          return err;
        });
      }

      function update(storage) {
        return $http({
          method: 'PUT',
          url: ENV.apiHost + '/api/users/storage',
          data: {
            frontendValues: JSON.stringify(storage)
          }
        }).then(function success(res) {
          return res;
        }, function error(err) {
          errorPopup(err);
          return err;
        });
      }

      function errorPopup(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      }
    }
  })();
