(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ModalService', ModalService);

  function ModalService($ionicModal, $rootScope) {
    var service = {
          showModel: showModel
        },
        modalOptions = { // Default modal options
          animation: 'slide-in-up',
          backdropClickToClose: false,
          onHide: function(){}
        };

    return service;

    function showModel(options) {
      // Extend defaults with options passed in
      angular.extend(modalOptions, options);

      var modalMoi = { scope: $rootScope.$new() };

      modalMoi.scope.model = options.model;
      $ionicModal.fromTemplateUrl(modalOptions.templateUrl, {
        scope: modalMoi.scope,
        animation: modalOptions.animation,
        backdropClickToClose: modalOptions.backdropClickToClose
      }).then(function(modalInstance) {
        modalMoi.scope.model.closeModal = function() {
          closeAndRemove(modalInstance);
          modalOptions.onHide();
        };
        if(modalOptions.model.type === 'passive'){
          var cssClass = modalOptions.model.cssClass || 'my-custom-modal';
          modalInstance.$el.addClass(cssClass);
        }
        modalInstance.show().then(modalOptions.model.shown);
      });

      // Execute action on hide modal
      modalMoi.scope.$on('modal.hidden', function() {
        modalOptions.onHide();
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
