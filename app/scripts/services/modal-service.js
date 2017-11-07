(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ModalService', ModalService);

  function ModalService($ionicModal, $rootScope) {
    var service = {
      showModel: showModel,
      destroy: destroy
    };
    var modalInstance,
        modalOptions = { // Default modal options
          animation: 'slide-in-up'
        };

    return service;

    function showModel(options) {
      // Extend defaults with options passed in
      angular.extend(modalOptions, options);

      var modalMoi = {
        scope: null
      };

      // Create a new scope
      if (modalOptions.parentScope) {
        modalMoi.scope = modalOptions.parentScope.$new();
      }
      else {
        modalMoi.scope = $rootScope.$new();
      }

      modalMoi.scope.model = options.model;
      $ionicModal.fromTemplateUrl(modalOptions.templateUrl, {
        scope: modalMoi.scope,
        animation: modalOptions.animation,
        backdropClickToClose: false
      }).then(function(modal) {
        modalInstance = modal;
        modalInstance.show();
      });

      modalMoi.scope.model.closeModal = destroy;
    }

    function destroy() {
      modalInstance.remove()
      .then(function() {
        if (modalOptions.onHide) {
          modalOptions.onHide(modalInstance);
        }
        modalInstance = null;
      });
    }

  }
})();
