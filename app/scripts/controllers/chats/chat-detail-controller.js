(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  });
})();
