(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentController', function($scope, content, ContentService, ModalService) {
    var vm = this;

    vm.content = content;
    vm.sendNotes = sendNotes;

    var modelDate = {};
    modelDate.imageSrc = 'images/lluvia_meteoros.jpg';

    vm.showImage = function() {
      ModalService.showModel({
                parentScope: $scope,
                templateUrl: 'templates/partials/modal-image.html',
                model: modelDate});
    };

    function sendNotes() {
      ContentService.addNotesToContent(vm.content);
    }
  });
})();
