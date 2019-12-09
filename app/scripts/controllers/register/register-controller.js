(function(){
'use strict';

  angular
    .module('moi.controllers')
    .controller('RegisterController', RegisterController);

  function RegisterController($ionicLoading,
                              $auth,
                              $ionicPopup,
                              $scope,
                              StorageService,
                              ModalService,
                              ImagesLoginEn,
                              ImagesLogin) {
    var registerModel = this;
    var languageBrowser = 'es';
    var startYear = new Date().getFullYear() - 6;
    var endYear = new Date().getFullYear() - 18;
    registerModel.register = register;
    registerModel.registerForm = {};
    registerModel.images = languageBrowser === 'es' ? ImagesLogin.paths:ImagesLoginEn.paths;
    registerModel.term = false;
    registerModel.bornYears = generateBornYears(startYear, endYear);
    registerModel.format = /[ !@#$ñ`1´~%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    function register() {
      $ionicLoading.show({
        template: 'cargando...'
      });
      $auth.submitRegistration(registerModel.registerForm)
        .then(function() {
          $auth.validateUser().then(function(user){
            var route={
              state:'tree',
              user: user.username
            };
            StorageService.setLanguage(route);
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

    function generateBornYears(startYear, endYear) {
      var years = [];
      for(var currentYear = startYear; currentYear >= endYear; currentYear--) {
        years.push(currentYear);
      }
      return years;
    }
  }
})();
