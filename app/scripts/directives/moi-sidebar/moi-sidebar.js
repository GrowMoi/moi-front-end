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

    function sidebarController($state, $auth) {
      var vmSidebar = this,
          user = $auth.user;
      vmSidebar.goToSetting = goToSetting;
      vmSidebar.goToProfile = goToProfile;
      vmSidebar.loadedGifRueda = loadedGifRueda;
      vmSidebar.loadedGifAmigos = loadedGifAmigos;
      vmSidebar.showGifRueda = false;
      vmSidebar.showGifAmigos = false;

      function goToSetting() {
        $state.go('settings');
      }

      function goToProfile() {
        $state.go('profile', {userId: user.id});
      }

      function loadedGifRueda() {
        vmSidebar.showGifRueda = true;
      }

      function loadedGifAmigos() {
        vmSidebar.showGifAmigos = true;
      }
    }

    return directive;
  }
})();
