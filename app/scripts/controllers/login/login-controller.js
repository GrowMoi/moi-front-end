(function () {
  'use strict';

  angular.module('starter.controllers')
  .controller('LoginCtrl', function ($rootScope, $scope, $ionicPopup, $state, $auth) {
    $scope.loginForm = {};

    $rootScope.$on('auth:validation-success', function () {
      $state.go('tab.dash');
    });

    $scope.login = function() {
      $auth.submitLogin($scope.loginForm)
        .then(function () {
          $state.go('tab.dash');
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
