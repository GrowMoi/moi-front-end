(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function ($scope,
              $state,
              user,
              data,
              ModalService,
              AnimationService,
              UserService) {

    var vmNeuron = this;
    vmNeuron.gifLearnActive = true;
    vmNeuron.showCanReadModal = showCanReadModal;
    vmNeuron.finishedAnimationRead = finishedAnimationRead;
    var contentSelected;
    var dialogContentModel = {
      message: 'Para aprender este concepto, aún debes superar algunos conceptos previos',
      modalCallbak: modalCallbak,
      type: 'confirm',
      btnOkLabel: 'Seguir leyendo',
      btnCancelLabel: 'Regresar a mi arbol'
    };

    /*jshint camelcase: false */
    function init(){
      vmNeuron.neuron = data;
      contentSelected = data.contents[0].id;
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

      vmNeuron.saveTasksOptions = AnimationService.saveTasksButton({
        finishedAnimation: finishedAnimationsaveTasks
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

    function finishedAnimationsaveTasks() {
      UserService.addTasks(contentSelected).then(function(response) {
        if(response.data.exist){
          dialogContentModel = {
            message: 'Este contenido ya esta en tus tareas, intentar guardar un contenido diferente.',
            type: 'alert',
            btnOkLabel: 'Seguir leyendo',
          };
          showModal();
        }
      });
    }

    function onSelectItem(content) {
      vmNeuron.gifLearnActive = !content.read;
      contentSelected = content;
    }

    function showModal() {
      var dialogOptions = {
        parentScope: $scope,
        templateUrl: 'templates/partials/modal-alert-content.html',
        model: dialogContentModel
      };
      ModalService.showModel(dialogOptions);
    }

    function showCanReadModal() {
      if (!vmNeuron.neuron.can_read) {
        showModal();
      }
    }

    function modalCallbak() {
      dialogContentModel.closeModal();
      $state.go('tree');
    }
  });

})();
