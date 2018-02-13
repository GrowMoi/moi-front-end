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
        .then(redirectUser)
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

    function redirectUser(user) {
      $state.go(successState, {
        username: user.username
      });
    }
  });
})();
