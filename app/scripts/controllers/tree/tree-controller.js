(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function (data) {
    var treeModel = this;
    /* jshint camelcase: false */
    treeModel.rootId = data.meta.root_id;
  });

})();
