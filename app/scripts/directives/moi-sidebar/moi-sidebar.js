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
      controllerAs: 'vm',
      bindToController: true,
    };

    function sidebarController($state, $auth, AnimationService) {
      var vm = this,
          user = $auth.user;

      vm.settingOptions = AnimationService.settingButton({
        finishedAnimation: goToSetting
      });

      vm.profileOptions = AnimationService.profileButton({
        finishedAnimation: goToProfile
      });

      function goToSetting() {
        $state.go('settings');
      }

      function goToProfile() {
        $state.go('profile', {userId: user.id});
      }
    }

    return directive;
  }
})();
