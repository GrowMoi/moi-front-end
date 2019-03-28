(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NewLoginController',
    function ($rootScope,
              $scope,
              $ionicPopup,
              $ionicLoading,
              $state,
              $auth,
              UtilityService,
              ImagesLogin,
              ImagesLoginEn,
              GAService) {
    var vmLogin = this;
    var moiSound;
    var lang = navigator.language || navigator.userLanguage;
    var languageBrowser = lang.slice(0,2);
    vmLogin.form = {};
    vmLogin.finishedSound = finishedSound;

    var successState = 'tree';
    vmLogin.isChrome = UtilityService.isAgentChrome();

    vmLogin.images = languageBrowser === 'es' ? ImagesLogin.paths:ImagesLoginEn.paths;

    vmLogin.submit = function() {
      if(moiSound){
        moiSound.play();
      }else{
        finishedSound();
      }
    };

    vmLogin.nexStep = function(){
      $state.go('new_login.second_step');
    };

    vmLogin.onSelectImage = function(image){
      /*jshint camelcase: false */
      vmLogin.form.authorization_key = image.key;
    };

    $scope.$on('audioLoaded', function (e, moiSoundInstance) {
      if(moiSoundInstance.autoPlay === false){
        moiSound = moiSoundInstance;
      }
    });

    function finishedSound() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitLogin(vmLogin.form)
        .then(redirectUser)
        .catch(function (resp) {
          $ionicPopup.alert({
            title: 'Ups!',
            template: resp.errors.join(', ')
          });
          vmLogin.step = 1;
          /*jshint camelcase: false */
          vmLogin.form.authorization_key = '';
        })
        .finally(function(){
          $ionicLoading.hide();
        });
    }

    function redirectUser(user) {
      GAService.track('set', 'userId', user.username);
      GAService.track('set', 'dimension1', user.id);
      $state.go(successState, {
        username: user.username
      });
    }
  });
})();
