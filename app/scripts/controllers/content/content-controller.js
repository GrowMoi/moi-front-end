(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('ContentController', function($scope,
                                              content,
                                              ContentService,
                                              ModalService,
                                              ReadContentTimingService) {
      var vmContent = this;
      vmContent.showImage = showImage;
      vmContent.sendNotes = sendNotes;

      activate();

      $scope.$on('$ionicView.afterEnter', startsReading);
      $scope.$on('$ionicView.beforeLeave', stopsReading);

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
        api.onImageSelected(stopsReading);
        api.onImageHidden(startsReading);
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
        stopsReading();
        var modelData = {};
        modelData.contentSrc = urlImage;
        modelData.isImage = true;
        ModalService.showModel({
          parentScope: $scope,
          templateUrl: 'templates/partials/modal-image.html',
          model: modelData,
          onHide: startsReading
        });
      }

      function sendNotes() {
        ContentService.addNotesToContent(vmContent.content);
      }

      function startsReading() {
        ReadContentTimingService.startsReading(vmContent.content);
      }

      function stopsReading() {
        ReadContentTimingService.stopsReading(vmContent.content);
      }
    });
})();
