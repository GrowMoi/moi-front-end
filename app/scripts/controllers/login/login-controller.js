(function () {
  'use strict';

  angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $ionicPopup, $state, $auth) {
    $scope.loginForm = {};

    $scope.login = function() {
      $auth.submitLogin($scope.loginForm)
        .then(function (resp) {
          console.log(resp);
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
