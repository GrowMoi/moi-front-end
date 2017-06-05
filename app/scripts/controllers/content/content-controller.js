(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('ContentController', function($scope,
                                              content,
                                              ContentService,
                                              ModalService) {
      var vmContent = this;
      vmContent.showImage = showImage;
      vmContent.sendNotes = sendNotes;

      activate();

      function activate() {
        vmContent.content = content;
        vmContent.media = content.videos.concat(content.media);

        vmContent.buttonsOptions = {
          neuron: content,
          content: content,
          buttons: {
            learn: true,
            search: true,
            share: true,
            recomendation: true,
            saveTask: true,
            showTasks: true
          }
        };
        vmContent.slideGalleryOptions = {
          onRegisterApi: onRegisterApi
        };
      }

      function onRegisterApi(api) {
        api.onImageSelected(function (urlImage) {
          var params = {
            neuronId: content.neuron_id, //jshint ignore:line
            contentId: content.id,
            mediaUrl: angular.isObject(urlImage) ? urlImage.url : urlImage
          };
          ContentService.changeImageStatus(params);
        });
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

    });
})();
