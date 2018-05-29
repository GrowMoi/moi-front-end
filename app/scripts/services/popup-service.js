(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('PopupService', PopupService);

  function PopupService($ionicPopup) {
    var service = {
      showModel: showModel
    };

    return service;

    function showModel(type, options, callback) {

      // Default modal options
      var myOptions = {
        title: 'Ups!',
      };

      // Extend defaults with options passed in
      angular.extend(myOptions, options);

      switch (type) {
        case 'confirm':
          $ionicPopup.confirm(myOptions).then(callback);
          break;
        default:
          $ionicPopup.alert(myOptions).then(callback);
      }

    }
  }
})();
