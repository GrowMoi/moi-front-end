(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function ($scope,
              $state,
              user,
              data,
              ModalService,
              AnimationService) {

    var vmNeuron = this;
    vmNeuron.gifLearnActive = true;
    vmNeuron.showCanReadModal = showCanReadModal;
    vmNeuron.finishedAnimationRead = finishedAnimationRead;
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

      vmNeuron.searchOptions = AnimationService.searchButton({
        finishedAnimation: finishedAnimationSearch
      });

      vmNeuron.learnOptions = AnimationService.learnButton({
        finishedAnimation: finishedAnimationRead
      });

      vmNeuron.shareOptions = AnimationService.shareButton({
        finishedAnimation: finishedAnimationShare
      });
    }

    init();

    function finishedAnimationSearch() {
      $state.go('searches');
    }

    function finishedAnimationRead() {
      $scope.$broadcast('neuron:remove-content');
    }

    function finishedAnimationShare() {
      $scope.$broadcast('neuron:share-content');
    }

    function onSelectItem(content) {
      vmNeuron.gifLearnActive = !content.read;
    }

    function showCanReadModal() {
      if (!vmNeuron.neuron.can_read) {
        var dialogOptions = {
          parentScope: $scope,
          templateUrl: 'templates/partials/modal-unread.html',
          model: dialogCanReadModel
        };
        ModalService.showModel(dialogOptions);
      }
    }

    function goToMyTree() {
      dialogCanReadModel.closeModal();
      $state.go('tree');
    }
  });

})();
