(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentController', function($scope, content, ContentService, ModalService) {
    var vm = this;
    vm.showImage = showImage;

    vm.content = content;
    vm.sendNotes = sendNotes;
    vm.media = content.videos.concat(content.media);

    activate();

    function activate() {
      vm.content = content;
      vm.sendNotes = sendNotes;
    }

    function showImage(urlImage) {
      var modelData = {};
      modelData.contentSrc = urlImage;
      modelData.isImage = true;
      ModalService.showModel({
                parentScope: $scope,
                templateUrl: 'templates/partials/modal-image.html',
                model: modelData});
    }

    function sendNotes() {
      ContentService.addNotesToContent(vm.content);
    }
  });
})();
