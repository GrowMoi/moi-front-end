(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('SettingsService', SettingsService);

  function SettingsService($http, $ionicPopup, ENV, PopupService) {

    var service = {
      saveContentSettings: saveContentSettings
    };
    var popupOptions = { title: 'Error'};

    return service;

    function saveContentSettings(setting) {
      var kind = setting.kind,
          level = setting.level;

      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/content_preferences/' + kind,
        data: {level: level}
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
        return err;
      });
    }
  }
})();
