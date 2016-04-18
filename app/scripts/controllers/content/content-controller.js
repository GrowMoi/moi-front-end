(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentController', function($scope,
                                            content,
                                            ContentService,
                                            ModalService,
                                            $state)
  {
    var vm = this;
    vm.showImage = showImage;
    vm.sendNotes = sendNotes;
    vm.learn = learn;

    activate();

    function activate() {
      vm.content = content;
      vm.media = content.videos.concat(content.media);
      vm.recommendedContents = createGroupedArray(content.recommended, 2);
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
      /*jshint camelcase: false */
      if(vm.content.user_notes !== '' && vm.content.user_notes !== undefined){
        ContentService.addNotesToContent(vm.content);
      }
    }

    function learn() {
      ContentService.learnContent(vm.content).then(function() {
        /*jshint camelcase: false */
        $state.go('neuron', { neuronId: vm.content.neuron_id });
      });
    }

    function createGroupedArray(arr, chunkSize) {
      var groups = [], i;
      for (i = 0; i < arr.length; i += chunkSize) {
          groups.push(arr.slice(i, i + chunkSize));
      }
      return groups;
    }

  });
})();
