(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentController', function($stateParams) {
    var vm = this;
    vm.content = $stateParams.content;

  });
})();
