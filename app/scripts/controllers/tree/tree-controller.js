(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($window, data) {
    var treeModel = this;
    treeModel.callbackBackButton = callbackBackButton;
    /* jshint camelcase: false */
    treeModel.rootId = data.meta.root_id;

    function callbackBackButton() {
      $window.history.back();
    }
  });

})();
