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
              UtilityService,
              ModalService) {
    var vm = this;
    var moiSound;

    vm.loginForm = {};
    vm.finishedSound = finishedSound;

    var successState = 'tree';
    var updateProfile = 'profileEdit';
    vm.isChrome = UtilityService.isAgentChrome();
    $rootScope.$on('auth:validation-success', redirectUser);
    var dialogContentModel = {
      callbacks: {
        btnCenter: acceptAlert
      },
      labels: {
        btnCenter: 'Aceptar'
      }
    };

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

    function redirectUser(resp) {
      if(resp.username && resp.username.indexOf('moi-') === 0){
        showAlert();
      }else{
        $state.go(successState);
      }
    }

    function showAlert(){
      dialogContentModel.message = 'Estimado Usuarix: estamos actualizando nuestro sistema de login para hacer '+
                                    'nuestra plataforma más accesible. Por esta razón necesitamos que actualices '+
                                    'tu perfil con un "Nombre de Usuario" y una "Imagen Secreta". Luego de guardar '+
                                    'los cambios, deberás ingresar a Moi utilizando tu Nombre de Usuario e Imágen '+
                                    'Secreta. Por esta razón, te recomendamos anotar esta información o memorizarla, '+
                                    'para que puedas usar Moi cuando quieras.';
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-alert-content.html',
        model: dialogContentModel
      };
      ModalService.showModel(dialogOptions);
    }

    function acceptAlert(){
      dialogContentModel.closeModal();
      $state.go(updateProfile);
    }
  });
})();
