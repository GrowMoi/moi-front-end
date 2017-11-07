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
              ImagesLogin) {
    var vmLogin = this;
    var moiSound;

    vmLogin.form = {};
    vmLogin.finishedSound = finishedSound;
    vmLogin.step = 1;

    var successState = 'tree';
    vmLogin.isChrome = UtilityService.isAgentChrome();

    vmLogin.images = ImagesLogin.paths;

    vmLogin.submit = function() {
      if(moiSound){
        moiSound.play();
      }else{
        finishedSound();
      }
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
      /*jshint camelcase: false */
      if(vmLogin.step === 2 && vmLogin.form.authorization_key !== ''){
        init();
      }else{
        vmLogin.step ++;
      }
    }

    function init() {
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
    function redirectUser() {
      $state.go(successState);
    }
  });
})();
