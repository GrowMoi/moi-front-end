(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ModalService', ModalService);

  function ModalService($ionicModal, $rootScope) {
    var service = {
      showModel: showModel
    };

    return service;

    function showModel(options) {

      // Default modal options
      var myOptions = {
        animation: 'slide-in-up'
      };

      // Extend defaults with options passed in
      angular.extend(myOptions, options);

      var modalMoi = {
        scope: null
      };

      // Create a new scope
      if (myOptions.parentScope) {
        modalMoi.scope = myOptions.parentScope.$new();
      }
      else {
        modalMoi.scope = $rootScope.$new();
      }

      modalMoi.scope.model = options.model;
      $ionicModal.fromTemplateUrl(myOptions.templateUrl, {
        scope: modalMoi.scope,
        animation: myOptions.animation,
        backdropClickToClose: false
      }).then(function(modal) {
        modalMoi.scope.modal = modal;
        modalMoi.scope.modal.show();
      });

      modalMoi.scope.model.closeModal = function () {
        modalMoi.scope.modal.remove()
        .then(function() {
          modalMoi.scope.modal = null;
        });
      };

    }

  }
})();
