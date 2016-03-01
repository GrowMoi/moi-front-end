(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentController', function($ionicModal, $scope, content, ContentService) {
    var vm = this;

    vm.content = content;
    vm.sendNotes = sendNotes;

    $ionicModal.fromTemplateUrl('templates/partials/modal-image.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      vm.modal = modal;
    });

    $scope.imageSrc = 'images/lluvia_meteoros.jpg';

    vm.showImage = function() {
      vm.modal.show();
    };

    vm.closeModal = function() {
      vm.modal.hide();
    };

    function sendNotes() {
      ContentService.addNotesToContent(vm.content);
    }
  });
})();
