(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($state, $scope, data) {
    var treeModel = this;
    treeModel.transitionToContent = transitionToContent;
    /* jshint camelcase: false */
    treeModel.rootId = data.meta.root_id;

    function transitionToContent(id) {
      $scope.$broadcast('moi-sound:stop');
      $state.go('neuron', {neuronId: id});
    }
  });

})();
