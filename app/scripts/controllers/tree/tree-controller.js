(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function (data) {
    var treeModel = this;
    treeModel.neurons = data.tree;
    treeModel.meta = data.meta;
  });

})();
