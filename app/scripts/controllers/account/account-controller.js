(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
})();
