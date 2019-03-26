(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('StorageService', StorageService);

    function StorageService($http, $auth, ENV, PopupService, $state, $translate) {

      var service = {
        get: get,
        update: update,
        changeLanguage: changeLanguage
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

      function changeLanguage() {
        get().then(function(value){
          var storage = value.data.storage || {};
          var language = storage.language === 'es' ? 'en' : 'es';
          storage.language = language;
          $translate.use(language);
          $auth.user.language = language;
          update(storage).then(function(){
            $state.reload();
          });
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
