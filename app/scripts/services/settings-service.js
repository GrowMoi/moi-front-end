(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('SettingsService', SettingsService);

  function SettingsService($http, $ionicPopup, ENV) {

    var service = {
      saveContentSettings: saveContentSettings
    };

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
        $ionicPopup.alert({
          title: 'Ups!',
          content: 'Ha ocurrido un error'
        });
        return err;
      });
    }
  }
})();
