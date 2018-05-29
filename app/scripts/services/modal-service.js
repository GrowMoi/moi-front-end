(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ModalService', ModalService);

  function ModalService($mdDialog, $rootScope) {
    var service = {
          showModel: showModel
        },
        modalOptions = { // Default modal options
          animation: 'slide-in-up'
        };

    return service;

    function showModel(options) {
      // Extend defaults with options passed in
      angular.extend(modalOptions, options);

      var modalMoi = { scope: $rootScope.$new() };

      modalMoi.scope.model = options.model;
      $mdDialog.alert(modalOptions.templateUrl, {
        scope: modalMoi.scope,
        animation: modalOptions.animation,
        backdropClickToClose: false
      }).then(function(modalInstance) {
        modalMoi.scope.model.closeModal = function() {
          closeAndRemove(modalInstance);
        };
        modalInstance.show();
      });
    }

    function closeAndRemove(modalInstance) {
      return modalInstance.hide()
                .then(function () {
                    return modalInstance.remove();
                });
    }

  }
})();
