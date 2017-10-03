(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('ContentController', function($scope,
                                              $window,
                                              content,
                                              ContentService,
                                              ModalService,
                                              AdviceService) {
      var vmContent = this;
      vmContent.showImage = showImage;
      vmContent.sendNotes = sendNotes;
      vmContent.showAlertExternalLink = showAlertExternalLink;
      vmContent.frameOptions = {
        type: 'content_max',
        advices: AdviceService.getStatic('content', 0),
        showBackButton: true
      };

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
            showTasks: true,
            addFavorites: true
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

      function showAlertExternalLink(link){
        var dialogContentModel = {
          message: 'En este momento estás saliendo de Moi. Para volver, simplemente cierra la pestaña con el enlace',
          callbacks: {
            btnRight: function(){
              $window.open(link);
              ModalService.destroy();
            },
            btnLeft: ModalService.destroy
          },
          labels: {
            btnRight: 'Ok',
            btnLeft: 'Seguir Leyendo'
          }
        };

        var dialogOptions = {
          templateUrl: 'templates/partials/modal-alert-content.html',
          model: dialogContentModel
        };
        ModalService.showModel(dialogOptions);
      }
    });
})();
