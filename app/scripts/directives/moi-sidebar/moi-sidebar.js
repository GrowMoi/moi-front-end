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
      var vm = this;
      vm.user = $auth.user;

      vm.settingOptions = AnimationService.getButton({
        key: 'settings',
        callbacks: {
          finishedAnimation: goToSetting
        }
      });

      vm.profileOptions = AnimationService.getButton({
        key: 'profile',
        callbacks: {
          finishedAnimation: goToProfile
        }
      });

      function goToSetting() {
        $state.go('settings');
      }

      function goToProfile() {
        $state.go('profile', {userId: vm.user.id});
      }
    }

    return directive;
  }
})();
