(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('SettingsService', SettingsService);

  function SettingsService($http, ENV, ModalService) {

    var service = {
      saveContentSettings: saveContentSettings,
      orderContentSettings: orderContentSettings
    };
    var dialogContentModel = {
      title: 'Error',
      message: ''
    };

    var dialogOptions = {
      templateUrl: 'templates/partials/modal-error.html',
      model: dialogContentModel
    };

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
        dialogContentModel.message = err.statusText;
        ModalService.showModel(dialogOptions);
      }
    }
  }
})();
