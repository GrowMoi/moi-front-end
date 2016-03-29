(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentController', function($scope,
                                            content,
                                            ContentService,
                                            ModalService,
                                            $ionicPopup)
  {
    var vm = this;
    vm.showImage = showImage;
    vm.sendNotes = sendNotes;
    vm.learn = learn;

    activate();

    function activate() {
      vm.content = content;
      vm.media = content.videos.concat(content.media);
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

    function learn() {
      ContentService.learnContent(vm.content).then(function(){
        $ionicPopup.alert({
          title: 'Contenido Aprendido!'
        });
      });
    }
  });
})();
