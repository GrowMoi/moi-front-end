(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('SocialService', SocialService);

  function SocialService($location,
                        $ionicLoading,
                        Socialshare,
                        ModalService,
                        ENV,
                        ScreenshotService,
                        UploadImageService,
                        UserService) {
    var service = {
      showModal: showModal
    };
    var configSocialNetwork = {
      appName: 'Haedus',
      popupHeight: '300',
      popupWidth: '400'
    };
    var modelData = {
      activeEmail: false,
      sendEmail: sendEmail
    };

    return service;

    function shareWith(options, socialNetwork) {
      modelData.closeModal();

      $ionicLoading.show({
        content: 'Sharing',
        animation: 'fade-in',
        showBackdrop: true,
        showDelay: 0
      });

      var paramsToShare = {
        titulo: options.title,
        descripcion: options.description,
        uri: options.publicUrl
      };

      var view = document.querySelector('#screenCapture');
      ScreenshotService.getImage(view).then(function(imageBase64){
        UploadImageService.uploadFile(imageBase64).then(function(resp) {
          paramsToShare.imagen_url = resp.data.url; //jshint ignore:line
          UserService.sharingContent(paramsToShare).then(function(resp) {
            $ionicLoading.hide();
            var defaultAttrs = {
              socialshareUrl: resp.data.social_sharing.public_url, //jshint ignore:line
              socialsharePopupHeight: configSocialNetwork.popupHeight,
              socialsharePopupWidth: configSocialNetwork.popupWidth
            };
            if(socialNetwork === 'facebook'){
              defaultAttrs.socialshareVia=  ENV.facebookKey;
              defaultAttrs.socialshareType = 'share';
              Socialshare.share({
                provider: socialNetwork,
                attrs: defaultAttrs
              });
            }else if(socialNetwork === 'twitter'){
              defaultAttrs.socialshareText = options.shortDescription;
              Socialshare.share({
                provider: socialNetwork,
                attrs: defaultAttrs
              });
            }
          });
        });
      });
    }

    function showMailForm() {
      modelData.activeEmail = !modelData.activeEmail;
    }

    function sendEmail() {
      modelData.closeModal();
      var emailParams = {
        'email': modelData.data.email,
        'public_url': modelData.data.publicUrl
      };

      $ionicLoading.show({
        content: 'Sharing',
        animation: 'fade-in',
        showBackdrop: true,
        showDelay: 0
      });
      if(modelData.data.image_url){ //jshint ignore:line
        emailParams.image_url = modelData.data.image_url; //jshint ignore:line
        UserService.sharedEmailContent(emailParams).then(function() {
          $ionicLoading.hide();
        });
      }else {
        var view = document.querySelector('#screenCapture');
        ScreenshotService.getImage(view).then(function(imageBase64){
          UploadImageService.uploadFile(imageBase64).then(function(resp) {
            emailParams.image_url = resp.data.url; //jshint ignore:line
            UserService.sharedEmailContent(emailParams).then(function() {
              $ionicLoading.hide();
            });
          });
        });
      }
    }

    function showModal(data) {
      modelData.data = data;
      modelData.shareWith = shareWith;
      modelData.showMailForm = showMailForm;
      modelData.data.shortDescription = getShortDescription(data);
      modelData.data.publicUrl = data.publicUrl || $location.absUrl();
      ModalService.showModel({
        templateUrl: 'templates/partials/modal-share-social.html',
        model: modelData
      });
    }

    function getShortDescription(options) {
      var shortDescription,
          previewDescription = options.title +' '+ options.description;
      if(previewDescription.length > 100){
        shortDescription = previewDescription.substring(0,100);
        shortDescription = shortDescription.concat('... Visítanos');
      }else{
        shortDescription = previewDescription.concat(', Visítanos');
      }
      return shortDescription;
    }
  }
})();
