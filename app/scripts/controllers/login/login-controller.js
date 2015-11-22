(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('LoginController',
    function ($rootScope,
              $scope,
              $ionicPopup,
              $state,
              $auth) {
    $scope.loginForm = {};

    var successState = 'menu.dash';

    $rootScope.$on('auth:validation-success', function () {
      $state.go(successState);
    });

    $scope.login = function() {
      $auth.submitLogin($scope.loginForm)
        .then(function () {
          $state.go(successState);
        })
        .catch(function (resp) {
          $ionicPopup.alert({
            title: 'Ups!',
            template: resp.errors.join(', ')
          });
        });
    };
  });

})();
