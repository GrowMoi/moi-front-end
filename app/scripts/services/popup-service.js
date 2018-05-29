(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('PopupService', PopupService);

  function PopupService($mdDialog) {
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
          $mdDialog.confirm(myOptions).then(callback);
          break;
        default:
          $mdDialog.alert(myOptions).then(callback);
      }

    }
  }
})();
