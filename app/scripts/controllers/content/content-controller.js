(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentController', function($scope, content, ContentService, ModalService) {
    var vm = this;
    vm.showImage = showImage;

    vm.content = content;
    vm.sendNotes = sendNotes;

    var modelDate = {};

    activate();

    function activate() {
      vm.content = content;
      vm.sendNotes = sendNotes;
    }

    function showImage(urlImage) {
      modelDate.imageSrc = urlImage;
      ModalService.showModel({
                parentScope: $scope,
                templateUrl: 'templates/partials/modal-image.html',
                model: modelDate});
    }

    function sendNotes() {
      ContentService.addNotesToContent(vm.content);
    }
  });
})();
