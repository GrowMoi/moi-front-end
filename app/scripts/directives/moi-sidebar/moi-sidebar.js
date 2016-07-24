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
      vmSidebar.finishedAnimation = finishedAnimation;
      vmSidebar.loadedGif = loadedGif;
      vmSidebar.showGif = false;

      function finishedAnimation() {
        $state.go('settings');
      }

      function loadedGif() {
        vmSidebar.showGif = true;
      }
    }

    return directive;
  }
})();
