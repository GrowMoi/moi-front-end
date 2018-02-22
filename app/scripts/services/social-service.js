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
                        UploadImageService) {
    var service = {
      showModal: showModal
    };
    var configSocialNetwork = {
      appName: 'Moi Social Learning',
      appUrl: 'http://moi-frontend.herokuapp.com/',
      popupHeight: '300',
      popupWidth: '400'
    };

    return service;

    function shareWithFacebook(options) {
      ModalService.destroy();
      Socialshare.share({
        provider: 'facebook',
        attrs: {
          socialshareVia: ENV.facebookKey,
          socialshareType: 'share',
          socialshareTitle: options.title,
          socialshareMedia: options.media,
          socialshareDescription: options.description+' '+options.previewImage,
          socialshareText: configSocialNetwork.appName,
          socialshareUrl: configSocialNetwork.appUrl,
          socialsharePopupHeight: configSocialNetwork.popupHeight,
          socialsharePopupWidth: configSocialNetwork.popupWidth
        }
      });
    }

    function shareWithTwitter(sms) {
      ModalService.destroy();
      Socialshare.share({
        provider: 'twitter',
        attrs: {
          socialshareText: sms,
          socialshareUrl: configSocialNetwork.appUrl,
          socialsharePopupHeight: configSocialNetwork.popupHeight,
          socialsharePopupWidth: configSocialNetwork.popupWidth
        }
      });
    }

    function shareWithMail(options) {
      ModalService.destroy();
      var contentBody = options.description+
                ' Unete: '+configSocialNetwork.appUrl;
      Socialshare.share({
        provider: 'email',
        attrs: {
          socialshareBody: contentBody,
          socialshareSubject: options.title+' - '+configSocialNetwork.appName,
          socialsharePopupHeight: configSocialNetwork.popupHeight,
          socialsharePopupWidth: configSocialNetwork.popupWidth
        }
      });
    }

    function showModal(data) {
      //update link
      configSocialNetwork.appName = $location.absUrl();
      var modelData = {};
      modelData.data = data;
      modelData.shareWithFacebook = shareWithFacebook;
      modelData.shareWithTwitter = shareWithTwitter;
      modelData.shareWithMail = shareWithMail;
      modelData.data.shortDescription = getShortDescription(data);
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
      if(previewDescription.length > 105){
        shortDescription = previewDescription.substring(0,105);
        shortDescription = shortDescription.concat('... unete');
      }else{
        shortDescription = previewDescription.concat(', unete');
      }
      return shortDescription;
    }
  }
})();
