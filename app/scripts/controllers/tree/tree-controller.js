(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($state) {
    var vm = this;

    vm.transitionToContent = function () {
      console.log('transitionToContent');
      $state.go('neuron');
    };
  });

})();
