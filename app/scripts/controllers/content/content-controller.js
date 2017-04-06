(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('ContentController', function($scope,
                                              content,
                                              ContentService,
                                              ModalService,
                                              TestService,
                                              $state,
                                              AnimationService) {
      var vmContent = this;
      vmContent.showImage = showImage;
      vmContent.sendNotes = sendNotes;
      vmContent.showCanReadModal = showCanReadModal;
      vmContent.finishedAnimationRead = finishedAnimationRead;
      vmContent.searchOptions = AnimationService.searchButton({
        finishedAnimation: finishedAnimationSearch
      });
      vmContent.learnOptions = AnimationService.learnButton({
        finishedAnimation: finishedAnimationRead
      });
      vmContent.shareOptions = AnimationService.shareButton({
        finishedAnimation: finishedAnimationShare
      });

      var dialogCanReadModel = {
        goToMyTree: goToMyTree
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
        var modelData = {};
        modelData.shareWithFacebook = function() {

        };
        ModalService.showModel({
          parentScope: $scope,
          templateUrl: 'templates/partials/modal-share-social.html',
          model: modelData
        });
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
