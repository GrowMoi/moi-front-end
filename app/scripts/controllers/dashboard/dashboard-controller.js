(function(){
  'use strict';
  angular.module('moi.controllers', ['config'])
  .controller('DashCtrl', function($scope, $auth) {
    $scope.name = $auth.user.name;
  });
})();
