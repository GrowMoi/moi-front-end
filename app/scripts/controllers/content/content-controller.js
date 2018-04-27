(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('ContentController', function($scope,
                                              $window,
                                              $timeout,
                                              $interval,
                                              content,
                                              storage,
                                              ContentService,
                                              ModalService,
                                              ReadContentTimingService,
                                              AdviceService,
                                              MediaAchievements,
                                              dataInventory,
                                              SocialService) {
      /*jshint camelcase: false */
      var vmContent = this;
      vmContent.showImage = showImage;
      vmContent.sendNotes = sendNotes;
      vmContent.readOnly = !!content.read_only;
      vmContent.showAlertExternalLink = showAlertExternalLink;
      vmContent.userAchievements = dataInventory.achievements;
      var modelData = {};
      var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
      vmContent.frameOptions = {
        type: 'content_max',
        advices: AdviceService.getStatic('content', 0, storage),
        showBackButton: true
      };

      activate();
      setTheme();

      $scope.$on('$ionicView.afterEnter', startsReading);
      $scope.$on('$ionicView.beforeLeave', stopsReading);

      function activate() {
        vmContent.content = content;
        vmContent.media = content.videos.concat(content.media);
        vmContent.currentContentImageUrl = getImageUrl(vmContent.media[0]);
        vmContent.currentContent = vmContent.media[0];
        vmContent.currentTransition = 'enter';
        vmContent.imgDelayTime = 5000;

        vmContent.buttonsOptions = {
          neuron: content,
          content: content,
          readOnly: content.read_only,
          buttons: {
            learn: true,
            search: true,
            share: true,
            recomendation: true,
            saveTask: true,
            showTasks: true,
            addFavorites: true
          },
          shareCallback: shareContent
        };
        vmContent.slideGalleryOptions = {
          onRegisterApi: vmContent.readOnly ? emptyFuncion : onRegisterApi
        };

        leaveImage(vmContent.imgDelayTime);
        delayImages(vmContent.imgDelayTime);
      }

      function getImageUrl(params) {
        return isImage(params) ? params : (params || {}).thumbnail || 'images/video_placeholder.png';
      }

      function delayImages(delayInMs) {
        var index = 0;
        var maxIndex = vmContent.media.length - 1;

        return $interval(function(){
          if (index < maxIndex) {
            index++;
          } else {
            index = 0;
          }
          vmContent.currentContentImageUrl = getImageUrl(vmContent.media[index]);
          vmContent.currentContent = vmContent.media[index];
          vmContent.currentTransition = 'enter';
          leaveImage(delayInMs);
        }, delayInMs);
      }

      function leaveImage(delayInMs) {
        return $timeout(function() {
          vmContent.currentTransition = 'leave';
        }, delayInMs - 500);
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
        modelData.isImage = isImage(urlImage);
        modelData.contentSrc = urlImage;
        if(!modelData.isImage){
          $backgroundSound[0].pause();
        }
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

      function showAlertExternalLink(link){
        var dialogContentModel = {
          message: 'En este momento estás saliendo de Moi. Para volver, simplemente cierra la pestaña con el enlace',
          callbacks: {
            btnRight: function(){
              $window.open(link);
              dialogContentModel.closeModal();
            },
            btnLeft: function(){dialogContentModel.closeModal();}
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

      function startsReading() {
        if(!modelData.isImage){
          $backgroundSound[0].play();
        }
        if (!vmContent.readOnly) {
          ReadContentTimingService.startsReading(vmContent.content);
        }
      }

      function stopsReading() {
        if (!vmContent.readOnly) {
          ReadContentTimingService.stopsReading(vmContent.content);
        }
      }

      function isImage(params) {
        return typeof params === 'string';
      }

      function setTheme() {
        if(vmContent.userAchievements.length > 0){
          angular.forEach(vmContent.userAchievements, function(achievement, index){
            if(achievement.active){
              var currentTheme = MediaAchievements[vmContent.userAchievements[index].number].settings.theme;
              vmContent.theme = currentTheme;
              modelData.frameColor = currentTheme;
              vmContent.slideGalleryOptions.modalFrameColor = currentTheme;
            }
          });
        }
      }

      function emptyFuncion() {}

      function shareContent() {
        var data = {
          title: content.title,
          media: content.media[0],
          description: content.description
        };
        SocialService.showModal(data);
      }
    });
})();
