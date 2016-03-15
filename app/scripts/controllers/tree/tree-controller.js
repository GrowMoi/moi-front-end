(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($state, data) {
    var treeModel = this;
    treeModel.transitionToContent = transitionToContent;
    /* jshint camelcase: false */
    treeModel.rootId = data.meta.root_id;

    function transitionToContent(id) {
      $state.go('app.neuron', {neuronId: id});
    }
  });

})();
