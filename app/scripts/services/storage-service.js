(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('StorageService', StorageService);

    function StorageService($http, $auth, ENV, PopupService, $state, $translate,$window) {

      var service = {
        get: get,
        update: update,
        changeLanguage: changeLanguage,
        setLanguage: setLanguage
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
          var languageUser = storage.language || $auth.user.language;
          var language = languageUser === 'es' ? 'en' : 'es';
          storage.language = language;
          $translate.use(language);
          update(storage).then(function(){
            $auth.user.language = language;
            $window.location.reload();
          });
        });
      }

      function setLanguage(route){
        var lang = navigator.language || navigator.userLanguage;
        var languageBrowser = lang.slice(0,2);
        get().then(function(value){
          var storage = value.data.storage || {};
          storage.language = languageBrowser;
          $translate.use(languageBrowser);
          update(storage).then(function(){
            $auth.user.language = languageBrowser;
            $state.go(route.state, {
              username: route.user
            });
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
