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
    vm.read = read;

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
      /*jshint camelcase: false */
      ContentService.addNotesToContent(vm.content);
    }

    function read() {
      ContentService.readContent(vm.content).then(function(response) {
        /*jshint camelcase: false */
        if (response.data.perform_test) {
          $state.go('test', { testId: 1, testData: {test: response.data.test_contents} });
        }else{
          $state.go('neuron', { neuronId: vm.content.neuron_id });
        }
      });
    }

  });
})();
