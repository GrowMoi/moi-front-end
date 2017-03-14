(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('SettingsService', SettingsService);

  function SettingsService($http, $ionicPopup, ENV, PopupService) {

    var service = {
      saveContentSettings: saveContentSettings,
      orderContentSettings: orderContentSettings
    };
    var popupOptions = { title: 'Error'};

    return service;

    function saveContentSettings(setting) {
      var kind = setting.kind,
          level = setting.level;

      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/content_preferences/' + kind,
        data: {
          level: level
        }
      }).then(function success(res) {
        return res;
      }, function error(err) {
        errorPopup(err);
        return err;
      });
    }

    function orderContentSettings(inorder) {
      return $http({
        method: 'PUT',
        url: ENV.apiHost + '/api/order_preferences',
        data: {
          inorder: JSON.stringify(inorder)
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
