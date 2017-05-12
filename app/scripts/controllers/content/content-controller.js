(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('ContentController', function($scope,
                                              content,
                                              ContentService,
                                              ModalService,
                                              TestService,
                                              $state,
                                              AnimationService,
                                              SocialService,
                                              UserService) {
      var vmContent = this;
      vmContent.showImage = showImage;
      vmContent.sendNotes = sendNotes;
      vmContent.showCanReadModal = showCanReadModal;
      vmContent.finishedAnimationRead = finishedAnimationRead;

      vmContent.searchOptions = AnimationService.getButton({
        key: 'search',
        callbacks: {
          finishedAnimation: finishedAnimationSearch
        }
      });

      vmContent.learnOptions = AnimationService.getButton({
        key: 'learn',
        callbacks: {
          finishedAnimation: finishedAnimationRead
        }
      });

      vmContent.shareOptions = AnimationService.getButton({
        key: 'share',
        callbacks: {
          finishedAnimation: finishedAnimationShare
        }
      });

      vmContent.recomendationOptions = AnimationService.getButton({
        key: 'recomendation',
        callbacks: {
          finishedAnimation: finishedAnimationRecomendation
        }
      });

      vmContent.saveTasksOptions = AnimationService.getButton({
        key: 'saveTasks',
        callbacks: {
          finishedAnimation: finishedAnimationsaveTasks
        }
      });

      vmContent.showTasksOptions = AnimationService.getButton({
        key: 'showTasks',
        callbacks: {
          finishedAnimation: finishedAnimationShowTasks
        }
      });

      var dialogContentModel = {
        message: 'Para aprender este concepto, aún debes superar algunos conceptos previos',
        modalCallbak: modalCallbak,
        type: 'confirm',
        btnOkLabel: 'Seguir leyendo',
        btnCancelLabel: 'Regresar a mi arbol'
      };

      activate();

      function activate() {
        vmContent.content = content;
        vmContent.media = content.videos.concat(content.media);
        vmContent.gifLearnActive = !content.read;
      }

      function showImage(urlImage) {
        var modelData = {};
        modelData.contentSrc = urlImage;
        modelData.isImage = true;
        ModalService.showModel({
          parentScope: $scope,
          templateUrl: 'templates/partials/modal-image.html',
          model: modelData
        });
      }

      function sendNotes() {
        /*jshint camelcase: false */
        ContentService.addNotesToContent(vmContent.content);
      }

      function finishedAnimationSearch() {
        $state.go('searches');
      }

      function finishedAnimationShare() {
        var data = {
          title: vmContent.content.title,
          media: vmContent.content.media[0],
          description: vmContent.content.description
        };
        SocialService.showModal(data);
      }

      function finishedAnimationRead() {
        ContentService.readContent(vmContent.content).then(function(response) {
          /*jshint camelcase: false */
          if (response.data.perform_test) {
            TestService.goTest($scope, response.data.test);
          } else {
            $state.go('neuron', {
              neuronId: vmContent.content.neuron_id
            });
          }
        });
      }

      function finishedAnimationsaveTasks() {
        UserService.addTasks(vmContent.content).then(function(response) {
          if(response.data.exist){
            dialogContentModel = {
              message: 'Ya guardaste este contenido. Trata de guardar un contenido nuevo.',
              type: 'alert',
              btnOkLabel: 'Seguir leyendo',
            };
            showCanReadModal();
          }else{
            /*jshint camelcase: false */
            $state.go('neuron', {
              neuronId: vmContent.content.neuron_id
            });
          }
        });
      }

      function finishedAnimationShowTasks() {
        $state.go('tasks');
      }

      function showCanReadModal() {
        var dialogOptions = {
          parentScope: $scope,
          templateUrl: 'templates/partials/modal-alert-content.html',
          model: dialogContentModel
        };
        ModalService.showModel(dialogOptions);
      }

      function modalCallbak() {
        dialogContentModel.closeModal();
        $state.go('tree');
      }

      function finishedAnimationRecomendation() {
        var id = $state.params.neuronId;
        UserService.recommendedNeuron(id);
      }

    });
})();
