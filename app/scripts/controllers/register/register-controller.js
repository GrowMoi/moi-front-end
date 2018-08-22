(function(){
'use strict';

  angular
    .module('moi.controllers')
    .controller('RegisterController', RegisterController);

  function RegisterController($ionicLoading,
                              $auth,
                              $ionicPopup,
                              $state,
                              $scope,
                              ModalService,
                              ImagesLogin) {
    var registerModel = this;
    registerModel.register = register;
    registerModel.registerForm = {};
    registerModel.images = ImagesLogin.paths;
    registerModel.term = false;

    function register() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitRegistration(registerModel.registerForm)
        .then(function() {
          $auth.validateUser().then(function(user){
            $state.go('tree', {
              username: user.username
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

    registerModel.onSelectImage = function(image){
      /*jshint camelcase: false */
      registerModel.registerForm.authorization_key = image.key;
    };

    registerModel.showTerms = function(){
      var dialogOptions = {
        parentScope: $scope,
        templateUrl: 'templates/partials/modal-terms.html',
        model: registerModel
      };
      ModalService.showModel(dialogOptions);
    };

    registerModel.refuse = function(){
      location.replace('https://www.growmoi.com');
    };

    registerModel.acceptTerms = function(){
      registerModel.closeModal();
    };
  }
})();
