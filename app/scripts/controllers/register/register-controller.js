(function(){
'use strict';

  angular
    .module('moi.controllers')
    .controller('RegisterController', RegisterController);

  function RegisterController($ionicLoading,
                              $auth,
                              $ionicPopup,
                              $state) {
    var registermodel = this;
    registermodel.register = register;
    registermodel.registerForm = {};

    function register() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitRegistration(registermodel.registerForm)
        .then(function() {
          $state.go('tree').then(function(){
            $ionicPopup.alert({
              title: 'Alerta',
              template: 'Usuario creado satisfactoriamente'
            });
          });
        })
        .catch(function (resp) {
          $ionicPopup.alert({
            title: 'Ups!',
            /*jshint camelcase: false */
            template: resp.data.errors.full_messages.join(', ')
          });
        })
        .finally(function(){
          $ionicLoading.hide();
        });
    }
  }
})();
