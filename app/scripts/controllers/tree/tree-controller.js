(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function () {
    var treeModel = this;
    treeModel.transitionToContent = transitionToContent;

    function transitionToContent() {
      console.log('transitionToContent');
      // $state.go('neuron');
    }
  });

})();
