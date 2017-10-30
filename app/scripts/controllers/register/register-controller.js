(function(){
'use strict';

  angular
    .module('moi.controllers')
    .controller('RegisterController', RegisterController);

  function RegisterController($ionicLoading,
                              $auth,
                              $ionicPopup,
                              $state,
                              ImagesLogin) {
    var registerModel = this;
    registerModel.register = register;
    registerModel.registerForm = {};
    registerModel.images = ImagesLogin.paths;

    function register() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitRegistration(registerModel.registerForm)
        .then(function() {
          $auth.validateUser().then(function(){
            $state.go('tree');
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

    registerModel.onSelectImage = function(image){
      /*jshint camelcase: false */
      registerModel.registerForm.authorization_key = image.key;
    };
  }
})();
