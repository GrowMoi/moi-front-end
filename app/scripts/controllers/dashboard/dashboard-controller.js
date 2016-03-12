(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('DashCtrl', function($scope, $auth) {
    $scope.name = $auth.user.name;
  });
})();
