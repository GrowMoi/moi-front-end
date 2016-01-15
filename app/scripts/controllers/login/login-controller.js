(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('LoginController',
    function ($rootScope,
              $scope,
              $ionicPopup,
              $ionicLoading,
              $state,
              $auth) {
    var vm = this;

    vm.loginForm = {};

    var successState = 'menu.dash';

    $rootScope.$on('auth:validation-success', function () {
      $state.go(successState);
    });

    vm.login = function() {
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
    };
  });
})();
