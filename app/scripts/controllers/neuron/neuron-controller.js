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
