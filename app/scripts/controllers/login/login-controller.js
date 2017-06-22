(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('LoginController',
    function ($rootScope,
              $scope,
              $ionicPopup,
              $ionicLoading,
              $state,
              $auth,
              UtilityService) {
    var vm = this;
    var moiSound;

    vm.loginForm = {};
    vm.finishedSound = finishedSound;

    var successState = 'tree';
    vm.isChrome = UtilityService.isAgentChrome();
    $rootScope.$on('auth:validation-success', function () {
      $state.go(successState);
    });

    vm.login = function() {
      if(moiSound){
        moiSound.play();
      }else{
        vm.finishedSound();
      }
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
      $auth.submitLogin(vm.loginForm)
        .then(function () {
          $state.go(successState);
        })
        .catch(function (resp) {
          $ionicPopup.alert({
            title: 'Ups!',
            template: resp.errors.join(', ')
          });
        })
        .finally(function(){
          $ionicLoading.hide();
        });
    }
  });
})();
