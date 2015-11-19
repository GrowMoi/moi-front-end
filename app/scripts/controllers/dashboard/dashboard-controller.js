(function(){
  'use strict';
  angular.module('starter.controllers', ['config'])
  .controller('DashCtrl', function($scope, $auth) {
    $scope.name = $auth.user.name;
  });
})();
