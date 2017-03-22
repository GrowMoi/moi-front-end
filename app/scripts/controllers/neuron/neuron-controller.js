(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function ($scope,
              $state,
              user,
              data,
              ModalService) {

    var vmNeuron = this;
    vmNeuron.showGifSearch = false;
    vmNeuron.showGifRead = false;
    vmNeuron.finishedAnimationSearch = finishedAnimationSearch;
    vmNeuron.finishedAnimationRead = finishedAnimationRead;
    vmNeuron.loadedGif = loadedGif;
    vmNeuron.gifLearnActive = true;
    vmNeuron.showCanReadModal = showCanReadModal;
    var dialogCanReadModel = {
      goToMyTree: goToMyTree
    };

    /*jshint camelcase: false */
    function init(){
      vmNeuron.neuron = data;

      vmNeuron.contentsOptions = {
        contents: vmNeuron.neuron.contents,
        settings: user.content_preferences,
        maxLevel: 3,
        minLevel: 1,
        onSelect: onSelectItem
      };

    }

    init();

    function finishedAnimationSearch() {
      $state.go('searches');
    }

    function finishedAnimationRead() {
      $scope.$broadcast('neuron:remove-content');
    }

    function onSelectItem(content) {
      vmNeuron.gifLearnActive = !content.read;
    }

    function loadedGif(key) {
      vmNeuron[key] = true;
    }

    function showCanReadModal() {
      var dialogOptions = {
        parentScope: $scope,
        templateUrl: 'templates/partials/modal-unread.html',
        model: dialogCanReadModel
      };
      ModalService.showModel(dialogOptions);
    }

    function goToMyTree() {
      dialogCanReadModel.closeModal();
      $state.go('tree');
    }
  });

})();
