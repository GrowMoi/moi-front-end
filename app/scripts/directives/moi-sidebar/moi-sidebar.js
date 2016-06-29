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
      replace: true,
      controller: sidebarController,
      controllerAs: 'vmSidebar',
      bindToController: true,
    };

    function sidebarController($state) {
      var vmSidebar = this;
      vmSidebar.initAnimation = initAnimation;
      vmSidebar.finishedAnimation = finishedAnimation;

      function initAnimation() {
        vmSidebar.showGif = true;
      }

      function finishedAnimation() {
        $state.go('settings');
      }
    }

    return directive;
  }
})();
