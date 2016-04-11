(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('moiSidebar', moiSidebar);

  function moiSidebar() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'templates/directives/moi-sidebar/moi-sidebar.html',
      scope: false,
      replace: true
    };

    return directive;
  }
})();
