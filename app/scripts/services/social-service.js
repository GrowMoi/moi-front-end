(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('SocialService', SocialService);

  function SocialService($location,
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
      appName: 'Moi Social Learning',
      popupHeight: '300',
      popupWidth: '400'
    };
    var modelData = {
      activeEmail: false,
      sendEmail: sendEmail
    };

    return service;

    function shareWithFacebook(options) {
      ModalService.destroy();
      Socialshare.share({
        provider: 'facebook',
        attrs: {
          socialshareVia: ENV.facebookKey,
          socialshareType: 'share',
          socialshareDisplay: options.description,
          socialshareUrl: options.publicUrl,
          socialsharePopupHeight: configSocialNetwork.popupHeight,
          socialsharePopupWidth: configSocialNetwork.popupWidth
        }
      });
    }

    function shareWithTwitter(options) {
      ModalService.destroy();
      Socialshare.share({
        provider: 'twitter',
        attrs: {
          socialshareText: options.shortDescription,
          socialshareUrl: options.publicUrl,
          socialsharePopupHeight: configSocialNetwork.popupHeight,
          socialsharePopupWidth: configSocialNetwork.popupWidth
        }
      });
    }

    function showMailForm() {
      modelData.activeEmail = !modelData.activeEmail;
    }

    function sendEmail() {
      var emailParams = {
        'email': modelData.data.email,
        'public_url': modelData.data.publicUrl,
        'image_url': modelData.data.previewImage
      };
      UserService.sharedEmailContent(emailParams).then(function() {
        ModalService.destroy();
      });
    }

    function showModal(data) {
      modelData.data = data;
      modelData.shareWithFacebook = shareWithFacebook;
      modelData.shareWithTwitter = shareWithTwitter;
      modelData.showMailForm = showMailForm;
      modelData.data.shortDescription = getShortDescription(data);
      modelData.data.publicUrl = $location.absUrl();
      var view = document.getElementsByClassName('scroll-content');
      ScreenshotService.getImage(view).then(function(imageBase64){
        UploadImageService.uploadFile(imageBase64).then(function(resp) {
          modelData.data.previewImage = resp.data.url;
          ModalService.showModel({
            templateUrl: 'templates/partials/modal-share-social.html',
            model: modelData
          });
        });
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
